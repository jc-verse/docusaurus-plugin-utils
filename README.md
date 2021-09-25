# docusaurus-plugin-utils

A utility to build and pack docusaurus plugins, particularly useful for TypeScript plugin authors

## CLI

### `docusaurus-plugin build`

Builds your plugin and transpiles theme components to human-readable JS for swizzling.

Options:
  - `--source-dir`: the source directory of your TypeScript plugin. Defaults to `src`.
  - `--target-dir`: the target directory of transpilation output. Defaults to `lib`.
  - `--theme-dir`: the directory of your theme components. Defaults to `src/theme`. If the directory is not present, we assume that no theme components are present.
  - `--theme-target-dir`: the directory to output the human-readable JS components. Defaults to `lib/js-theme`.
  - `--ignore`: a list of patterns to be ignored—no compilation output will be emitted. Defaults to `**/__tests__/**`. _Note: `.d.ts` files will always be ignored, regardless of options used._

Usage:

```bash
yarn docusaurus-plugin build --theme-dir theme
```

**Note: this command assumes you have Prettier installed—you should really consider about the readability of your JS components, because Babel output isn't really well-formatted.**

**Note: I haven't incorporated typechecking in this command (because the TS compiler API is so mysteriously hard). You would need to typecheck yourself with `tsc --noEmit`.**

### `docusaurus-plugin watch`

Starts watch-mode compilation.

Options:
  - `--source-dir`: the source directory of your TypeScript plugin. Defaults to `src`.
  - `--target-dir`: the target directory of transpilation output. Defaults to `lib`.
  - `--ignore`: a list of patterns to be ignored—no compilation output will be emitted. Defaults to `**/__tests__/**`. _Note: `.d.ts` files will always be ignored, regardless of options used._

Usage:

```bash
yarn docusaurus-plugin watch
```

**Note: running `watch` and then terminating it is not equivalent to running `build`—we don't specially transpile & format theme components due to performance concerns.**
