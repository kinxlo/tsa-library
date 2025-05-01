import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"], // your source entry
  format: ["esm"], // ONLY ESM output
  outDir: "dist", // output to dist/
  splitting: true, // allow code splitting
  sourcemap: true, // optional, good for debugging
  clean: true, // clean dist before build
  dts: {
    compilerOptions: {
      incremental: false,
    },
  },
  target: "esnext", // modern output
  onSuccess: "cp src/global.css dist/global.css",
});
