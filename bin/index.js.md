## Table of Contents

*   [Overview](#overview)
*   [Dependencies](#dependencies)
*   [Command Line Interface](#command-line-interface)
*   [Bundle Creation](#bundle-creation)
    *   [File and Configuration Checks](#file-and-configuration-checks)
    *   [Route Generation](#route-generation)
    *   [JavaScript Bundling](#javascript-bundling)
    *   [Prerenderer Preparation](#prerenderer-preparation)
    *   [VueSPA Setup](#vuespa-setup)
*   [Helper Functions](#helper-functions)
    *   [Directory Traversal](#directory-traversal)
    *   [Rollup Build](#rollup-build)
    *   [HTML Route Generation](#html-route-generation)

## Overview 🏃‍♀️

This script is designed to bundle a Vue Single Page Application (VueSPA) project, creating the necessary files and structure for deployment. It offers a command-line interface for user interaction and leverages various modules to handle different aspects of the bundling process.

## Dependencies

The script relies on several external modules to function correctly. These modules provide specific functionalities, as detailed in their respective documentation.

| Module          | Purpose                                                                                                                                                                         |
| :-------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| yargs           | Command line argument parsing                                                                                                                                                |
| chalk           | Text styling and coloring                                                                                                                                                  |
| readline        | Reading input from the console                                                                                                                                               |
| fs              | File system operations                                                                                                                                                       |
| path            | Path manipulation                                                                                                                                                           |
| rollup          | JavaScript bundling                                                                                                                                                         |
| vue             | Support for Vue components within Rollup                                                                                                                                       |
| typescript      | TypeScript compilation                                                                                                                                                        |
| uglify          | JavaScript minification                                                                                                                                                      |
| auto            | Automatic installation of peer dependencies during Rollup build                                                                                                                 |
| resolve         | Resolving module imports                                                                                                                                                       |
| replace         | String replacement within JavaScript code                                                                                                                                     |
| url             | Inlining of small files into JavaScript bundles                                                                                                                                 |
| PostCSS         | CSS processing with PostCSS                                                                                                                                                  |
| postcssImport  | Resolving @import statements in CSS                                                                                                                                            |
| postcssUrl      | Inlining of URLs in CSS                                                                                                                                                        |
| simplevars      | Support for simple variables in CSS                                                                                                                                            |
| nested          | Enabling nested rules in CSS                                                                                                                                                    |
| alias           | Resolving aliases for imports                                                                                                                                                  |
| commonjs        | Support for CommonJS modules                                                                                                                                                  |
| autoprefixer    | Adding vendor prefixes to CSS rules based on browser support                                                                                                                 |
| json            | Handling of JSON files                                                                                                                                                        |

## Command Line Interface ⌨️

The script exposes a single command, `bundle`, which triggers the entire bundling process. This command takes no arguments and produces output in the console.

## Bundle Creation 📦

### File and Configuration Checks 🔎

Before creating any files, the script performs several checks to ensure the project is ready for bundling:

1.  **Config Fileの存在確認:** `spa.config.json` 파일이 현재 작업 디렉토리에 있는지 확인합니다.
2.  **必要なファイルの存在確認:** `spa.config.json`에서 지정한 routes config 파일과 Prerenderer 스크립트 파일이 있는지 확인합니다.
3.  **소스 확인:** `src` 디렉토리가 있는지 확인합니다.
4.  **출력 디렉토리 생성:** `public` 디렉토리가 이미 존재하면 제거하고 새로 만듭니다.

### Route Generation 🗺️

1.  `spa.config.json`에서 지정한 경로 config 파일을 파싱하여 JavaScript 객체로 로드합니다.
2.  각 경로에 대해 다음과 같은 작업을 수행합니다.
    *   경로가 루트("/")이면 `index.html` 파일을 생성합니다.
    *   그렇지 않으면 경로 이름을 사용하여 `*.html` 파일을 생성합니다.
3.  각 HTML 파일은 `generateHTMLRoute` 함수를 사용하여 동적 콘텐츠를 삽입한 후 생성됩니다.

### JavaScript Bundling 🧩

1.  `src/views` 디렉토리에서 모든 `.vue` 파일의 경로를 수집합니다.
2.  각 파일 경