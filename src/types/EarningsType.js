import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
} from 'graphql';
const debug = require('debug')('App:EarningsType');
import fetchDataFromUrl from '../utils/fetchDataFromUrl';
import constants from '../constants';

const BASE_URL = constants.BASE_URL;

export const fetchEarnings = async symbol => {
  debug('Fetching earnings');
  const url = `${BASE_URL}/marketdata/earnings/?symbol=${symbol}`;
  const data = await fetchDataFromUrl(url);
  return data.results;
};

const EarningsType = new GraphQLObjectType({
  name: 'InstrumentEarnings',
  description: 'EPS estimates, historical data, and future announcement dates',
  fields: () => ({
    symbol: { type: GraphQLString },
    year: { type: GraphQLInt },
    quarter: { type: GraphQLInt },
    eps: {
      type: new GraphQLObjectType({
        name: 'EPS',
        description: 'The estimated and actual eps if reported',
        fields: () => ({
          estimate: { type: GraphQLString },
          actual: { type: GraphQLString },
        }),
      }),
    },
    report: {
      type: new GraphQLObjectType({
        name: 'report',
        description: 'The time of the announcement',
        fields: () => ({
          date: { type: GraphQLString },
          timing: { type: GraphQLString },
          verified: { type: GraphQLBoolean },
        }),
      }),
    },
    call: {
      type: new GraphQLObjectType({
        name: 'call',
        description: 'Links to the conference call and video',
        fields: () => ({
          datetime: { type: GraphQLString },
          broadcast_url: { type: GraphQLString },
          replay_url: { type: GraphQLBoolean },
        }),
      }),
    },
  }),
});

export default EarningsType;
