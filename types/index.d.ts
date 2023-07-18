
import { SafeMap } from '@neumatter/safe-collections'

export default class ObjectCache<K, V> extends SafeMap<K, V> {
  static from<K, V> (root: object, options?: { maxSize?: number }): ObjectCache<K, V>

  #root: object
  #maxSize: number

  constructor (root: object, options: { maxSize?: number })
  get maxSize (): number
  get processId (): string
  get (key: K): V | undefined
  peek (key: K): V | undefined
  use (key: K, initialValue: V): V
  set (key: K, value: V): this
  destroy (): boolean
}
