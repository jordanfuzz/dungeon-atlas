  const { 
    GraphQLSchema, 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLNonNull ,
    GraphQLInt
  } = require('graphql')
  const pgdb = require('../pgdb')
  const MeType = require('../types/me')

  const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      me: {
        type: MeType,
        description: 'The current user',
        args: {
          id: { type: new GraphQLNonNull(GraphQLInt)}
        },
        resolve: (object, args, { pgPool }) => {
          return pgdb(pgPool).getUser(args.id)
        }
      }
    }
  })

  const testSchema = new GraphQLSchema({
    query: RootQueryType
  })

  module.exports = testSchema 