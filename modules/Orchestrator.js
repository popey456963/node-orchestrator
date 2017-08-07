const Nodes = require('../configs/Nodes')
const request = require('request-promise')

function error(error) {
  return {
    date: +new Date(),
    status: 400,
    msg: error.message,
    data: {}
  }
}

function node(req, res, next) {
  if (req.params.node in Nodes) return next()
  res.json(error({ message: 'Unknown Node' }))
}

async function list(req, res) {
  res.json(await request(`${Nodes[req.params.node]}`).then(JSON.parse).catch(error))
}

async function info(req, res) {
  res.json(await request(`${Nodes[req.params.node]}/server/${req.params.server}`).then(JSON.parse).catch(error))
}

 async function create(req, res) {
   res.json(await request({
     method: 'POST',
     uri: `${Nodes[req.params.node]}/server`,
     body: req.body,
     json: true
   }).then(JSON.parse).catch(error))
 }

 async function remove(req, res) {
   res.json(await request({
     method: 'DELETE',
     uri: `${Nodes[req.params.node]}/server/${req.params.server}`
   }).then(JSON.parse).catch(error))
 }

 async function action(req, res) {
   res.json(await request({
     method: 'POST',
     uri: `${Nodes[req.params.node]}/server/${req.params.server}`,
     body: req.body,
     json: true
   }).then(JSON.parse).catch(error))
 }

module.exports = { node, list, info, create, remove, action }
