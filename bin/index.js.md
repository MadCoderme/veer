## VueSPA Builder Tool Documentation

### Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Commands](#commands)
- [Options](#options)
- [Contributing](#contributing)

### Introduction

The VueSPA Builder Tool is a command-line utility that helps developers quickly and easily create and bundle Vue.js SPAs. It provides a streamlined process for setting up routes, creating bundles, and preparing the VueSPA files.

### Installation

To install the VueSPA Builder Tool, run the following command:

```
npm install -g vuespa-builder
```

### Usage

After installing the VueSPA Builder Tool, you can use the `vue-spa-builder` command to create and bundle your Vue.js SPAs.

The general usage is as follows:

```
vue-spa-builder <command> [options]
```

### Commands

The VueSPA Builder Tool supports the following commands:

| Command | Description |
|---|---|
| `bundle` | Bundles the Vue.js SPA |

### Options

The following options are supported by the VueSPA Builder Tool:

| Option | Description |
|---|---|
| `-h, --help` | Display help information |
| `-v, --version` | Display version information |
| `-c, --config` | Path to the SPA configuration file |
| `-r, --routes` | Path to the routes configuration file |
| `-p, --prerenderer` | Path to the Prerenderer script |
| `-o, --output` | Output directory for the bundled files |

### Example Usage

To create and bundle a Vue.js SPA, you can use the following command:

```
vue-spa-builder bundle -c spa.config.json -r routes.json -p prerenderer.js -o public
```

This command will create the Vue.js SPA and bundle the files in the `public` directory.

### Contributing

Contributions are welcome! Please read the [contributing guidelines](CONTRIBUTING.md) before submitting a pull request.