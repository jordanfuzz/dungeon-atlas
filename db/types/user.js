const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList
} = require('graphql')

const { MapType } = require('./map')
const EncounterSetType = require('./encounter-set')
const pgdb = require('../db')

module.exports = new GraphQLObjectType({
  name: "UserType",
  fields: {
    userId: { type: GraphQLID },
    email: { type: new GraphQLNonNull(GraphQLString) },
    maps: {
      type: new GraphQLList(MapType),
      resolve(user, args, { pgPool }) {
        return pgdb(pgPool).getMaps(user)
      }
    },
    encounterSets: {
      type: new GraphQLList(EncounterSetType),
      resolve(user, args, { pgPool }) {
        return pgdb(pgPool).getEncounterSets(user)
      }
    }
  }
})