// TODO: Convert snake case keys to camelCase
/* eslint-disable camelcase */

import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
} from 'graphql'
import fetch from 'node-fetch'
import 'babel-polyfill'
const debug = require('debug')('App:schema')

import constants from './constants'
const BASE_URL = constants.BASE_URL

// Fundamentals
const fetchFundamentals = async (id) => {
  debug('fetching fundamentals')
  const response = await fetch(`${BASE_URL}/fundamentals/${id}/`)
  const data = await response.json()
  return data
}
const FundamentalsType = new GraphQLObjectType({
  name: 'InstrumentFundamentals',
  description: 'fundamentals for instrument',
  fields: () => ({
    open: { type: GraphQLString },
    high: { type: GraphQLString },
    low: { type: GraphQLString },
    volume: { type: GraphQLString },
    average_volume: { type: GraphQLString },
    high_52_weeks: { type: GraphQLString },
    dividend_yield: { type: GraphQLString },
    low_52_weeks: { type: GraphQLString },
    market_cap: { type: GraphQLString },
    pe_ratio: { type: GraphQLString },
    description: { type: GraphQLString },
    instrument: { type: InstrumentType },
  }),
})
// Quote
const fetchQuote = async (id) => {
  debug('fetching quote')
  const response = await fetch(`${BASE_URL}/quotes/${id}/`)
  const data = await response.json()
  return data
}
const QuoteType = new GraphQLObjectType({
  name: 'InstrumentQuote',
  description: 'today\'s quote',
  fields: () => ({
    ask_price: { type: GraphQLString },
    ask_size: { type: GraphQLInt },
    bid_price: { type: GraphQLString },
    bid_size: { type: GraphQLInt },
    last_trade_price: { type: GraphQLString },
    last_extended_hours_trade_price: { type: GraphQLString },
    previous_close: { type: GraphQLString },
    adjusted_previous_close: { type: GraphQLString },
    previous_close_date: { type: GraphQLString },
    symbol: { type: GraphQLString },
    trading_halted: { type: GraphQLBoolean },
    last_trade_price_source: { type: GraphQLString },
    updated_at: { type: GraphQLString },
    instrument: { type: InstrumentType },
  }),
})
// Historicals
const fetchHistoricals = async (instrument, { interval, span }) => {
  let url = `${BASE_URL}/quotes/historicals/?instruments=/instruments/${instrument.id}/&interval=${interval}` // eslint-disable-line
  url = span ? `${url}&span=${span}` : url
  const response = await fetch(url)
  const data = await response.json()
  debug('fetching historicals', response.ok)
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
// Instrument
const fetchInstrument = async (root, args) => {
  debug('fetching data')
  debug('args', args)
  debug('root', root)

  let url
  if (args.id) {
    url = `${BASE_URL}/instruments/${args.id}`
  } else if (args.symbol) {
    url = `${BASE_URL}/instruments/?symbol=${args.symbol}`
  }
  const response = await fetch(url)
  const data = await response.json()
  const result = args.symbol ? data.results[0] : data
  return result
}
const InstrumentType = new GraphQLObjectType({
  name: 'Instrument',
  description: 'a financial instrument',
  fields: () => ({
    id: { type: GraphQLString },
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
    market: { type: GraphQLString },
    name: { type: GraphQLString },
    quote: {
      type: QuoteType,
      resolve: (instrument) => fetchQuote(instrument.id),
    },
    fundamentals: {
      type: FundamentalsType,
      resolve: (instrument) => fetchFundamentals(instrument.id),
    },
    historicals: {
      type: HistoricalsType,
      args: {
        interval: { type: GraphQLString },
        span: { type: GraphQLString },
      },
      resolve: (instrument, args) => fetchHistoricals(instrument, args),
    },
  }),
})

// Recent Movers
const fetchMovers = async (root, args) => {
  let url = `${BASE_URL}/midlands/movers/sp500/?direction=${args.direction}`
  args.limit ? url += `&limit=${args.limit}` : null
  const response = await fetch(url)
  const data = await response.json()
  const result = data.results
  return result
}
const MoverType = new GraphQLObjectType({
  name: 'mover',
  description: 'a recent big mover',
  fields: () => ({
    'instrument': {
      type: InstrumentType,
      resolve: (mover) => fetchInstrument(null, { symbol: mover.symbol }),
    },
    'symbol': { type: GraphQLString },
    'updated_at': { type: GraphQLString },
    'price_movement': {
      type: new GraphQLObjectType({
        name: 'price_movement',
        fields: () => ({
          'market_hours_last_movement_pct': { type: GraphQLString },
          'market_hours_last_price': { type: GraphQLString },
        }),
      }),
    },
    'description': { type: GraphQLString },
  }),
})

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
    movers: {
      type: new GraphQLList(MoverType),
      args: {
        direction: { type: GraphQLString },
        limit: { type: GraphQLInt },
      },
      resolve: (root, args) => fetchMovers(root, args),
    },
  }),
})

export default new GraphQLSchema({
  query: QueryType,
})
