// import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import type { CollectionEntry } from "astro:content";

import type { CollectionTravelRouteSchema } from "./collectionSchema";

import type { TravelRouteEntry } from "@lib/other/station-collections";
import type { ToEntryObject } from "@lib/types";

/** Collectionsから受け取ったデータを保持し, `BlogPostEntry`に変換可能なクラス */
export class CollectionsTravelRouteEntry
  implements ToEntryObject<TravelRouteEntry>, CollectionTravelRouteSchema
{
  public id: string;
  public name: string;
  public date: Date;
  public route: {
    name: string;
    stationId?: string;
    nextTransport?: string;
    arrivalTime: Date;
    departureTime?: Date;
  }[];
  // public CommentContent!: AstroComponentFactory;

  private constructor(rawEntry: CollectionEntry<"travelRoute">) {
    this.id = rawEntry.id;
    const data = rawEntry.data;
    this.name = data.name;
    this.date = data.date;
    this.route = data.route;
  }

  public static async create(rawEntry: CollectionEntry<"travelRoute">) {
    const entry = new CollectionsTravelRouteEntry(rawEntry);

    return entry;
  }

  toEntryObject() {
    const { date: createdAt, ...rest } = this;
    const updatedAt = createdAt;

    return {
      createdAt,
      updatedAt,
      ...rest,
      isEntrySchema: null,
    } satisfies TravelRouteEntry;
  }
}
