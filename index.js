const Orchestrator = require('./modules/Orchestrator')
const Communicate = require('./modules/Communicator')
const GameServer = require('./modules/GameServer')
const Node = require('./modules/Node')

const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

if (process.env.NODE_ENV === 'production' && !process.env.KEY) throw new Error('Error, universal key not given.')

global.Nodes = {
  // <id>: <GameServer>
}

// id: String (<node>-<server_id>)
async function getServer(id) {
  if (id in Nodes) {
    return Nodes[id]
  }

  let node, server_id
  if (id.includes('-')) {
    [node, server_id] = id.split('-')
  } else {
    node = id
  }

  Nodes[id] = new GameServer(new Node(node), server_id)
  return Nodes[id]
  // return await Nodes[id].initialise()
}

function checkPermissions(req, res, next) {
  if (process.env.NODE_ENV !== 'production') return next()
  if (req.query && req.query.key === process.env.KEY) return next()
  if (req.body && req.body.key === process.env.KEY) return next()
  return res.json({
    date: +new Date(),
    msg: 'Error, lacking authentication key.',
    data: {}
  })
}

// Server: GameServer
async function infoServer(Server) {
  return Communicate(Server.Node, `info/${Server.id}`)
}

// node: Node
// details: Object
async function createServer(Server, details) {
  console.log('create')
  return Communicate.post(Server.Node, `create`, details)
}

// Server: GameServer
async function deleteServer(Server) {
  return Communicate.delete(Server.Node, `delete/${Server.id}`)
}

// Server: GameServer
async function actionServer(Server, action) {
  return Communicate.post(Server.Node, `action/${Server.id}`, action)
}

app.get('/', (req, res) => { res.send('This is the orchestrator!') })
app.use(checkPermissions)
app.get('/info/:server', async (req, res) => { res.json(await infoServer(await getServer(req.params.server))) })
app.post('/create/:server', async (req, res) => { res.json(await createServer(await getServer(req.params.server), req.body)) })
app.delete('/delete/:server', async (req, res) => { res.json(await deleteServer(await getServer(req.params.server))) })
app.post('/action/:server', async (req, res) => { res.json(await actionServer(await getServer(req.params.server), req.body)) })

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
