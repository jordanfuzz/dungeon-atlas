const app = require('express')()
const config = require('../config')
const { graphql } = require('graphql')
const testSchema = require('../db/schema')
const graphqlHTTP = require('express-graphql')
const pg = require('pg')
const pgPool = new pg.Pool(config.pg)

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}...`)
})

app.use('/graphql', graphqlHTTP({
  schema: testSchema,
  graphiql: true,
  context: { pgPool }
}))