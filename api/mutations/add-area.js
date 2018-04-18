const { 
  GraphQLInputObjectType, 
  GraphQLNonNull,
  GraphQLID,
  GraphQLString } = require('graphql')

const AreaType = require('../types/area')
const areaRepository = require('../repositories/area-repository')

const AreaInputType = new GraphQLInputObjectType({
  name: "AreaInput",
  fields: {
    mapId: { type: new GraphQLNonNull(GraphQLID) },
    subMap: { type: new GraphQLNonNull(GraphQLID) },    
    area: { type: new GraphQLNonNull(GraphQLString) },
  }
})

module.exports = {
  type: AreaType,
  args: { input: {
    type: new GraphQLNonNull(AreaInputType)
  } },
  resolve(obj, { input }, { pgPool }) {
    return areaRepository(pgPool).addNewArea(input)
  }
}