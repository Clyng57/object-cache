
# ObjectCache
![plot](https://img.shields.io/npm/v/%40neumatter%2Fobject-cache?style=for-the-badge&labelColor=black)
![plot](https://img.shields.io/npm/dt/%40neumatter%2Fobject-cache?style=for-the-badge&labelColor=black)
[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

Module for creating ObjectCaches that can be garbage collected.
The ObjectCache will delete the least-recently-used entry to make room for new entries.

<br />

## Table of Contents
- [ Installation ](#install)
- [ Usage ](#usage)

<br />

<a name="install"></a>
## Install

```console
npm i @neumatter/object-cache
```

<br />

<a name="usage"></a>
## Usage

```js
import ObjectCache from '@neumatter/object-cache'

class CustomObject {
  constructor () {}

  get () {
    const objectCache = ObjectCache.from(this, { maxSize })
    let value = objectCache.get('key')

    if (value === undefined) {
      value = someExpensiveOp()
      objectCache.set('key', value)
    }

    return value
  }
}
```
