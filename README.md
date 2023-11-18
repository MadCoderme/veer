# veer
An upgraded SPA rendering method that focuses on performance and SEO.

## Why veer?
SPA is a popular choice when it comes to building javascript based web applications. Low cost and ease in development attract many developers to roll up SPA. While vue.js is fast at its core, common problems still exist.

1. SPA is loaded on client side. What this means is that all the bundles need to be loaded before anything can be shown. Even with code splitting, this badly affects initial loading time and time to be interactive as the project gets larger over time
2. SPA is considered to be Non-SEO friendly. As the entire app is just a single page, you can't tell crawlers different meta information. Besides, most of the routers use hash routes which are not counted as different pages by the crawlers.

Veer aims to solve these two problems with a minimal approach.

## How does it work?
Veer is not a development server like Vite, neither another library that is shipped with your existing project.

It's simply an alternative approach to generate your SPA bundles, however, it's not a bundler.

Veer controls how your bundle is served, how your pages are rendered and how your routing works. There are a few simple principles -

- Every route/page has their own respective bundle generated. So, your app is never bundled into a single file (unless you have just one route :P)
- There is a HTML file/page for each route, containing your SEO optimizations which are served when requested
- When a page is visited, respective HTML file is presented which are all capable of serving the entire application
- Primarily, the HTML file contains nothing more than some basic pre rendered elements. The main bundle is loaded and mounted once the initial page is fully loaded. This ensures the fastest possible loading time regardless of how large your application is.
- Subsequent routes are mounted accordingly when navigated

## Installing veer
As simple as running your favorite command:
  ```
  npm i -g veer
  ```
## Usage
Currently there is just one command that generates your production bundle.
  ```
  veer bundle
  ```
## Project structure
What basically matters is the structure of your project. However, veer can be quite easily used with your existing project structure.

### Directory structure
At project route, you need the `src` directory. Under `src` directory, there must be a `views` directory which will contain all your page components.
In fact, this is the structure that is created when you created a new Vite project.

So, a minimal project structure will look like this.
```
/
├── node_modules
├── src
│   └── views
│       ├── Component1.vue
│       └── Component2.vue
├── spa.config.json
├── routes.config.json
├── prerenderer.js
└── package.json
```

### Additional Files
There are three extra files required.

#### `spa.config.json`
This is the main configuration file that directs to other necessary ones. Veer needs two files to work.
1. `routes`: This file lists all the accessible routes
2. `prerenderer`: This file declares a common function that is called before every bundle/page is loaded


```json
{
    "routes": "routes.config.json",
    "prerenderer": "prerenderer.js"
}
```

You can name those files anything you want, however, the default names are used here to describe their usage.

#### routes.config.json
Includes all your routes. Veer itself is an independent routing system.

**Example**
```json
[
    {
        "path": "/",
        "component": "views/Home.vue",
        "meta": [
            { "name": "title", "content": "Home page!" }
        ]
    },
    {
        "path": "/search",
        "component": "views/Search.vue",
        "meta": [
            { "name": "title", "content": "Search things" }
        ]
    }
]
```

**Available props**
| Name  | Type | Note |
| ------------- | ------------- | ------------- |
| `path`  | string  | Route path. Currently, params are not supported  |
| `component`  | string  | Location of component. Veer looks up for `src` directory. Then, only files under `src/views` directory are processed  |
| `meta`  | array  | Array of meta information. Each object contains two properties: `name` and `value`. Currently, only `title` and `description` works. |

#### prerenderer.js
This is an interesting part of Veer functionality. 

**Example**
```javascript
window.prerender = () => {
  if (window.location.hash === "about") {
    document.getElementsByTagName('main')[0].innerHTML = "Loading About..."
  }
}
```
You must define a function named `window.prerender()` here which will be called right before loading individual bundle.

You can put any kind of logic inside this function that will render a pre loader or do some essential tasks while the full page is being loaded. However, it's recommended to keep it small and synchronous. In later versions, a size restriction will be applied.

## Deployment 
Once successfully processed, veer will generate a `public` folder at root location. This is the default structure:
```
/public
├── bundles
│   └── views
│       ├── Component1.js
│       └── Component2.js
├── index.html
├── path1.html
├── routes.config.js
├── setup.js
└── vue.esm-browser.js
```
This is now ready to be deployed like any other vue project. However, a few things need further attentions.

### Removing file extensions
It's required to serve the path files without their `.html` extension. Otherwise, routing will break.

To achieve this, you need to configure your server which varies depending on your server language and technology. Common examples are shown below.

#### Vercel
Create a `vercel.json` config file at root and put the following in it:
```json
{
  "cleanUrls": true
}
```

#### Netlify
Enable Pretty URL for your site.

#### Github Pages
No extra configuration needed

#### Express.js
Configure `extension` option in `express.static` method.
```js
app.use(express.static(path.join(__dirname, 'public'), { index:false, extensions: ['html'] }));
```

#### Apache
Configure `.htaccess` file. Full process and explanation here: https://ubiq.co/tech-blog/how-to-remove-html-from-url-in-apache-wordpress/

### Using vue Plugins

As there is no `main.js` file, you need to install vue plugins inside the components, wherever needed. To make this easier, use `window.app` which is defined automatically after initial scripts are loaded.

```js
// Example of installing pinia plugin

import { createPinia } from 'pinia'

window.app.use(createPinia())

```
And, you should be good to go.


## Typescript support

Veer supports typescript by default. However, you may need to change your `tsconfig` to make it run smoothly. Here is a config that I used during tests.

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "ESNext",
    "strict": false,
    "jsx": "preserve",
    "allowJs": true,
    "importHelpers": true,
    "moduleResolution": "Node",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "noResolve": false,
    "noImplicitAny": false,
    "removeComments": true,
    "sourceMap": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    },
    "types": [
      "node",
      "vue"
    ],
    "lib": [
      "esnext",
      "dom",
      "dom.iterable",
      "scripthost"
    ]
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "tests/**/*.ts",
    "tests/**/*.tsx"
, "index.d.ts"  ],
  "exclude": [
  ]
}
```

## Performance 
Here is a performance comparison between a normal Vite build and a Veer build. 

| Vite  | Veer |
| ------------- | ------------- |
| ![Mobile](https://github.com/MadCoderme/veer/assets/63955762/3ffc9a30-87ff-483b-92c3-ebb18f208dfe) Mobile | ![Mobile](https://github.com/MadCoderme/veer/assets/63955762/4aa55e02-c2c1-4388-9fd3-2758aba2796d) Mobile |
| ![Desktop](https://github.com/MadCoderme/veer/assets/63955762/c244fe6e-3b82-4135-887b-b1eef1be1051) Desktop | ![Desktop](https://github.com/MadCoderme/veer/assets/63955762/cf0ffbec-a689-402c-8d27-929efb0c8da8) Desktop |


This was done on a lightweight minimal todo app at https://github.com/beary/vite-example. I simply copied the `src` directory, created the required three files, and ran `veer bundle`. This shows, how Veer can improve performance even in the bare-bone vue apps (around 40% faster in Mobile).

**Tips:** To get the minimum cumulative layout shift, optimize your pre-renders.


