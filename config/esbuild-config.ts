import { BuildOptions } from "esbuild";
import { sassPlugin } from "esbuild-sass-plugin";
import path from "path";
import { CleanPlugin } from "./plugins/CleanPlugin";
import { HTMLPlugin } from "./plugins/HTMLPlugin";

const mode = process.env.MODE || "development";

const isDev = mode === "development";
const isProd = mode === "production";

const resolveRoot = (...segments: string[]) => {
  return path.resolve(__dirname, "..", ...segments);
};

const config: BuildOptions = {
  outdir: resolveRoot("build"),
  entryPoints: [resolveRoot("src", "index.tsx")],
  entryNames: "[dir]/bundle.[name]-[hash]",
  allowOverwrite: true,
  bundle: true,
  tsconfig: resolveRoot("tsconfig.json"),
  minify: isProd,
  sourcemap: isDev,
  metafile: true,
  loader: {
    ".png": "file",
    ".jpg": "file",
    ".svg": "text",
  },
  plugins: [
    CleanPlugin,
    sassPlugin({
      type: "style",
    }),
    HTMLPlugin({
      title: "New project (to change go to: esbuild-config.ts)",
    }),
  ],
};

export default config;
