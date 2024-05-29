## 📖  VueSPA Bundler - Internal Documentation

This document provides a comprehensive overview of the VueSPA Bundler, a Node.js CLI tool designed to streamline the development of single-page applications (SPAs) using Vue.js. 

**Table of Contents**

| Section | Description |
|---|---|
| **1. Introduction** | Overview of the VueSPA Bundler and its purpose. |
| **2. Installation and Usage** | Instructions on how to install and use the bundler. |
| **3. Configuration** | Explanation of the configuration file (`spa.config.json`) and its options. |
| **4. Core Components** | Breakdown of the key components and their functionalities. |
| **5. Code Structure** | Explanation of the code structure and organization. |
| **6. Development Process** | Overview of the development process and workflow. |

### 1. Introduction

The VueSPA Bundler is a powerful command-line tool that simplifies the process of building Vue.js SPAs. It automates the bundling, prerendering, and setup of Vue applications, making it easier for developers to focus on building features rather than dealing with complex build configurations.

**Key Features:**

- **Automated Bundling:** Handles the creation of JavaScript bundles for Vue components.
- **Prerendering:** Generates HTML files for each route, enhancing SEO and initial load time.
- **VueSPA Setup:** Configures essential files for VueSPA, including routes and setup scripts.
- **Code Optimization:** Optimizes bundles for production environments through minification and other techniques.
- **Error Handling:** Provides clear error messages to aid in debugging.

### 2. Installation and Usage

**Installation**

1. **Prerequisites:** Ensure Node.js and npm (or yarn) are installed on your system.
2. **Install globally:** `npm install -g vuespa-bundler` or `yarn global add vuespa-bundler`

**Usage**

1. **Create Project:** Create a new directory for your VueSPA project.
2. **Initialize:**  Run `vuespa-bundler init` in the project directory to create a `spa.config.json` file.
3. **Bundle:** Execute `vuespa-bundler bundle` to start the bundling process.

### 3. Configuration

The `spa.config.json` file is the central configuration hub for the VueSPA Bundler. It defines the structure and behavior of your VueSPA project.

**Configuration Options:**

| Property | Description | Type | Default |
|---|---|---|---|
| `routes` | Path to the JSON file containing route definitions. | String | `./routes.json` |
| `prerenderer` | Path to the prerenderer script file. | String | `./prerenderer.js` |
| `outputDir` | Directory where the bundled files will be placed. | String | `./public` |

**Example `spa.config.json`:**

```json
{
  "routes": "./routes.json",
  "prerenderer": "./prerenderer.js",
  "outputDir": "./public"
}
```

### 4. Core Components

The VueSPA Bundler consists of several key components:

- **`yargs`:** A command-line argument parser for handling user input.
- **`rollup`:** A JavaScript module bundler used for creating optimized bundles.
- **`rollup-plugin-vue`:** A Rollup plugin for handling Vue component files.
- **`rollup-plugin-typescript2`:** A Rollup plugin for handling TypeScript files.
- **`@lopatnov/rollup-plugin-uglify`:** A Rollup plugin for minifying JavaScript bundles.
- **`@rollup/plugin-auto-install`:** A Rollup plugin for automatically installing external dependencies.
- **`@rollup/plugin-node-resolve`:** A Rollup plugin for resolving node modules.
- **`@rollup/plugin-replace`:** A Rollup plugin for replacing strings in code.
- **`@rollup/plugin-url`:** A Rollup plugin for handling file URLs.
- **`rollup-plugin-postcss`:** A Rollup plugin for processing CSS files.
- **`postcss-import`:** A PostCSS plugin for importing CSS files.
- **`postcss-url`:** A PostCSS plugin for handling URLs in CSS.
- **`postcss-simple-vars`:** A PostCSS plugin for defining CSS variables.
- **`postcss-nested`:** A PostCSS plugin for supporting nested CSS selectors.
- **`@rollup/plugin-alias`:** A Rollup plugin for creating aliases for file paths.
- **`@rollup/plugin-commonjs`:** A Rollup plugin for handling CommonJS modules.
- **`autoprefixer`:** A PostCSS plugin for adding vendor prefixes to CSS properties.
- **`@rollup/plugin-json`:** A Rollup plugin for handling JSON files.

### 5. Code Structure

The code for the VueSPA Bundler is organized into several files:

- **`index.js`:** The main entry point for the CLI application.
- **`setup.js`:** A script file that sets up the VueSPA environment.
- **`vue.esm-browser.js`:** A bundled Vue.js library file.
- **`routes.config.js`:** A script file containing the routes configuration.

### 6. Development Process

The VueSPA Bundler uses a streamlined development process:

1. **Configuration:** Create a `spa.config.json` file to define project settings.
2. **Development:** Develop Vue components and routes as needed.
3. **Bundling:** Execute `vuespa-bundler bundle` to bundle the project.
4. **Prerendering:** The bundler automatically generates HTML files for each route.
5. **Deployment:** Deploy the bundled files to a web server.

The bundler simplifies the development process by automating many tasks, such as bundling, prerendering, and configuration. Developers can focus on building features and functionalities for their Vue applications.
