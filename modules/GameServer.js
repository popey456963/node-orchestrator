/*
 * GameServer() { Node, id }
 */

class GameServer {
  constructor(Node, server_id) {
    this.Node = Node
    this.id = server_id
  }
}

GameServer.prototype.initialise = async function() {
  let details = await Communicate(this.Node, `/info/${this.id}`)
  this.info = details.data
}

module.exports = GameServer
