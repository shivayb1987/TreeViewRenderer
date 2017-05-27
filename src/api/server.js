/**
 * Mocking client-server processing
 */
import _tree from './tree.json'

const TIMEOUT = 100

export default {
  getTree: (cb, timeout) => setTimeout(() => cb(_tree), timeout || TIMEOUT)
}
