const ServerList = require('../configs/Servers.js')

/*
 * Node() { id, url }
 */

class Node {
  constructor(node) {
    this.id = node
    if (node in ServerList) {
      this.url = ServerList[node]
    } else {
      throw new Error(`Invalid node ${node}`)
    }
  }
}

module.exports = Node
