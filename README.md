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
In project route, you need the `src` directory. Under `src` directory, there must be a `views` directory which will contain all your page components.
In fact, this is the structure that is created when you created a new Vite project.

So, an ideal project structure will look like this.


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
