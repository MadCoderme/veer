#!/usr/bin/env node
import yargs from "yargs/yargs"
import { hideBin } from "yargs/helpers"
import chalk from "chalk"
import readline from 'readline'
import fs from 'fs'
import path from "path"
import { rollup } from "rollup"
import vue from 'rollup-plugin-vue'
import typescript from 'rollup-plugin-typescript2'
import uglify from '@lopatnov/rollup-plugin-uglify'
import auto from '@rollup/plugin-auto-install'
import resolve from '@rollup/plugin-node-resolve'
import replace from "@rollup/plugin-replace"
import url from '@rollup/plugin-url'
import PostCSS from 'rollup-plugin-postcss'
import postcssImport from 'postcss-import'
import postcssUrl from 'postcss-url'
import simplevars from 'postcss-simple-vars'
import nested from 'postcss-nested'
import alias from '@rollup/plugin-alias'
import commonjs from '@rollup/plugin-commonjs'
import autoprefixer from 'autoprefixer'
import json from '@rollup/plugin-json'

const { join } = path

const postcssConfigList = [
    postcssImport({
      resolve(id, basedir) {
        // resolve alias @css, @import '@css/style.css'
        // because @css/ has 5 chars
        if (id.startsWith("@css")) {
          return path.resolve("./src/assets/styles/css", id.slice(5));
        }
  
        // resolve node_modules, @import '~normalize.css/normalize.css'
        // similar to how css-loader's handling of node_modules
        if (id.startsWith("~")) {
          return path.resolve("./node_modules", id.slice(1));
        }
  
        // resolve relative path, @import './components/style.css'
        return path.resolve(basedir, id);
      }
    }),
    simplevars,
    nested,
    postcssUrl({ url: "inline" }),
    autoprefixer({
      overrideBrowserslist: "> 1%, IE 6, Explorer >= 10, Safari >= 7"
    })
]

yargs(hideBin(process.argv))
    .command('bundle', 'Bundle project as VueSPA', () => { }, async(argv) => {
        const blank = '\n'.repeat(process.stdout.rows)
        console.log(blank)
        
        readline.cursorTo(process.stdout, 0, 0)
        readline.clearScreenDown(process.stdout)
        console.time('Time elapsed')
        console.log(chalk.blue('🔎 Looking for necessary files'))
        // check for config file
        if (!fs.existsSync(process.cwd() + '/spa.config.json')) {
            console.error(chalk.red("Could not find config file"))
            return
        }
        // check for necessary files
        const config = fs.readFileSync(process.cwd() + '/spa.config.json', { encoding: 'utf-8' })
        const configJson = JSON.parse(config)
        if (!fs.existsSync(process.cwd() + '/' + configJson.routes)) {
            console.error(chalk.red("Could not find routes config file"))
            return
        }
        if (!fs.existsSync(process.cwd() + '/' + configJson.prerenderer)) {
            console.error(chalk.red("Could not find Prerenderer script"))
            return
        }
        // check for source
        if (!fs.existsSync(process.cwd() + '/src')) {
            console.error(chalk.red("Could not find source directory"))
            return
        }
        // create output dir
        if (fs.existsSync(process.cwd() + '/public')) {
            fs.rmSync(process.cwd() + '/public', { recursive: true }) 
        }
        fs.mkdirSync(process.cwd() + '/public')

        // create routes
        console.log(chalk.blue('⚙️ Creating Routes'))
        const routes = JSON.parse(fs.readFileSync(process.cwd() + '/' + configJson.routes, {encoding: 'utf-8'}))
        console.log(chalk.gray(routes.length + ' routes found'))
        routes.forEach(el => {
            if (el.path === "/") fs.writeFileSync(process.cwd() + '/public/index.html', generateHTMLRoute(el))
            else fs.writeFileSync(process.cwd() + '/public/' + el.path + '.html', generateHTMLRoute(el))
        })
        console.log(chalk.green('Routes have been created'))
        console.log('\n')

        // create js bundle
        console.log(chalk.blue('⚙️ Creating Bundles'))

        const dir = walk(process.cwd() + '/src/views')
        const inputs = [],
              outputs = []
        console.log(chalk.gray(dir.length + ' files found'))
        dir.forEach(el => {
            if (!routes.find(r => r.component === el.replace(process.cwd() + '/src/', ''))) return
            inputs.push({ 
                input: el, 
                plugins: [
                    alias({
                        entries: [{ find: /^@\/(.*)/, replacement: process.cwd() + '/src/$1' }],
                        customResolver: resolve({
                          extensions: [".js", ".jsx", ".vue"]
                        })
                    }),
                    resolve({
                        browser: true
                    }),
                    json(),
                    typescript(),
                    replace({
                        "process.env.NODE_ENV": JSON.stringify("production"),
                        __VUE_OPTIONS_API__: JSON.stringify(true),
                        __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
                        preventAssignment: true
                    }),
                    vue({
                        target: "browser",
                        preprocessStyles: true,
                        postcssPlugins: [...postcssConfigList]
                    }), 
                    PostCSS({
                        modules: {
                            generateScopedName: '[local]___[hash:base64:5]',
                            },
                            include: /&module=.*\.css$/,
                    }),
                    // Process all `<style>` blocks except `<style module>`.
                    PostCSS({ include: /(?<!&module=.*)\.css$/,
                        plugins:[
                            ...postcssConfigList
                        ]
                    }),
                    url({
                        include: [
                                '**/*.svg',
                                '**/*.png',
                                '**/*.gif',
                                '**/*.jpg',
                                '**/*.jpeg'
                        ],
                        publicPath: 'bundles/views/'
                    }),
                    commonjs(),
                    uglify()
                ], 
                external: ['vue'] 
            })
            outputs.push({ 
                file:  process.cwd() + '/public/bundles' + el.replace(process.cwd() + '/src', '').replace('.vue', '.js'),
                format: 'es',
                compact: true
            })
        })
        for (const input of inputs) {
            await build(input, outputs[inputs.indexOf(input)])
        }
        console.log(chalk.green('Bundles have been generated'))
        console.log('\n')

        // prepare prerenderer file
        console.log(chalk.blue('⚙️ Preparing Prerenderer'))
        await build({
            input: process.cwd() + '/' + configJson.prerenderer
        }, {
            file: process.cwd() + '/public/prerenderer.js', format: 'es' 
        })
        console.log(chalk.green('Prerender has been formatted'))
        console.log('\n')

        // setup vuespa files
        console.log(chalk.blue('⚙️ Adding VueSPA Magic'))
        fs.copyFileSync(import.meta.url.replace('file://', '').replace('bin/index.js', '') + 'setup.js', process.cwd() + '/public/setup.js')
        fs.copyFileSync(import.meta.url.replace('file://', '').replace('bin/index.js', '') + 'vue.esm-browser.js', process.cwd() + '/public/vue.esm-browser.js')
        fs.writeFileSync(process.cwd() + '/public/routes.config.js', 'export const routes = ' + JSON.stringify(routes))
        console.log(chalk.green('VueSPA Files Copied'))
        console.log('\n')

        // done
        console.log(chalk.green('Done'))
        console.timeEnd('Time elapsed')
    })
    .demandCommand(1)
    .parse()


function walk(dir) {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap((file) => file.isDirectory() ? walk(join(dir, file.name)) : join(dir, file.name))
}

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

async function generateOutputs(bundle, outputOption) {
    const { output } = await bundle.write(outputOption)
}

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
        <main>
             
        </main>
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
