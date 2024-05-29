## VueSPA Bundler Documentation

**Table of Contents**

1.  **Overview** 
    *   1.1 Purpose
    *   1.2 Usage
2.  **Code Structure**
    *   2.1 Dependencies
    *   2.2 Configuration File (spa.config.json)
    *   2.3 Script Execution
    *   2.4 Core Functions
        *   2.4.1 walk()
        *   2.4.2 build()
        *   2.4.3 generateOutputs()
        *   2.4.4 generateHTMLRoute()
3.  **Bundling Process**
    *   3.1 Routes Creation
    *   3.2 JavaScript Bundle Creation
    *   3.3 Prerenderer Preparation
    *   3.4 VueSPA Files Setup


### 1. Overview

#### 1.1 Purpose

This script is a command-line tool designed to bundle a Vue.js Single Page Application (SPA) project. It automates the process of generating HTML routes, creating JavaScript bundles for components, preparing a prerenderer script, and setting up necessary VueSPA files.

#### 1.2 Usage

To use the bundler, follow these steps:

1.  **Install Node.js and npm:** Ensure you have Node.js and npm installed on your system. 
2.  **Create a `spa.config.json` file:** This file defines the project configuration, including the location of routes and prerenderer script. 
3.  **Run the bundler:** Open a terminal in your project directory and run the command `node ./bin/index.js bundle`.

### 2. Code Structure

#### 2.1 Dependencies

The script relies on the following external libraries:

| Library | Description |
| :------- | :---------- |
| yargs |  Command-line argument parsing |
| chalk |  Colored terminal output |
| readline |  Terminal input/output control |
| fs |  File system operations |
| path |  Path manipulation |
| rollup |  Module bundler |
| vue |  Rollup plugin for Vue.js components |
| typescript |  Rollup plugin for TypeScript compilation |
| uglify |  Rollup plugin for minification |
| auto |  Rollup plugin for automatic dependency installation |
| resolve |  Rollup plugin for resolving node modules |
| replace |  Rollup plugin for string replacement |
| url |  Rollup plugin for inlining assets |
| PostCSS |  Rollup plugin for PostCSS processing |
| postcssImport |  PostCSS plugin for importing CSS files |
| postcssUrl |  PostCSS plugin for handling URLs |
| simplevars |  PostCSS plugin for using variables |
| nested |  PostCSS plugin for nested CSS selectors |
| alias |  Rollup plugin for aliasing module paths |
| commonjs |  Rollup plugin for handling CommonJS modules |
| autoprefixer |  PostCSS plugin for adding vendor prefixes |
| json |  Rollup plugin for parsing JSON files |

#### 2.2 Configuration File (spa.config.json)

The configuration file `spa.config.json`  should be placed at the root of your project. It defines the following parameters:

| Parameter | Description |
| :-------- | :---------- |
| routes |  Path to the JSON file containing route definitions. |
| prerenderer |  Path to the prerenderer script. |

**Example `spa.config.json`:**

```json
{
  "routes": "routes.json",
  "prerenderer": "src/prerenderer.js"
}
```

#### 2.3 Script Execution

The script runs as a command-line tool. It takes a single command `bundle` which triggers the bundling process.

#### 2.4 Core Functions

##### 2.4.1 `walk()`

This function recursively traverses a directory and returns an array of all files within it.

```javascript
function walk(dir) {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap((file) => file.isDirectory() ? walk(join(dir, file.name)) : join(dir, file.name))
}
```

##### 2.4.2 `build()`

This function takes an input configuration object and an output configuration object and uses rollup to bundle the specified input file. 

```javascript
async function build(inputOption, outputOption) {
    let bundle
    let buildFailed = false
    try {
        bundle = await rollup(inputOption)
        await generateOutputs(bundle, outputOption)
    } catch (error) {
        buildFailed = true
        console.error(chalk.red(error), 'in', inputOption.input)
    }
    if (bundle) {
        await bundle.close()
    }
}
```

##### 2.4.3 `generateOutputs()`

This function writes the bundled output to the specified destination using the rollup `bundle.write()` method.

```javascript
async function generateOutputs(bundle, outputOption) {
    const { output } = await bundle.write(outputOption)
}
```

##### 2.4.4 `generateHTMLRoute()`

This function takes a route object and generates the corresponding HTML file content. It includes basic HTML structure, meta tags, and script imports.

```javascript
function generateHTMLRoute (route) {
    const title = route.meta.find(el => el.name === "title")?.content ?? ''
    return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>${title}</title>
      </head>
      <body>
        <main></main>
        <script type="importmap">
            {
            "imports": {
                "vue": "/vue.esm-browser.js"
            }
            }
        </script>
        <script src="./prerenderer.js" type="module"></script>
        <script src="./setup.js" type="module"></script>
      </body>
    </html>
    `
}
```

### 3. Bundling Process

#### 3.1 Routes Creation

The script first reads the route definitions from the specified `routes.json` file. It then generates an HTML file for each route, saving them to the `public` directory.

#### 3.2 JavaScript Bundle Creation

The script then iterates through the components found in the `src/views` directory. It uses Rollup to create a JavaScript bundle for each component, outputting them to the `public/bundles` directory.  Rollup plugins are used for:

*   **Vue.js component processing:**  The `vue` plugin handles Vue.js component compilation.
*   **TypeScript compilation:**  The `typescript` plugin compiles TypeScript code.
*   **Dependency resolution:** The `resolve` plugin resolves node modules.
*   **CommonJS module handling:** The `commonjs` plugin handles CommonJS modules.
*   **Minification:**  The `uglify` plugin minifies the bundled code.
*   **Asset inlining:**  The `url` plugin inlines assets like images.
*   **PostCSS processing:**  The `PostCSS` plugin processes CSS with plugins like `postcssImport`, `postcssUrl`, `simplevars`, `nested`, and `autoprefixer`.

#### 3.3 Prerenderer Preparation

The prerenderer script is bundled and saved to `public/prerenderer.js`. This script is responsible for handling initial rendering and server-side rendering.

#### 3.4 VueSPA Files Setup

Finally, the script copies two files, `setup.js` and `vue.esm-browser.js` to the `public` directory. It also creates `routes.config.js` file containing the route definitions for use in the client-side application. These files are essential for VueSPA's functionality. 
