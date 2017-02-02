import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean,
} from 'graphql'
import fetchDataFromUrl from '../utils/fetchDataFromUrl'
import constants from '../constants'
const debug = require('debug')('App:HistoricalsType')

const BASE_URL = constants.BASE_URL

export const fetchHistoricals = async (instrument, { interval, span }) => {
  debug('fetching historicals')
  let url = `${BASE_URL}/quotes/historicals/?instruments=/instruments/${instrument.id}/&interval=${interval}&bounds=trading` // eslint-disable-line
  url = span ? `${url}&span=${span}` : url
  const data = await fetchDataFromUrl(url)
  return data.results[0]
}

const HistoricalsType = new GraphQLObjectType({
  name: 'Historicals',
  description: 'Historical pricing info with OHLC',
  fields: () => ({
    symbol: { type: GraphQLString },
    interval: { type: GraphQLString },
    span: { type: GraphQLString },
    bounds: { type: GraphQLString },
    previous_close_price: { type: GraphQLString },
    open_price: { type: GraphQLString },
    open_time: { type: GraphQLString },
    historicals: { type: new GraphQLList(
      new GraphQLObjectType({
        name: 'HistoricalSnapshot',
        description: 'An OHLC+Volume object',
        fields: () => ({
          begins_at: { type: GraphQLString },
          open_price: { type: GraphQLString },
          close_price: { type: GraphQLString },
          high_price: { type: GraphQLString },
          low_price: { type: GraphQLString },
          volume: { type: GraphQLInt },
          session: { type: GraphQLString },
          interpolated: { type: GraphQLBoolean },
        }),
      }),
    ),
    },
  }),
})

export default HistoricalsType
