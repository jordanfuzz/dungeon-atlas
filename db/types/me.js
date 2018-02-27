const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList
} = require('graphql')

const { MapType } = require('./map')
const pgdb = require('../db')

module.exports = new GraphQLObjectType({
  name: "MeType",

  fields: {
    id: { type: GraphQLID },
    email: { type: new GraphQLNonNull(GraphQLString) },
    maps: {
      type: new GraphQLList(MapType),
      resolve(obj, args, { pgPool }) {
        return pgdb(pgPool).getMaps(obj)
      }
    }
  }
})