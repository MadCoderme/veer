## VueSPA CLI

This is a CLI tool for creating Vue.js SPAs.
It bundles your Vue.js code, creates HTML routes, and adds the necessary VueSPA magic to make your app work.

### Usage

```
npx vuespa-cli bundle
```

### Features

- Bundles your Vue.js code using Rollup.js
- Creates HTML routes for each Vue.js component
- Adds the necessary VueSPA magic to make your app work

### Requirements

- Node.js >= 14
- Vue.js >= 3

### Installation

```
npm install -g vuespa-cli
```

### Command Reference

#### `bundle`

Bundles your Vue.js code, creates HTML routes, and adds the necessary VueSPA magic to make your app work.

**Usage:**

```
vuespa-cli bundle
```

**Options:**

| Option | Description |
|---|---|
| `-w, --watch` | Watch for changes to your Vue.js code and rebuild the bundle automatically. |
| `-o, --output` | The output directory for the bundled code. |

### Example Usage

```
npx vuespa-cli bundle -o public
```

This will bundle your Vue.js code and create an `index.html` file in the `public` directory.

### Additional Information

- The VueSPA CLI uses Rollup.js to bundle your Vue.js code.
- The HTML routes are created using the `html-webpack-plugin`.
- The VueSPA magic is added using the `vue-router` and `vuex` libraries.

### Links

- [Vue.js](https://vuejs.org/)
- [Rollup.js](https://rollupjs.org/)
- [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)
- [vue-router](https://router.vuejs.org/)
- [vuex](https://vuex.vuejs.org/)