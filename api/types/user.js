const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList
} = require('graphql')

const { MapType } = require('./map')
const EncounterSetType = require('./encounter-set')
const NpcType = require('./npc')

module.exports = new GraphQLObjectType({
  name: "UserType",
  fields: {
    userId: { type: GraphQLID },
    email: { type: new GraphQLNonNull(GraphQLString) },
    maps: {
      type: new GraphQLList(MapType),
      resolve(user, args, { loaders }) {
        return loaders.getMapsForUser.load(user.userId)
      }
    },
    encounterSets: {
      type: new GraphQLList(EncounterSetType),
      resolve(user, args, { loaders }) {
        return loaders.getEncounterSetsForUser.load(user.userId)
      }
    },
    npcs: {
      type: new GraphQLList(NpcType),
      resolve(user, args, { loaders }) {
        return loaders.getNpcsForUser.load(user.userId)
      }
    }
  }
})