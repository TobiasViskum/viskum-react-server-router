import { build as esbuild } from "esbuild";

build();

async function build() {
  await esbuild({
    entryPoints: ["server.tsx"],
    bundle: true,
    external: ["uWebSockets.js"],
    outfile: "dist/server.js",
    format: "esm",
  });
}
