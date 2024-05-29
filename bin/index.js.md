## VueSPA Bundle CLI Documentation

**Table of Contents**

| Section | Description |
|---|---|
| [Introduction](#introduction) | Overview of the CLI tool and its purpose |
| [Installation](#installation) | Instructions on installing the CLI tool |
| [Usage](#usage) | Commands and their usage |
| [Configuration](#configuration) | Configuring the CLI tool |
| [Code Structure](#code-structure) | Breakdown of the code and its functions |
| [Contributing](#contributing) | Guidelines for contributing to the project |

### Introduction 

This CLI tool is designed to bundle a Vue.js Single Page Application (SPA) into a deployable format. It leverages Rollup for bundling and includes features like route generation, prerendering, and VueSPA setup.

### Installation

1. **Prerequisites:**
    * Node.js and npm (or yarn)
    * A Vue.js project with a `src` directory containing your Vue components.
2. **Install globally:**
    ```bash
    npm install -g <package-name> 
    ```

### Usage

**Bundle Command:** 
  ```bash
  vuespa-bundle bundle
  ```
  This command bundles your VueSPA project.

### Configuration

The CLI tool reads a configuration file called `spa.config.json` from the root of your project directory. Here's an example structure:
```json
{
  "routes": "routes.json", // Path to the routes configuration file
  "prerenderer": "prerender.js" // Path to the prerenderer script
}
```

**routes.json:**
```json
[
  {
    "path": "/",
    "component": "src/views/HomePage.vue",
    "meta": [
      {
        "name": "title",
        "content": "Home Page" 
      }
    ]
  },
  {
    "path": "/about",
    "component": "src/views/AboutPage.vue",
    "meta": [
      {
        "name": "title",
        "content": "About Us" 
      }
    ]
  }
]
```

**Important Notes:** 

* The `meta` array in the `routes.json` file can contain custom data for each route. 
* The `title` meta field is used to generate the HTML title tag for each route.
* Your Vue components must be located in the `src/views` directory.

### Code Structure

**Key Components:**

1. **`index.js`** 
    * Entry point for the CLI tool.
    * Uses `yargs` for command parsing and arguments.
    * Defines the `bundle` command for bundling the VueSPA.
    * Executes the bundling process asynchronously.
    * Includes functions for:
        * **`walk()`:** Recursively walks a directory tree and returns a list of all files.
        * **`build()`:** Bundles a single Vue component using Rollup.
        * **`generateOutputs()`:** Generates the output files for the bundle.
        * **`generateHTMLRoute()`:** Generates HTML for a route using the provided route data.

2. **`spa.config.json`**
    * Configuration file for the VueSPA bundle CLI.
    * Specifies the locations of the routes file and the prerenderer script.

3. **`routes.json`**
    * Contains an array of route objects defining the paths, components, and meta data for each route in the application.

4. **`prerender.js`**
    * A custom prerendering script that pre-renders the SPA's content on the server.

5. **`src/views`**
    * Directory containing Vue components, which are bundled into individual JavaScript files.

6. **`public`**
    * Directory where the bundled application is outputted.

**Rollup Plugins:**
* `vue`: Bundles Vue.js components.
* `typescript`: Transpiles TypeScript code.
* `uglify`: Minifies JavaScript code.
* `auto`: Automatically installs required modules.
* `resolve`: Resolves module dependencies.
* `replace`: Replaces placeholder values in the code.
* `url`: Handles URL imports for images and other assets.
* `PostCSS`: Processes CSS files with PostCSS plugins.
* `postcssImport`: Resolves CSS imports.
* `postcssUrl`: Handles URLs in CSS files.
* `simplevars`: Processes CSS variables.
* `nested`: Allows for nested CSS selectors.
* `alias`: Creates aliases for module paths.
* `commonjs`: Handles CommonJS modules.
* `autoprefixer`: Adds vendor prefixes to CSS.
* `json`: Handles JSON files.

**Code Explanation:**

* **Bundling Process:**
    * The `bundle` command reads the `spa.config.json` file for configuration.
    * It reads the routes from the specified routes file (`routes.json`).
    * For each route, it generates an HTML file with the appropriate title, script imports, and a placeholder for the Vue component.
    * It then uses Rollup to bundle each Vue component into a separate JavaScript file.
    * The bundled files are outputted into the `public` directory.
    * The prerenderer script is also bundled and outputted as `prerenderer.js`.
    * Finally, the necessary VueSPA setup files (including Vue.js, the routes configuration, and a setup script) are copied into the `public` directory.

* **Prerendering:**
    * The bundled prerenderer script is responsible for pre-rendering the content of the SPA on the server.
    * This improves SEO and initial page load performance.

* **VueSPA Setup:**
    * The `setup.js` script is used to bootstrap the VueSPA on the client side.
    * It loads the necessary Vue components and initializes the application.

* **HTML Generation:**
    * The `generateHTMLRoute()` function generates the HTML for each route, including the title, script imports, and a placeholder for the Vue component.

* **PostCSS:**
    * PostCSS is used to process CSS files with plugins like `postcssImport`, `postcssUrl`, `simplevars`, and `autoprefixer`.

**Key Functionality:**

* **Route Generation:**
    * Creates HTML files for each route in the application.
    * Sets the correct title and meta tags for each route.

* **Component Bundling:**
    * Bundles each Vue component into a separate JavaScript file using Rollup.

* **Prerendering:**
    * Includes a prerendering script to improve SEO and initial page load performance.

* **VueSPA Setup:**
    * Provides a setup script to initialize the VueSPA on the client side.

* **Configuration:**
    * Uses a configuration file to specify the routes and prerenderer script.

* **Error Handling:**
    * Includes error handling to catch potential issues during the bundling process.

**Future Improvements:**

* Add support for more advanced routing configurations (e.g., nested routes).
* Provide options for customizing the output directory and bundling settings.
* Improve the CLI user experience with more informative output and progress indicators.
