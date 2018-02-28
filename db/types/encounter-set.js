const { 
  GraphQLObjectType, 
  GraphQLID, 
  GraphQLString, 
  GraphQLNonNull,
  GraphQLBoolean ,
  GraphQLList
} = require('graphql')

const pgdb = require('../db')
const EncounterType = require('./encounter')

const EncounterSetType = new GraphQLObjectType({
  name: 'EncounterSetType',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    mapId: { type: GraphQLID },
    encounters: {
      type: new GraphQLList(EncounterType),
      resolve(obj, args, { pgPool }) {
        return pgdb(pgPool).getEncounters(obj)
      }
    }
  })


})

module.exports = {
  EncounterSetType
}