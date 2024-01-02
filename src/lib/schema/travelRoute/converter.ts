import { type CollectionEntry } from "astro:content";

import type { CollectionTravelRouteSchema } from "./collectionSchema";

import { type TravelRouteEntry } from "@lib/other/station-collections";
import type { ToEntryObject } from "@lib/types";
import { DateTime } from "luxon";

/** Collectionsから受け取ったデータを保持し, `TravelRouteEntry`に変換可能なクラス */
export class CollectionsTravelRouteEntry
  implements ToEntryObject<TravelRouteEntry>, CollectionTravelRouteSchema
{
  public id: string;
  public name: string;
  public date: Date;
  public route: {
    name: string;
    station?: {
      collection: "station";
      slug: CollectionEntry<"station">["slug"];
    };
    nextTransport?: string;
    arrivalTime: Date;
    departureTime?: Date;
    marker?: CollectionTravelRouteSchema["route"][number]["marker"];
  }[];

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
    const { date, route: rawRoute, ...rest } = this;

    const route = rawRoute.map((item) => {
      const { station, ...rest } = item;
      return { stationId: station?.slug, ...rest };
    });

    return {
      createdAt: DateTime.fromJSDate(date, { zone: "UTC" }),
      updatedAt: DateTime.fromJSDate(date, { zone: "UTC" }),
      route,
      ...rest,
      isEntrySchema: null,
    } satisfies TravelRouteEntry;
  }
}
