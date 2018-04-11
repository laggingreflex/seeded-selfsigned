# seeded-selfsigned

[Selfsigned] but takes a seed to generate deterministic\* self-signed certificates.

**Note\***: It'll generate same keys **only** each time you **start the process**, **not** each time you *generate*.

## Install

```
npm install seeded-selfsigned
```

## Usage

Use just like you would [selfsigned]`.generate()` function except the first argument is `{seed}`

```js
const seededSelfsigned = require('seeded-selfsigned')

seededSelfsigned({seed: 'some seed'}, ...options_for_selfsigned.generate)
```

[selfsigned]: https://github.com/jfromaniello/selfsigned

