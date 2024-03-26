## Table of Contents

- [Introduction](#introduction)
- [Usage](#usage)
  - [Command](#command)
  - [Arguments](#arguments)
  - [Options](#options)
- [Code Structure](#code-structure)
  - [Dependencies](#dependencies)
  - [Functions](#functions)
- [Conclusion](#conclusion)

## Introduction

This documentation provides a detailed overview of the VueSPA bundler tool, including its usage, code structure, and functionality.

## Usage

### Command

To bundle a VueSPA project, use the following command:

```
npx vuespa bundle
```

### Arguments

None

### Options

None

## Code Structure

### Dependencies

The tool uses the following dependencies:

- yargs/yargs: Command-line argument parser
- chalk: Terminal string styling
- readline: Node.js readline interface
- fs: Node.js file system module
- path: Node.js path manipulation module
- rollup: JavaScript bundler
- vue: Rollup plugin for Vue.js
- typescript: Rollup plugin for TypeScript
- uglify: Rollup plugin for minification
- auto: Rollup plugin for automatic dependency installation
- resolve: Rollup plugin for resolving module paths
- replace: Rollup plugin for replacing strings
- url: Rollup plugin for bundling URLs
- PostCSS: Rollup plugin for CSS processing
- postcss-import: PostCSS plugin for importing CSS files
- postcss-url: PostCSS plugin for resolving CSS URLs
- simplevars: PostCSS plugin for simple variable expansion
- nested: PostCSS plugin for nested CSS rules
- alias: Rollup plugin for creating aliases
- commonjs: Rollup plugin for CommonJS module support
- autoprefixer: PostCSS plugin for vendor prefixing
- json: Rollup plugin for JSON parsing

### Functions

The tool includes the following functions:

- `walk`: Recursively traverses a directory and returns a list of files
- `build`: Builds a Rollup bundle
- `generateOutputs`: Generates output files for a Rollup bundle
- `generateHTMLRoute`: Generates an HTML route file

## Conclusion

This documentation provides a comprehensive understanding of the VueSPA bundler tool, enabling users to efficiently bundle Vue.js applications for production.