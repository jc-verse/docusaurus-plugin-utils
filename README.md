# docusaurus-plugin-utils

A utility to build and pack docusaurus plugins, particularly useful for TypeScript plugin authors

## Motivation

As more of the official packages are migrated to TS, I start to notice duplicated logic in the packing process. Internally, a package would go through at most three steps:

1. Compilation with `tsc`;
2. Untyped files are copied to the `lib` folder with a node script;
3. The theme components are transpiled with only types stripped, and then formatted, so that it's usable for JS swizzling.

Not following this long process of compiling -> copying static assets -> double transpilation can cause some troubles.

The first one is less of a concern, although more likely to occur: when the theme folder contains `.css` files, they are not copied to the dist folder by `tsc`, you would either need to transpile by babel with allExtensions: true, or you would need to use the `copyUntypedFiles` script (which we use a lot—duplicated in _every_ package). Neither is very convenient for a TS plugin developer. However, the plugin author cannot get away without using one of the two techniques, because missing `.css` files would make the code not run at all.

The second one can be more problematic. The TypeScript theme components are transpiled twice, once only with the types stripped and once to actual commonjs code. Now imagine the following case:

1. The developer of a plugin writes the plugin in TS;
2. Unaware of the double-transpile workflow, the plugin is only built with `tsc` and distributed;
3. A user uses the plugin, and decided to swizzle a theme component, but uses the JS version;
4. The user will receive an unreadable component.

This can go away unnoticed because for normal users who don't swizzle, the plugin runs correctly. The above case is very rare as of now, but can be likely in the future with a better plugin ecosystem. Also, many official plugins have their own theme components, and most of them are currently kept as JS to bypass this issue—still not optimal for TS-perfectionists like me. If we can expose a utility to transpile the theme components to human-readable JS automatically, things would be a lot easier for the plugin authors.

And that's how this package comes to existence.

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
