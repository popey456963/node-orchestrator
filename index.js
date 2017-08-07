const Orchestrator = require('./modules/Orchestrator')

const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

if (process.env.NODE_ENV === 'production' && !process.env.KEY) throw new Error('Error, universal key not given.')
if (process.env.NODE_ENV !== 'production') console.log('NOT RUNNING IN PRODUCTION MODE, NO AUTHENTICATION REQUIRED')

app.use((req, res, next) => {
  if (process.env.NODE_ENV !== 'production') return next()
  if (req.query && req.query.key === process.env.KEY) return next()
  if (req.body && req.body.key === process.env.KEY) return next()
  return res.json({
    date: +new Date(),
    msg: 'Error, lacking authentication key.',
    data: {}
  })
})

app.get('/:node', Orchestrator.node, Orchestrator.list)
app.get('/:node/:server', Orchestrator.node, Orchestrator.info)
app.post('/:node', Orchestrator.node, Orchestrator.create)
app.delete('/:node/:server', Orchestrator.node, Orchestrator.remove)
app.post('/:node/:server', Orchestrator.node, Orchestrator.action)

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
