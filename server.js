const app = require('express')()
const config = require('./config')
const { graphql } = require('graphql')
const testSchema = require('./db/schema')
const graphqlHTTP = require('express-graphql')
const pg = require('pg')
const pgPool = new pg.Pool(config.pg)
const AWS = require('aws-sdk')

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}...`)
})

app.use('/graphql', graphqlHTTP({
  schema: testSchema,
  graphiql: true,
  context: { pgPool }
}))

app.post('/api/images', function (req, res) {
  AWS.config.loadFromPath('./aws-config.json')
  const s3 = new AWS.S3()
  const s3Params = {
    Bucket: 'dungeon-atlas',
    Key: 'myimage.jpg',
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

  //send back s3 url
  res.status(200).send()
})