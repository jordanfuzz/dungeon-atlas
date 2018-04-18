const { 
  GraphQLInputObjectType, 
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
  GraphQLString} = require('graphql')

const EncounterType = require('../types/encounter')
const encounterRepository = require('../repositories/encounter-repository')

const EncounterInputType = new GraphQLInputObjectType({
  name: "EncounterInput",
  fields: {
    encounterSetId: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    encounterWeight: { type: GraphQLInt },
    details: { type: GraphQLString }
  }
})

module.exports = {
  type: EncounterType,
  args: { input: {
    type: new GraphQLNonNull(EncounterInputType)
  } },
  resolve(obj, { input }, { pgPool }) {
    return encounterRepository(pgPool).addNewEncounter(input)
  }
}