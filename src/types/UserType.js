import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
} from 'graphql';

import PositionType, { fetchPositions } from './PositionType';
import WatchListType, { fetchWatchList } from './WatchListType';
import constants from '../constants';
import fetchDataFromUrl from '../utils/fetchDataFromUrl';

const BASE_URL = constants.BASE_URL;
const debug = require('debug')('App:UserType');

export const fetchUser = async token => {
  debug('Fetching user');
  const headers = { Authorization: `Token ${token}` };
  const data = await fetchDataFromUrl(`${BASE_URL}/user/`, { headers });
  return data;
};

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'The root user object',
  fields: () => ({
    // additional_info: 'https://api.robinhood.com/user/additional_info/',
    additional_info: { type: GraphQLString },
    // basic_info: 'https://api.robinhood.com/user/basic_info/',
    basic_info: { type: GraphQLString },
    created_at: { type: GraphQLString },
    email: { type: GraphQLString },
    email_verified: { type: GraphQLBoolean },
    // employment: 'https://api.robinhood.com/user/employment/',
    employment: { type: GraphQLString },
    first_name: { type: GraphQLString },
    id: { type: GraphQLString },
    // id_info: 'https://api.robinhood.com/user/id/',
    id_info: { type: GraphQLString },
    // international_info: 'https://api.robinhood.com/user/international_info/',
    international_info: { type: GraphQLString },
    // investment_profile: 'https://api.robinhood.com/user/investment_profile/',
    investment_profile: { type: GraphQLString },
    last_name: { type: GraphQLString },
    url: { type: GraphQLString },
    username: { type: GraphQLString },
    positions: {
      type: new GraphQLList(PositionType),
      resolve: (root, args, context) => fetchPositions(context.headers.token),
    },
    watchlist: {
      type: new GraphQLList(WatchListType),
      resolve: (root, args, context) => fetchWatchList(context.headers.token),
    },
  }),
});
export default UserType;
