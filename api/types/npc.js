const { 
  GraphQLObjectType, 
  GraphQLID, 
  GraphQLString, 
  GraphQLNonNull,
  GraphQLInt
} = require('graphql')


module.exports = new GraphQLObjectType({
  name: "Npc",
  fields: {
    npcId: { type: new GraphQLNonNull(GraphQLID) },
    userId: { type: new GraphQLNonNull(GraphQLID) },
    npcName: { type: new GraphQLNonNull(GraphQLString)},
    npcStatBlock: { type: GraphQLString },
    npcDescription: { type: new GraphQLNonNull(GraphQLString) },
    npcRace: { type: GraphQLString },
    npcInventory: {type: GraphQLString }
  }
})