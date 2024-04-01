## 🛠️ VueSPA CLI

### 📚 Table of Contents
- 📝 Overview
- 🚀 Getting Started
- ⚙️ Usage
- 💡 Example Usage
- ℹ️ Additional Information
- 🔗 Links

### 📝 Overview

This CLI tool is designed to streamline the process of bundling and setting up a Vue single-page application (SPA). It automates tasks such as creating HTML routes, generating optimized JavaScript bundles, and integrating the necessary frameworks and utilities for VueSPA.

### 🚀 Getting Started

1. Install the CLI globally using npm: `npm install vuespa-cli -g`
2. Create a new VueSPA project: `mkdir my-vue-spa && cd my-vue-spa`
3. Initialize the project: `npx vuespa init`

### ⚙️ Usage

The CLI offers a single command:

- `bundle`: Bundles the VueSPA project and sets up necessary files for deployment

### 💡 Example Usage

To bundle your VueSPA project, run:

```
npx vuespa bundle
```

### ℹ️ Additional Information

- The CLI relies on a `spa.config.json` file in the project root directory to configure project-specific settings, such as the routes to generate.
- The bundled JavaScript code includes Vue.js, the Vue SPA setup script, and the necessary polyfills for browser compatibility.
- The CLI uses Rollup for bundling and optimization, and PostCSS for CSS processing.

### 🔗 Links

- [Vue.js](https://vuejs.org/)
- [Rollup](https://rollupjs.org/)
- [PostCSS](https://postcss.org/)