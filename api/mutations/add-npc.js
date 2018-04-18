const { 
  GraphQLInputObjectType, 
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
  GraphQLString} = require('graphql')

const NpcType = require('../types/npc')
const npcRepository = require('../repositories/npc-repository')

const NpcInputType = new GraphQLInputObjectType({
  name: "NpcInput",
  fields: {
    userId: { type: new GraphQLNonNull(GraphQLID) },
    npcName: { type: new GraphQLNonNull(GraphQLString)},
    npcStatBlock: { type: GraphQLString },
    npcDescription: { type: new GraphQLNonNull(GraphQLString) },
    npcRace: { type: GraphQLString },
    npcInventory: {type: GraphQLString }
  }
})

module.exports = {
  type: NpcType,
  args: { input: {
    type: new GraphQLNonNull(NpcInputType)
  } },
  resolve(obj, { input }, { pgPool }) {
    return npcRepository(pgPool).addNewNpc(input)
  }
}