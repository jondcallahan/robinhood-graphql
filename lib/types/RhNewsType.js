import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'
import fetchDataFromUrl from '../utils/fetchDataFromUrl'
import constants from '../constants'

const BASE_URL = constants.BASE_URL

const fetchRhNews = async (symbol) => {
  const url = `${BASE_URL}/midlands/news/${symbol}/`
  const data = await fetchDataFromUrl(url)
  return data.results
}
const RhNewsType = new GraphQLObjectType({
  name: 'RobinhoodNews',
  description: 'News stories from the Robinhood API',
  fields: () => ({
    url: { type: GraphQLString },
    title: { type: GraphQLString },
    source: { type: GraphQLString },
    published_at: { type: GraphQLString },
    author: { type: GraphQLString },
    summary: { type: GraphQLString },
    api_source: { type: GraphQLString },
    updated_at: { type: GraphQLString },
  }),
})
export default RhNewsType
export { fetchRhNews }
