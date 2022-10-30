const express = require('express');
const serverless = require('serverless-http');

const app = express()
const router = express.Router()

router.get('/', (req, res) => {
  res.json({
    'hello': 'world'
  })
})

router.get('/json', (req, res) => {
  res.json({
    'path': 'json'
  })
})

app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);
