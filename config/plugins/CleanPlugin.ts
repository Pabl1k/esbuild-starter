import { Plugin } from "esbuild";
import { rm } from "fs/promises";
import fs from "fs";

export const CleanPlugin: Plugin = {
  name: "CleanPlugin",
  setup(build) {
    const buildFolderExist = fs.existsSync("./build");

    build.onStart(async () => {
      try {
        const outdir = build.initialOptions.outdir;

        if (outdir) {
          await rm(outdir, { recursive: true });
        }
      } catch (e) {
        buildFolderExist && console.log("Failed to clean folder");
      }
    });
  },
};
