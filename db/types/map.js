const { 
  GraphQLObjectType, 
  GraphQLID, 
  GraphQLString, 
  GraphQLNonNull,
  GraphQLBoolean ,
  GraphQLList
} = require('graphql')

const pgdb = require('../db')
const EncounterSetType = require('./encounter-set')
const NpcType = require('./npc')

const MapType = new GraphQLObjectType({
  name: 'MapType',
  fields: () => ({
    mapId: { type: new GraphQLNonNull(GraphQLID) },
    mapName: { type: new GraphQLNonNull(GraphQLString) },
    imageUrl: { type: new GraphQLNonNull(GraphQLString) },
    isMaster: { type: new GraphQLNonNull(GraphQLBoolean) },
    areas: {
      type: new GraphQLList(AreaType),
      resolve(map, args, { loaders }) {
        return loaders.getAreas.load(map.mapId)
      }},
    encounterSets: {
      type: new GraphQLList(EncounterSetType),
      resolve(map, args, { loaders }) {
        return loaders.getEncounterSetsForMap.load(map.mapId)
      }
    },
    npcs: {
      type: new GraphQLList(NpcType),
      resolve(map, args, { loaders }) {
        return loaders.getNpcsForMap.load(map.mapId)
      }
    }
  })
})

const AreaType = new GraphQLObjectType({
  name: 'AreaType',
  fields: () =>  ({
    areaId: { type: new GraphQLNonNull(GraphQLID) },
    area: { type: new GraphQLNonNull(GraphQLString) },
    subMap: { 
      type: MapType,
      resolve(area, args, { loaders }) {
        return loaders.getMapForArea.load(area.subMap)
      }
    },
  })
})

module.exports = {
  MapType,
  AreaType
}
