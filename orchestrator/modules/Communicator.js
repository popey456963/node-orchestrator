const request = require('request-promise')

function error(error) {
  return {
    date: +new Date(),
    status: 400,
    msg: error.message,
    data: {}
  }
}

async function Communicate(Node, path) {
  return request(`${Node.url}/${path}`).then((response) => {
    return JSON.parse(response)
  }).catch(error)
}

Communicate.post = async function(Node, path, data) {
  return request({
    method: 'POST',
    uri: `${Node.url}/${path}`,
    body: data,
    json: true
  }).then((response) => {
    return JSON.parse(response)
  }).catch(error)
}

Communicate.delete = async function(Node, path) {
  return request({
    method: 'DELETE',
    uri: `${Node.url}/${path}`
  }).then((response) => {
    return JSON.parse(response)
  }).catch(error)
}

module.exports = Communicate
