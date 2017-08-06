# server-orchestrator

```javascript
app.get('/', (req, res) => { res.send('This is the orchestrator!') })
app.use(checkPermissions)
app.get('/info/:server', async (req, res) => { res.json(await infoServer(await getServer(req.params.server))) })
app.post('/create/:server', async (req, res) => { res.json(await createServer(await getServer(req.params.server), req.body)) })
app.delete('/delete/:server', async (req, res) => { res.json(await deleteServer(await getServer(req.params.server))) })
app.post('/action/:server', async (req, res) => { res.json(await actionServer(await getServer(req.params.server), req.body)) })
```
