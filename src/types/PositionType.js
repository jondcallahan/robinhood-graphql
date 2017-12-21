import { GraphQLObjectType, GraphQLString } from 'graphql';

import InstrumentType from './InstrumentType';
import fetchDataFromUrl from '../utils/fetchDataFromUrl';
import constants from '../constants';
const BASE_URL = constants.BASE_URL;

export const fetchPositions = async token => {
  const headers = { Authorization: `Token ${token}` };
  const data = await fetchDataFromUrl(`${BASE_URL}/positions/`, { headers });
  return data.results;
};

const PositionType = new GraphQLObjectType({
  name: 'Position',
  description: 'Position is closed if quantity is 0',
  fields: () => ({
    // "account": "https://api.robinhood.com/accounts/5PY11410/",
    account: { type: GraphQLString },
    average_buy_price: { type: GraphQLString },
    created_at: { type: GraphQLString },
    intraday_quantity: { type: GraphQLString },
    quantity: { type: GraphQLString },
    shares_held_for_buys: { type: GraphQLString },
    shares_held_for_sells: { type: GraphQLString },
    updated_at: { type: GraphQLString },
    url: { type: GraphQLString },
    instrument: {
      type: InstrumentType,
      resolve: position => fetchDataFromUrl(position.instrument),
    },
  }),
});

export default PositionType;
