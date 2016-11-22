import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'

import InstrumentType from './InstrumentType'
import fetchDataFromUrl from '../utils/fetchDataFromUrl'
import constants from '../constants'

const BASE_URL = constants.BASE_URL

export const fetchWatchList = async(token) => {
  const headers = { 'Authorization': `Token ${token}` }
  const data = await fetchDataFromUrl(`${BASE_URL}/watchlists/Default/`, { headers }) // eslint-disable-line
  return data.results
}

const WatchListType = new GraphQLObjectType({
  name: 'WatchList',
  description: 'A list of instruments from the user\'s Default watchlist',
  fields: () => ({
      'created_at': { type: GraphQLString },
      'instrument': {
        type: InstrumentType,
        resolve: (watchlist) => fetchDataFromUrl(watchlist.instrument),
      },
      'url': { type: GraphQLString },
      'watchlist': { type: GraphQLString },
  }),
})

export default WatchListType
