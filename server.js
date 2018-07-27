const app = require('express')()
const config = require('./config')
const { graphql } = require('graphql')
const schema = require('./api/schema')
const graphqlHTTP = require('express-graphql')
const pg = require('pg')
const pgPool = new pg.Pool(config.pg)
const AWS = require('aws-sdk')
const cors = require('cors')
const bodyParser = require('body-parser')

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}...`)
})

app.use(cors())
app.use(bodyParser.json())

app.use('/graphql', (req, res) => {
  const loaders = require('./api/loaders')(pgPool)

  graphqlHTTP({
    schema: schema,
    graphiql: true,
    context: { pgPool, loaders }
  })(req,res)
})

app.post('/api/images', function (req, res) {
  console.log("what",req.body)
  AWS.config.loadFromPath('./aws-config.json')
  const s3 = new AWS.S3()
  const s3Params = {
    Bucket: 'dungeon-atlas',
    Key: 'fooby.jpg',
    ContentType: req.get('Content-type'),
    ContentLength: req.get('Content-length'),
    Body: req
  }
  s3.upload(
    s3Params,
    {patSize: 5 * 1024 * 1024, queueSize: 1},
    (err, response) => {
      console.log(err, response)
    }
  )
  
  res.status(200).send(`https://s3.us-east-2.amazonaws/${s3Params.Bucket}/${s3Params.Key}`)
})