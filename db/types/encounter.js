const { 
  GraphQLObjectType, 
  GraphQLID, 
  GraphQLString, 
  GraphQLNonNull,
  GraphQLInt
} = require('graphql')

const pgdb = require('../db')

module.exports = new GraphQLObjectType({
  name: "EncounterType",
  fields: {
    encounterId: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString)},
    encounterWeight: { type: GraphQLInt },
    details: { type: GraphQLString }
  }
 
})