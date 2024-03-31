## Table of Contents

- [Introduction](#introduction)
- [Usage](#usage)
- [Commands](#commands)
  - [bundle](#bundle)
- [Functions](#functions)
  - [walk](#walk)
  - [build](#build)
  - [generateOutputs](#generateOutputs)
  - [generateHTMLRoute](#generateHTMLRoute)

## Introduction

This documentation provides a detailed overview of the VueSPA bundler, a command-line tool used to create Vue.js Single Page Applications (SPAs). It includes information on the tool's installation, usage, commands, and functions.

## Usage

To use the VueSPA bundler, first install it globally using npm:

```
npm install -g vuespa-bundler
```

Once installed, you can use the `vuespa` command to bundle your Vue.js projects.

## Commands

### bundle

The `bundle` command is used to bundle a Vue.js project into a production-ready format.

**Usage:**

```
vuespa bundle
```

**Options:**

- `--config`: Path to a custom configuration file (default: `spa.config.json`).

## Functions

### walk

The `walk` function recursively walks through a directory and returns an array of all the files and directories it finds.

**Usage:**

```
walk(dir)
```

**Parameters:**

- `dir`: The directory to walk through.

**Returns:**

An array of all the files and directories in the specified directory.

### build

The `build` function takes a Rollup input option and output option and builds a bundle.

**Usage:**

```
build(inputOption, outputOption)
```

**Parameters:**

- `inputOption`: The Rollup input option.
- `outputOption`: The Rollup output option.

### generateOutputs

The `generateOutputs` function generates the output files for a Rollup bundle.

**Usage:**

```
generateOutputs(bundle, outputOption)
```

**Parameters:**

- `bundle`: The Rollup bundle.
- `outputOption`: The Rollup output option.

### generateHTMLRoute

The `generateHTMLRoute` function generates the HTML for a VueSPA route.

**Usage:**

```
generateHTMLRoute(route)
```

**Parameters:**

- `route`: The VueSPA route.

**Returns:**

The HTML for the route.