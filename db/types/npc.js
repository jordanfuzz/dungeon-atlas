const { 
  GraphQLObjectType, 
  GraphQLID, 
  GraphQLString, 
  GraphQLNonNull,
  GraphQLInt
} = require('graphql')

const pgdb = require('../db')

module.exports = new GraphQLObjectType({
  name: "NpcType",
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