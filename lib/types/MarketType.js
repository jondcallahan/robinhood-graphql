/* eslint-disable camelcase */
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql'
import 'babel-polyfill'
import fetchDataFromUrl from '../utils/fetchDataFromUrl'

const MarketHoursType = new GraphQLObjectType({
  name: 'MarketHoursType',
  description: 'Opening and closing hours',
  fields: () => ({
    closes_at: { type: GraphQLString },
    extended_opens_at: { type: GraphQLString },
    is_open: { type: GraphQLBoolean },
    extended_closes_at: { type: GraphQLString },
    date: { type: GraphQLString },
    opens_at: { type: GraphQLString },
    next_open_hours: {
      type: MarketHoursType,
      resolve: (hours) => fetchDataFromUrl(hours.next_open_hours),
    },
    previous_open_hours: {
      type: MarketHoursType,
      resolve: (hours) => fetchDataFromUrl(hours.previous_open_hours),
    },
  }),
})
const MartketType = new GraphQLObjectType({
  name: 'MartketType',
  description: 'An exchange market',
  fields: () => ({
    website: { type: GraphQLString },
    city: { type: GraphQLString },
    name: { type: GraphQLString },
    country: { type: GraphQLString },
    operating_mic: { type: GraphQLString },
    acronym: { type: GraphQLString },
    timezone: { type: GraphQLString },
    mic: { type: GraphQLString },
    todays_hours: {
      type: MarketHoursType,
      resolve: (market) => fetchDataFromUrl(market.todays_hours),
    },
  }),
})
export default MartketType
