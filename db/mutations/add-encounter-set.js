const { 
  GraphQLInputObjectType, 
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean } = require('graphql')

const EncounterSetType = require('../types/encounter-set')
const db = require('../db')

const EncounterSetInputType = new GraphQLInputObjectType({
  name: "EncounterSetInput",
  fields: {
    userId: { type: new GraphQLNonNull(GraphQLInt) },
    title: { type: new GraphQLNonNull(GraphQLString) },
  }
})

module.exports = {
  type: EncounterSetType,
  args: { input: {
    type: new GraphQLNonNull(EncounterSetInputType)
  } },
  resolve(obj, { input }, { pgPool }) {
    return db(pgPool).addNewEncounterSet(input)
  }
}