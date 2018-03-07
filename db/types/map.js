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

const MapType = new GraphQLObjectType({
  name: 'MapType',
  fields: () => ({
    mapId: { type: new GraphQLNonNull(GraphQLID) },
    mapName: { type: new GraphQLNonNull(GraphQLString) },
    imageUrl: { type: new GraphQLNonNull(GraphQLString) },
    isMaster: { type: new GraphQLNonNull(GraphQLBoolean) },
    areas: {
      type: new GraphQLList(AreaType),
      resolve(map, args, { pgPool }) {
        return pgdb(pgPool).getAreas(map)
      }},
    encounterSets: {
      type: new GraphQLList(EncounterSetType),
      resolve(map, args, { pgPool }) {
        return pgdb(pgPool).getEncounterSetsByMap(map)
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
      resolve(area, args, { pgPool }) {
        return pgdb(pgPool).getMapForArea(area)
      }
    },
  })
})

module.exports = {
  MapType,
  AreaType
}