// TODO: Convert snake case keys to camelCase
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
} from 'graphql'
const debug = require('debug')('App:InstrumentType')
import fetchDataFromUrl from '../utils/fetchDataFromUrl'

import MarketType from './MarketType'
import FundamentalsType from './FundamentalsType'
import QuoteType from './Quotetype'
import RhNewsType, { fetchRhNews } from './RhNewsType'
import HistoricalsType, { fetchHistoricals } from './HistoricalType'
import EarningsType, { fetchEarnings } from './EarningsType'
import GoogleNewsStoryType, { fetchGoogleNews } from './GoogleNewsStoryType' // eslint-disable-line

import constants from '../constants'
const BASE_URL = constants.BASE_URL

export const fetchInstrument = async (root, args) => {
  debug('Fetching Instrument')
  let url
  if (args.id) {
    url = `${BASE_URL}/instruments/${args.id}`
  } else if (args.symbol) {
    url = `${BASE_URL}/instruments/?symbol=${args.symbol}`
  }

  const data = await fetchDataFromUrl(url)
  const result = args.symbol ? data.results[0] : data
  return result
}

const InstrumentType = new GraphQLObjectType({
  name: 'Instrument',
  description: 'a financial instrument',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    min_tick_size: { type: GraphQLString },
    splits: { type: GraphQLString },
    margin_initial_ratio: { type: GraphQLString },
    url: { type: GraphQLString },
    symbol: { type: GraphQLString },
    bloomberg_unique: { type: GraphQLString },
    list_date: { type: GraphQLString },
    state: { type: GraphQLString },
    day_trade_ratio: { type: GraphQLString },
    tradeable: { type: GraphQLBoolean },
    maintenance_ratio: { type: GraphQLString },
    market: {
      type: MarketType,
      resolve: (instrument) => {
        return fetchDataFromUrl(instrument.market)
      },
    },
    quote: {
      type: QuoteType,
      resolve: (instrument) => fetchDataFromUrl(instrument.quote),
    },
    fundamentals: {
      type: FundamentalsType,
      resolve: (instrument) => fetchDataFromUrl(instrument.fundamentals),
    },
    historicals: {
      type: HistoricalsType,
      args: {
        interval: { type: GraphQLString },
        span: { type: GraphQLString },
      },
      resolve: (instrument, args) => fetchHistoricals(instrument, args),
    },
    earnings: {
      type: new GraphQLList(EarningsType),
      resolve: (instrument) => fetchEarnings(instrument.symbol),
    },
    rh_news: {
      type: new GraphQLList(RhNewsType),
      resolve: (instrument) => fetchRhNews(instrument.symbol),
    },
    google_news: {
      type: new GraphQLList(GoogleNewsStoryType),
      resolve: (instrument) => fetchGoogleNews(instrument.symbol),
    },
  }),
})

export default InstrumentType
