## Table of Contents

- General
  - Features
  - Usage
  - Project Structure
- Commands
  - Bundle

## General

### Features

- Bundles Vue.js applications with Rollup
- Creates HTML routes for each Vue component
- Prepares a VueSPA entry point
- Minifies and optimizes the bundle

### Usage

```
npx vuespa bundle
```

### Project Structure

```
- public/
  - bundles/
    - views/
      - Home.js
      - About.js
  - index.html
  - routes.config.js
  - setup.js
  - vue.esm-browser.js
  - prerenderer.js
- src/
  - views/
    - Home.vue
    - About.vue
- spa.config.json
```

## Commands

### Bundle

```
npx vuespa bundle
```

- Bundles the Vue.js application and generates the necessary HTML routes and VueSPA entry point.