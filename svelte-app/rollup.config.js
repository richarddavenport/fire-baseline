import commonjs from "rollup-plugin-commonjs";
import copy from "rollup-plugin-copy";
import livereload from "rollup-plugin-livereload";
import resolve from "rollup-plugin-node-resolve";
import serve from "rollup-plugin-serve";
import svelte from "rollup-plugin-svelte";
import { terser } from "rollup-plugin-terser";

const production = !process.env.ROLLUP_WATCH;

export default {
  input: "src/main.js",
  output: {
    sourcemap: !production,
    format: "iife",
    name: "app",
    file: "build/bundle.js"
  },
  plugins: [
    /**
     * Copies public folder into `build/`
     */
    copy({ targets: [{ src: "public/*", dest: "build" }] }),

    svelte({
      // enable run-time checks when not in production
      dev: !production,
      // we'll extract any component CSS out into
      // a separate file — better for performance
      css: css => {
        css.write("build/bundle.css", !production);
      }
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration —
    // consult the documentation for details:
    // https://github.com/rollup/rollup-plugin-commonjs
    resolve({ browser: true, mainFields: ["main", "module"] }),
    commonjs(),

    !production &&
      serve({
        contentBase: ["build"],
        port: 8000,
        historyApiFallback: true,
        open: true
      }),
    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload({ watch: "build" }),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser()
  ],
  watch: {
    clearScreen: false
  }
};
