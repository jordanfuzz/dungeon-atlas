const { 
  GraphQLObjectType, 
  GraphQLID, 
  GraphQLString, 
  GraphQLNonNull,
  GraphQLInt
} = require('graphql')


module.exports = new GraphQLObjectType({
  name: "Encounter",
  fields: {
    encounterId: { type: new GraphQLNonNull(GraphQLID) },
    encounterSetId: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString)},
    encounterWeight: { type: GraphQLInt },
    details: { type: GraphQLString }
  }
 
})