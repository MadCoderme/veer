## Table of Contents

- [Overview](#overview)
- [Usage](#usage)
- [Commands](#commands)
  - [bundle](#bundle)
- [Functions](#functions)
  - [walk](#walk)
  - [build](#build)
  - [generateOutputs](#generateOutputs)
  - [generateHTMLRoute](#generateHTMLRoute)

## Overview

This documentation describes the VueSPA bundler, a tool for creating Vue.js Single Page Applications (SPAs). It provides detailed information on the usage, commands, and functions available in the bundler.

## Usage

To use the VueSPA bundler, install it globally using npm:

```
npm install -g vuespa-bundler
```

Once installed, you can run the bundler from the command line:

```
vuespa-bundler <command> [options]
```

## Commands

The following commands are available in the VueSPA bundler:

### bundle

The `bundle` command is used to bundle a Vue.js SPA. It takes the following options:

- `--config`: The path to the SPA configuration file.
- `--routes`: The path to the JSON file containing the SPA's routes.
- `--prerenderer`: The path to the script that will prerender the SPA's pages.

## Functions

The following functions are used internally by the VueSPA bundler:

### walk

The `walk` function is used to recursively walk through a directory and return a list of files.

### build

The `build` function is used to build a Vue.js SPA. It takes the following parameters:

- `inputOption`: An object containing the input options for the rollup bundler.
- `outputOption`: An object containing the output options for the rollup bundler.

### generateOutputs

The `generateOutputs` function is used to generate the output files for a Vue.js SPA. It takes the following parameters:

- `bundle`: The rollup bundle.
- `outputOption`: An object containing the output options for the rollup bundler.

### generateHTMLRoute

The `generateHTMLRoute` function is used to generate the HTML for a Vue.js SPA route. It takes the following parameter:

- `route`: The route object.