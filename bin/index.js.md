## VueSPA CLI

### Table of Contents

- [Introduction](#introduction)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
  - [Creating a VueSPA Project](#creating-a-vuespa-project)
  - [Bundling a VueSPA Project](#bundling-a-vuespa-project)
  - [Serving a VueSPA Project](#serving-a-vuespa-project)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Introduction

VueSPA CLI is a command-line interface tool for scaffolding, bundling, and serving Vue.js single-page applications (SPAs). It provides a convenient way to get started with VueSPA development and to manage the build process for production deployment.

## Requirements

VueSPA CLI requires the following software to be installed on your system:

- Node.js (version 14 or higher)
- npm (version 6 or higher)

## Installation

To install VueSPA CLI, run the following command:

```
npm install -g vuespa-cli
```

## Usage

### Creating a VueSPA Project

To create a new VueSPA project, run the following command:

```
vuespa create my-project
```

This will create a new directory called `my-project` containing the following files and directories:

- `package.json`: The project's package manifest.
- `src`: The source code directory.
- `public`: The production build output directory.
- `spa.config.json`:  The project's configuration file.
- `routes.config.json`:  The project's routes configuration file.
- `prerenderer.js`:  The project's prerenderer script.

### Bundling a VueSPA Project

To bundle a VueSPA project, run the following command:

```
vuespa build
```

This will create a production build of the project in the `public` directory.

### Serving a VueSPA Project

To serve a VueSPA project, run the following command:

```
vuespa serve
```

This will start a development server on port 8080.

## Configuration

The VueSPA CLI can be configured using the `spa.config.json` file. This file contains the following configuration options:

- `routes`: The path to the project's routes configuration file.
- `prerenderer`: The path to the project's prerenderer script.

## Contributing

Contributions are welcome! Please read the [contributing guidelines](CONTRIBUTING.md) before submitting a pull request.

## License

VueSPA CLI is licensed under the MIT License.