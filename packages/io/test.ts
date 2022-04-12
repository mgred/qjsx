require.cache["std"] = {
  exports: {
    open: () => null,
  },
} as any;

import assert from "assert";
import { read } from "./index";

assert(read("hello") === null, "is null");
