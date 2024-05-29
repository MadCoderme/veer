## VueSPA Bundler Documentation

### Table of Contents

* [Introduction](#introduction)
* [Project Setup](#project-setup)
* [Configuration](#configuration)
* [Bundling Process](#bundling-process)
* [File Structure](#file-structure)
* [Prerenderer](#prerenderer)
* [VueSPA Files](#vuespa-files)
* [Code Breakdown](#code-breakdown)
    * [Dependencies](#dependencies)
    * [yargs Configuration](#yargs-configuration)
    * [Bundle Command](#bundle-command)
    * [File Validation](#file-validation)
    * [Route Generation](#route-generation)
    * [Bundle Creation](#bundle-creation)
    * [Prerenderer Preparation](#prerenderer-preparation)
    * [VueSPA Setup](#vuespa-setup)
    * [Helper Functions](#helper-functions)
    * [Build Function](#build-function)
    * [Generate Outputs Function](#generate-outputs-function)
    * [Generate HTML Route Function](#generate-html-route-function)

### Introduction

This code implements a command-line tool for bundling a VueSPA (Single Page Application) project. It takes your Vue components, routes, and a prerenderer script and generates optimized HTML files for each route along with bundled JavaScript code. This process simplifies deployment and improves SEO performance.

### Project Setup

1.  **Installation:** Install the required packages using npm:

    ```bash
    npm install 
    ```
2.  **Configuration:** Create a `spa.config.json` file in your project root with the following structure:

    ```json
    {
        "routes": "path/to/routes.json", 
        "prerenderer": "path/to/prerenderer.js"
    }
    ```

    *   **routes:** Path to a JSON file containing route configurations for your application.
    *   **prerenderer:** Path to a JavaScript file that will handle server-side rendering.

3.  **Source Directory:** Ensure you have a `src` directory containing your Vue components, assets, and other source files.

### Configuration

This section details the configuration options available within the `spa.config.json` file.

| Configuration Option | Description |
| ------------------ | ----------- |
| `routes`            | Path to the JSON file containing route definitions. |
| `prerenderer`      | Path to the JavaScript file handling server-side rendering. |

### Bundling Process

1.  **File Validation:** The script verifies the existence of the configuration file (`spa.config.json`), route definitions, prerenderer script, and source directory.
2.  **Route Generation:** It reads the route configuration and generates HTML files for each route, placing them in the `public` directory.
3.  **Bundle Creation:** The script bundles your Vue components into optimized JavaScript files and places them in the `public/bundles` directory.
4.  **Prerenderer Preparation:** The prerenderer script is bundled and placed in the `public` directory.
5.  **VueSPA Setup:**  Copies essential VueSPA files (like `setup.js` and `vue.esm-browser.js`) to the `public` directory and generates a `routes.config.js` file with route definitions.

### File Structure

The bundled project structure will be as follows:

```
public/
    index.html
    <route-path>.html
    bundles/
        <component-name>.js
    prerenderer.js
    setup.js
    vue.esm-browser.js
    routes.config.js
```

### Prerenderer

The prerenderer script is responsible for handling server-side rendering for your application. It should be a JavaScript file that:

1.  **Imports Necessary Dependencies:** Includes any required libraries like `vue` and your application's components.
2.  **Renders Routes:** Renders the appropriate Vue component based on the requested route.
3.  **Returns HTML:** Returns the generated HTML for the specific route.

### VueSPA Files

The copied VueSPA files are critical for the application's functionality:

*   **setup.js:** Initializes the Vue SPA environment and sets up the router.
*   **vue.esm-browser.js:** The Vue library.
*   **routes.config.js:** Contains the application's route definitions for routing.

### Code Breakdown

#### Dependencies

*   **yargs**: For parsing command-line arguments.
*   **chalk**: For colorful console output.
*   **readline**: For interactive console interactions.
*   **fs**: For file system operations.
*   **path**: For working with file paths.
*   **rollup**: For bundling JavaScript code.
*   **rollup-plugin-vue**: For processing Vue components.
*   **rollup-plugin-typescript2**: For compiling TypeScript code.
*   **@lopatnov/rollup-plugin-uglify**: For minifying code.
*   **@rollup/plugin-auto-install**: For automatically installing dependencies.
*   **@rollup/plugin-node-resolve**: For resolving module imports.
*   **@rollup/plugin-replace**: For replacing string values in the code.
*   **@rollup/plugin-url**: For embedding assets like images directly into the bundle.
*   **rollup-plugin-postcss**: For processing CSS files.
*   **postcss-import**: For importing CSS files.
*   **postcss-url**: For handling URL references in CSS.
*   **postcss-simple-vars**: For using variables in CSS.
*   **postcss-nested**: For writing nested CSS rules.
*   **@rollup/plugin-alias**: For creating aliases for paths.
*   **@rollup/plugin-commonjs**: For handling CommonJS modules.
*   **autoprefixer**: For adding vendor prefixes to CSS.
*   **@rollup/plugin-json**: For handling JSON files.

#### yargs Configuration

The `yargs` library is used to define the command-line interface for the bundler. It defines a single command:

*   **bundle:** This command triggers the bundling process.

#### Bundle Command

The `bundle` command handles the core logic of the bundler:

*   **Clear Console:** Clears the console to provide a clean output.
*   **File Validation:** Checks for the existence of the configuration file, routes, prerenderer, and source directory.
*   **Route Generation:** Generates HTML files for each route defined in the `routes.json` file.
*   **Bundle Creation:** Bundles Vue components into JavaScript files using Rollup.
*   **Prerenderer Preparation:** Bundles the prerenderer script.
*   **VueSPA Setup:** Copies essential VueSPA files to the `public` directory.

#### File Validation

The script checks for the following files:

*   `spa.config.json`: The configuration file.
*   `routes.json`: The route definitions file.
*   `prerenderer.js`: The server-side rendering script.
*   `src`: The source directory containing Vue components.

#### Route Generation

The script reads the route definitions from `routes.json` and generates HTML files for each route, using the `generateHTMLRoute` function.

#### Bundle Creation

The script processes each Vue component in the `src/views` directory:

1.  **Rollup Configuration:** Creates a Rollup configuration object for each component, specifying input files, plugins, and external dependencies.
2.  **Bundle Creation:** Uses Rollup to bundle the component into a JavaScript file.
3.  **Output:** Writes the bundled JavaScript file to the `public/bundles` directory.

#### Prerenderer Preparation

The script bundles the `prerenderer.js` file and places it in the `public` directory.

#### VueSPA Setup

The script copies the following files to the `public` directory:

*   **setup.js**: Initializes the Vue SPA environment.
*   **vue.esm-browser.js**: The Vue library.
*   **routes.config.js**: Contains route definitions.

#### Helper Functions

*   **walk**: Recursively walks a directory and returns a list of files.
*   **generateHTMLRoute**: Generates the HTML structure for a route, including meta tags and script tags for VueSPA initialization.

#### Build Function

The `build` function handles the Rollup build process for individual components. It takes the input configuration and output configuration as arguments. It uses Rollup to bundle the code and writes the output to the specified file.

#### Generate Outputs Function

The `generateOutputs` function handles the writing of bundled output to the specified file. It takes the Rollup bundle and the output configuration as arguments.

#### Generate HTML Route Function

The `generateHTMLRoute` function generates the HTML structure for a route. It takes the route object as an argument and returns the generated HTML string.

This documentation provides a comprehensive overview of the VueSPA bundler's functionality and code structure. It helps developers understand the purpose and implementation of each part of the code, enabling them to efficiently maintain and extend the project. 
