## Table of Contents
1. [Overview](#overview)
2. [Command](#command)
3. [Parameters](#command)
4. [Functionality](#command)
5. [Example Usage](#command)
6. [Additional Information](#command)

## Overview
This is a command-line tool for bundling a Vue.js Single-Page Application (SPA) project. It takes care of creating the necessary HTML routes, generating JavaScript bundles, preparing the prerenderer script, and setting up the VueSPA files.
Command
```cli
bundle
```

## Parameters

None

## Functionality

The bundle command performs the following steps:

1. Checks for the necessary files and directories.
2. Creates HTML routes for each route defined in the spa.config.json file.
3. Generates JavaScript bundles for each Vue.js component using Rollup.
4. Prepares the prerenderer script by bundling it with Rollup.
5. Copies the necessary VueSPA files to the output directory.

## Example Usage

To use this tool, you can run the following command in your project directory:
```
npx vuespa-bundle bundle
```

This will create the necessary files and directories for your Vue.js SPA project.

## Additional Information

- The `spa.config.json` file is a JSON file that contains the configuration for the VueSPA project. It should include the following properties:
  - `routes`: The path to the file that contains the route definitions.
  - `rerenderer`: The path to the prerenderer script.
  
- The `routes` file is a JSON file that contains an array of route objects. Each route object should have the following properties:
  - `path`: The path of the route.
  - `component`: The path to the Vue.js component for the route.
  - `meta`: An array of meta tags for the route.
    
- The prerenderer script is a JavaScript file that is responsible for prerendering the Vue.js application on the server.


## Links

[Vue.js SPA Guide]()

[Rollup Documentation]()
