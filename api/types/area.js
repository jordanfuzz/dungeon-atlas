const { 
  GraphQLObjectType, 
  GraphQLNonNull,
  GraphQLID,
  GraphQLString, } = require('graphql')

module.exports = new GraphQLObjectType({
  name: 'InputArea',
  fields: () =>  ({
    areaId: { type: new GraphQLNonNull(GraphQLID) },
    mapId: { type: new GraphQLNonNull(GraphQLID) },
    subMap: { type: new GraphQLNonNull(GraphQLID) },
    area: { type: new GraphQLNonNull(GraphQLString) }    
  })
})