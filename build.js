const esbuild = require("esbuild");
const sveltePlugin  = require("esbuild-svelte");

esbuild
  .build({
    entryPoints: ["src/main.js"],
    mainFields: ["svelte", "browser", "module", "main"],
    bundle: true,
    outfile: "public/build/bundle.js",
    plugins: [sveltePlugin()],
    logLevel: "info",
  })
  .catch(() => process.exit(1));