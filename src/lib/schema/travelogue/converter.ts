import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import { type CollectionEntry, getEntry, getEntries } from "astro:content";
import { DateTime } from "luxon";

import type {
  CollectionTravelogueSchema,
  TravelogueThumbFormatEnum,
} from "./collectionSchema";

import type { ToEntryObject } from "@lib/types";
import type { TravelogueEntry } from "@lib/contents/travelogue";
import { CollectionsBlogPostEntry } from "../blog";
import type { BlogPostEntry } from "@lib/contents/blog";
import type { TravelRouteEntry } from "@lib/other/station-collections";
import { CollectionsTravelRouteEntry } from "../travelRoute";

/** Collectionsから受け取ったデータを保持し, `BlogPostEntry`に変換可能なクラス */
export class CollectionsTravelogueEntry
  implements ToEntryObject<TravelogueEntry>, CollectionTravelogueSchema
{
  public id: string;
  public title: string;
  public description: string;
  public thumbnail: string;
  public thumbnailFormat: TravelogueThumbFormatEnum | null;
  public startDate: Date;
  public endDate: Date;
  public CommentContent!: AstroComponentFactory;
  public posts: { collection: "blog"; slug: CollectionEntry<"blog">["slug"] }[];
  public routes: {
    collection: "travelRoute";
    id: CollectionEntry<"travelRoute">["id"];
  };

  private routeObj!: TravelRouteEntry;
  private postsObj!: BlogPostEntry[];

  private constructor(rawEntry: CollectionEntry<"travelogue">) {
    this.id = rawEntry.slug;
    const data = rawEntry.data;
    this.title = data.title;
    this.description = data.description;
    this.thumbnail = data.thumbnail;
    this.thumbnailFormat = data.thumbnailFormat;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.posts = data.posts;
    this.routes = data.routes;
  }

  public static async create(rawEntry: CollectionEntry<"travelogue">) {
    const entry = new CollectionsTravelogueEntry(rawEntry);
    const rendered = await rawEntry.render();
    const { Content } = rendered;
    entry.CommentContent = Content;

    const route = await getEntry(rawEntry.data.routes);
    const posts = await getEntries(rawEntry.data.posts);

    entry.postsObj = await Promise.all(
      posts.map(async (post) => {
        const collectionsEntry = await CollectionsBlogPostEntry.create(post);
        const blogEntry = collectionsEntry.toEntryObject();
        return blogEntry;
      }),
    );
    entry.routeObj = (
      await CollectionsTravelRouteEntry.create(route)
    ).toEntryObject();

    return entry;
  }

  toEntryObject() {
    const { postsObj, routeObj, CommentContent, ...rest } = this;

    return {
      ...rest,
      posts: postsObj,
      routes: routeObj,
      Content: CommentContent,
      thumbnail: postsObj[0].thumbnail,
      // * IsEntrySchemaで要求されるこれらの値はここでは無意味なのでダミーにする（設計が悪い）
      createdAt: this.startDate,
      updatedAt: this.startDate,
      isEntrySchema: null,
    } satisfies TravelogueEntry;
  }
}
