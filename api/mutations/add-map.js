const { 
  GraphQLInputObjectType, 
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean } = require('graphql')

const { MapType } = require('../types/map')
const mapRepository = require('../repositories/map-repository')

const MapInputType = new GraphQLInputObjectType({
  name: "MapInput",
  fields: {
    userId: { type: new GraphQLNonNull(GraphQLInt) },
    mapName: { type: new GraphQLNonNull(GraphQLString) },
    imageUrl: { type: new GraphQLNonNull(GraphQLString) },
    isMaster:  { type: new GraphQLNonNull(GraphQLBoolean) }
  }
})

module.exports = {
  type: MapType,
  args: { input: {
    type: new GraphQLNonNull(MapInputType)
  } },
  resolve(obj, { input }, { pgPool }) {
    return mapRepository(pgPool).addNewMap(input)
  }
}