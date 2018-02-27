const { 
  GraphQLObjectType, 
  GraphQLID, 
  GraphQLString, 
  GraphQLNonNull,
  GraphQLBoolean ,
  GraphQLList
} = require('graphql')

const pgdb = require('../db')

const MapType = new GraphQLObjectType({
  name: 'MapType',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    mapName: { type: new GraphQLNonNull(GraphQLString) },
    imageUrl: { type: new GraphQLNonNull(GraphQLString) },
    isMaster: { type: new GraphQLNonNull(GraphQLBoolean) },
    areas: {
      type: new GraphQLList(AreaType),
      resolve(obj, args, { pgPool }) {
        return pgdb(pgPool).getAreas(obj)
      }}
  })
})

const AreaType = new GraphQLObjectType({
  name: 'AreaType',
  fields: () =>  ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    area: { type: new GraphQLNonNull(GraphQLString) },
    subMap: { 
      type: MapType,
      resolve(obj, args, { pgPool }) {
        return pgdb(pgPool).getMapForArea(args.mapId)
      }
    },
  })
})

module.exports = {
  MapType,
  AreaType
}