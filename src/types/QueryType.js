import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} from 'graphql'
import 'babel-polyfill'

import InstrumentType, { fetchInstrument } from './InstrumentType'
import MoverType, { fetchMovers } from './MoverType'
import UserType, { fetchUser } from './UserType'

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query',
  fields: () => ({
    instrument: {
      type: InstrumentType,
      args: {
        id: { type: GraphQLString },
        symbol: { type: GraphQLString },
      },
      resolve: (root, args) => fetchInstrument(root, args),
    },
    movers: {
      type: new GraphQLList(MoverType),
      args: {
        direction: { type: GraphQLString },
        limit: { type: GraphQLInt },
      },
      resolve: (root, args) => fetchMovers(args),
    },
    user: {
      type: UserType,
      resolve: (root, args, context) => fetchUser(context.headers.token),
    },
  }),
})

export default QueryType
