const NodeList = require('../configs/Nodes.js')

/*
 * Node() { id, url }
 */

class Node {
  constructor(node) {
    this.id = node
    if (node in NodeList) {
      this.url = NodeList[node]
    } else {
      throw new Error(`Invalid node ${node}`)
    }
  }
}

module.exports = Node
