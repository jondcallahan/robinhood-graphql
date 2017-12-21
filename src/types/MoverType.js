import { GraphQLObjectType, GraphQLString } from 'graphql';
import fetchDataFromUrl from '../utils/fetchDataFromUrl';
import InstrumentType, { fetchInstrument } from './InstrumentType';

import constants from '../constants';
const BASE_URL = constants.BASE_URL;

const fetchMovers = async ({ direction, limit }) => {
  let url = `${BASE_URL}/midlands/movers/sp500/?direction=${direction}`;
  limit ? (url += `&limit=${limit}`) : null;

  const data = await fetchDataFromUrl(url);
  return data.results;
};
const MoverType = new GraphQLObjectType({
  name: 'mover',
  description: 'a recent big mover',
  fields: () => ({
    instrument: {
      type: InstrumentType,
      resolve: mover => fetchInstrument(null, { symbol: mover.symbol }),
    },
    symbol: { type: GraphQLString },
    updated_at: { type: GraphQLString },
    price_movement: {
      type: new GraphQLObjectType({
        name: 'price_movement',
        fields: () => ({
          market_hours_last_movement_pct: { type: GraphQLString },
          market_hours_last_price: { type: GraphQLString },
        }),
      }),
    },
    description: { type: GraphQLString },
  }),
});

export default MoverType;
export { fetchMovers };
