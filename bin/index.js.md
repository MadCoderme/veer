## Table of Contents

*   [Overview](#overview)
*   [Dependencies](#dependencies)
*   [Command Line Interface](#command-line-interface)
*   [Bundle Creation](#bundle-creation)
    *   [File and Configuration Checks](#file-and-configuration-checks)
    *   [Route Creation](#route-creation)
    *   [JavaScript Bundling](#javascript-bundling)
    *   [Prerenderer Preparation](#prerenderer-preparation)
    *   [VueSPA Setup](#vuespa-setup)

## Overview 🏃‍♀️

This script is designed to bundle a Vue Single Page Application (VueSPA) project, creating the necessary HTML routes, JavaScript bundles, and VueSPA infrastructure for deployment. 

## Dependencies 

The script utilizes various npm packages to achieve its functionality. The relevant packages and their roles are as follows:

| Package          | Description                                                                                                                                                            |
| :--------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| yargs            | Provides command line parsing functionality.                                                                                                                  |
| chalk            | Enhances console output with colors and styles for better readability.                                                                                          |
| readline         | Enables interaction with the console, allowing cursor movement and screen clearing.                                                                                |
| fs               | Facilitates interaction with the file system, enabling file reading, writing, and deletion.                                                                    |
| path             | Offers utilities for manipulating file paths.                                                                                                                |
| rollup           | The core library responsible for bundling JavaScript code.                                                                                                    |
| vue              | A Rollup plugin specifically designed for handling Vue components within the bundling process.                                                              |
| typescript       | A Rollup plugin that supports TypeScript compilation during bundling.                                                                                          |
| uglify           | A Rollup plugin that minifies and optimizes the generated JavaScript code for production.                                                                      |
| auto             | A Rollup plugin that automatically installs missing dependencies during bundling.                                                                                |
| resolve          | A Rollup plugin that resolves module imports and provides support for various file extensions.                                                                  |
| replace          | A Rollup plugin that performs string replacements within the code, useful for configuring Vue options and preventing variable reassignment in production mode.      |
| url              | A Rollup plugin that handles inlining of small image and other media files into the JavaScript bundle for efficient loading.                                   |
| PostCSS          | A Rollup plugin that processes CSS code, supporting features like PostCSS imports, url handling, simple variables, nesting, and autoprefixer.                     |
| postcssImport   | A PostCSS plugin that resolves @css imports within the code, enabling the use of a dedicated CSS directory.                                                     |
| postcssUrl       | A PostCSS plugin that inlines small image and other media files referenced in CSS code, reducing HTTP requests.                                               |
| simplevars       | A PostCSS plugin that supports basic variable functionality within CSS code.                                                                                  |
| nested           | A PostCSS plugin that allows for nested rules in CSS code, enhancing its structural organization.                                                           |
| alias            | A Rollup plugin that sets up aliases for specific file paths, aiding in the resolution of imports and custom file paths.                                       |
| commonjs         | A Rollup plugin that supports bundling code written in the CommonJS module format.                                                                              |
| autoprefixer     | A PostCSS plugin that automatically adds vendor prefixes to CSS properties based on browser support.                                                           |
| json             | A Rollup plugin that handles JSON files within the bundling process.                                                                                          |


## Command Line Interface 💻

The script is executed from the command line using the `node` command. The `#!/usr/bin/env node` line at the beginning of the file specifies this.

## Bundle Creation 📦

The `bundle` command is responsible for the core functionality of the script: bundling the VueSPA project. 

### File and Configuration Checks 🔎

Before proceeding with bundling, the script performs several checks to ensure the necessary files and configurations are in place:

*   **Config Fileの存在確認:** `spa.config.json` fileの存在を確認します。
*   **必須ファイルの存在確認:** `configJson.routes` and `configJson.prerenderer` paths are checked for the respective routes config file and Prerenderer script.
*   **ソースディレクトリの確認:** `src` directoryの存在を確認します。
*   **出力ディレクトリの作成:** `public` directory is created to store the bundled output files.

### Route Creation 🗺️

The script parses the routes config file (`configJson.routes`) and generates corresponding HTML route files. Each route is assigned a unique