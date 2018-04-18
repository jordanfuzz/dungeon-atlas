const { 
  GraphQLObjectType, 
  GraphQLID, 
  GraphQLString, 
  GraphQLNonNull,
  GraphQLList
} = require('graphql')

const pgdb = require('../db')
const EncounterType = require('./encounter')

module.exports = new GraphQLObjectType({
  name: 'EncounterSetType',
  fields: () => ({
    encounterSetId: { type: new GraphQLNonNull(GraphQLID) },
    userId: { type: new GraphQLNonNull(GraphQLID) }, 
    title: { type: new GraphQLNonNull(GraphQLString) },
    encounters: {
      type: new GraphQLList(EncounterType),
      resolve(encounterSet, args, { loaders }) {
        return loaders.getEncounters.load(encounterSet.encounterSetId)
      }
    }
  })
})