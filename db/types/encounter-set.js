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

module.exports = new GraphQLObjectType({
  name: 'EncounterSetType',
  fields: () => ({
    encounterSetId: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    encounters: {
      type: new GraphQLList(EncounterType),
      resolve(obj, args, { pgPool }) {
        return pgdb(pgPool).getEncounters(obj)
      }
    }
  })
})