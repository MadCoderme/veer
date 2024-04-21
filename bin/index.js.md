## VueSPA CLI

**Table of Contents**

- [Installation](#installation)
- [Usage](#usage)
    - [Commands](#commands)
- [API](#api)
    - [Input Options](#input-options)
    - [Output Options](#output-options)

---

## Installation

```sh
npm install -g vuespa-cli
```

---

## Usage

### Commands

| Command | Description |
|---|---|
| `bundle` | Bundle project as VueSPA |

---

### Examples

```sh
vuespa-cli bundle
```

---

## API

### Input Options

| Option | Type | Description |
|---|---|---|
| `input` | `string` | The input file or directory |
| `plugins` | `array` | An array of Rollup plugins |
| `external` | `array` | An array of external dependencies |

### Output Options

| Option | Type | Description |
|---|---|---|
| `file` | `string` | The output file |
| `format` | `string` | The output format |
| `compact` | `boolean` | Whether to compact the output |

---

## Example Usage

```javascript
import { build } from 'vuespa-cli'

const inputOptions = {
  input: 'src/main.js',
  plugins: [
    // ...
  ],
  external: [
    // ...
  ],
}

const outputOptions = {
  file: 'dist/main.js',
  format: 'es',
  compact: true,
}

build(inputOptions, outputOptions)
```