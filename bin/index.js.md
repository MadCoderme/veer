# 📝 VueSPA CLI Documentation

## 📖 Table of Contents

- [Introduction](#introduction)
- [Commands](#commands)
    - [bundle](#bundle)
- [Usage](#usage)
- [Troubleshooting](#troubleshooting)

## 🌐 Introduction

VueSPA CLI is a command-line interface tool that helps you quickly and easily create Vue.js Single-Page Applications (SPAs). It provides a set of pre-configured build scripts and templates that streamline the development process.

## 🚀 Commands

### bundle

The `bundle` command is used to build your Vue.js SPA. It takes the following options:

| Option | Description | Default |
|---|---|---|
| `--routes` | Path to the routes config file | `routes.json` |
| `--prerenderer` | Path to the Prerenderer script | `prerenderer.js` |

**Example usage:**

```
vuespa bundle --routes=my-routes.json --prerenderer=my-prerenderer.js
```

## 💡 Usage

To use VueSPA CLI, you will need to have Node.js and npm installed on your system. Once you have installed VueSPA CLI globally using npm, you can use it by running the following command in your project directory:

```
npx vuespa <command>
```

## 🚧 Troubleshooting

If you encounter any issues while using VueSPA CLI, please check the following:

- Make sure you have Node.js and npm installed.
- Make sure you are running VueSPA CLI in the correct project directory.
- Check the VueSPA CLI documentation for more information.

## 🎉 Conclusion

VueSPA CLI is a powerful tool that can help you quickly and easily create Vue.js SPAs. By following the instructions in this documentation, you can get started with VueSPA CLI and start building your own SPAs today!