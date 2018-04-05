  const { 
    GraphQLSchema, 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLNonNull ,
    GraphQLInt
  } = require('graphql')
  const pgdb = require('./db')
  const UserType = require('./types/user')
  const AddMapMutation = require('./mutations/add-map')
  const AddAreaMutation = require('./mutations/add-area')
  const AddEncounterSetMutation = require('./mutations/add-encounter-set')

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

  const RootMutationType = new GraphQLObjectType({
    name: 'RootMutationType',
    fields: () => ({
      AddMap: AddMapMutation,
      AddArea: AddAreaMutation,
      AddEncounterSet: AddEncounterSetMutation
    })
  })

  const testSchema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
  })

  module.exports = testSchema 