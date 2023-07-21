import type { MicroCMSImage } from "microcms-js-sdk";

/** MicroCMSDateのstring型をすべてDate型にしたもの */
// type MicroCMSDateData = { [P in keyof MicroCMSDate]: Date };
/** MicroCMSImageのオプショナルフィールドをすべて必要にしたもの */
export type MicroCMSImageComplete = Required<MicroCMSImage>;
