  const { 
    GraphQLSchema, 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLNonNull ,
    GraphQLInt
  } = require('graphql')
  const pgdb = require('./db')
  const UserType = require('./types/user')

  const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      user: {
        type: UserType,
        description: 'The current user',
        args: {
          id: { type: new GraphQLNonNull(GraphQLInt)}
        },
        resolve: (root, args, { pgPool }) => {
          return pgdb(pgPool).getUser(args.id)
        }
      }
    }
  })

  const testSchema = new GraphQLSchema({
    query: RootQueryType
  })

  module.exports = testSchema 