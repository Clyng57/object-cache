
import { SafeWeakMap, SafeMap } from '@neumatter/safe-collections'

const OBJECT_CACHE_MAP = new SafeWeakMap()
const SYMBOL_IS_OBJECT_CACHE = Symbol.for('neumatter.ObjectCache.isObjectCache')
const PROCESS_ID = Math.floor(Math.random() * 0xFFFFFFFF).toString(16)

export default class ObjectCache extends SafeMap {
  /**
   *
   * @param {object} root
   * @param {{ maxSize?: number } | undefined} options
   * @returns {ObjectCache}
   */
  static from (root, options = {}) {
    let cache = OBJECT_CACHE_MAP.get(root)

    if (cache === undefined) {
      cache = new ObjectCache(root, options)
      OBJECT_CACHE_MAP.set(root, cache)
    }

    return cache
  }

  #root
  #maxSize = 100

  constructor (root, options) {
    super()
    this.#root = root

    if (options.maxSize !== undefined) {
      this.#maxSize = options.maxSize
    }
  }

  get [SYMBOL_IS_OBJECT_CACHE] () {
    return true
  }

  get maxSize () {
    return this.#maxSize
  }

  get processId () {
    return PROCESS_ID
  }

  get (key) {
    const value = super.get(key)

    if (value !== undefined) {
      super.delete(key)
      super.set(key, value)
    }

    return value
  }

  peek (key) {
    return super.get(key)
  }

  use (key, initialValue) {
    let value = super.get(key)

    if (value !== undefined) {
      super.delete(key)
      super.set(key, value)
    } else {
      value = initialValue
      super.set(key, value)
    }

    return value
  }

  set (key, value) {
    if (this.size === this.#maxSize && !this.has(key)) {
      const keyIterator = this.keys()
      const firstResult = keyIterator.next()

      if (firstResult.value !== undefined) {
        super.delete(firstResult.value)
      }
    }

    super.set(key, value)
    return this
  }

  destroy () {
    this.clear()
    return OBJECT_CACHE_MAP.delete(this.#root)
  }
}
