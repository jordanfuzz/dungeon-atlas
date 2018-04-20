const { 
  GraphQLObjectType, 
  GraphQLID, 
  GraphQLString, 
  GraphQLNonNull,
  GraphQLList
} = require('graphql')

const EncounterType = require('./encounter')

module.exports = new GraphQLObjectType({
  name: 'EncounterSet',
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