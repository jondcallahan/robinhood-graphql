import { GraphQLObjectType, GraphQLString } from 'graphql'
const debug = require('debug')('App:QueryType')

import constants from '../constants'
const BASE_URL = constants.BASE_URL

const fetchInstrument = async (root, args) => {
  debug('fetching data')
  debug('args', args)
  let url
  if (args.id) {
    url = `${BASE_URL}/instruments/${args.id}`
  } else if (args.symbol) {
    url = `${BASE_URL}/instruments/?symbol=${args.symbol}`
  }
  const response = await fetch(url)
  const data = await response.json()
  const result = args.symbol ? data.results[0] : data
  debug('result', result)
  return result
}

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: '...',
  fields: () => ({
    instrument: {
      type: InstrumentType,
      args: {
        id: { type: GraphQLString },
        symbol: { type: GraphQLString },
      },
      resolve: (root, args) => fetchInstrument(root, args),
    },
    // TODO: Implement Movers
    // movers: {
    //   type: MoversType,
    //   fields: () => ({
    //     up: {
    //       type: MoversUpType,
    //       resolve: () => fetchMovers('up')
    //     },
    //     down: {
    //       type: MoversDownType,
    //       resolve: () => fetchMovers('down')
    //     }
    //   })
    // }
  }),
})
