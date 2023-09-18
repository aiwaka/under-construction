import { DateTime } from "luxon";

export default {
  files: ["*"],
  helpers: [
    {
      today: () => DateTime.now().toFormat("yyyy-LL-dd"),
    },
  ],
};
