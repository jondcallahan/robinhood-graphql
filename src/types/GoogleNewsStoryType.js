import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'
import googleFinance from 'google-finance'
const debug = require('debug')('App:GoogleNewsStoryType')

const GoogleNewsStoryType = new GraphQLObjectType({
  name: 'GoogleFinanceNewsStory',
  description: 'A recent news story about the given symbol',
  fields: () => ({
    date: { type: GraphQLString },
    description: { type: GraphQLString },
    guid: { type: GraphQLString },
    link: { type: GraphQLString },
    summary: { type: GraphQLString },
    symbol: { type: GraphQLString },
    title: { type: GraphQLString },
  }),
})

const fetchGoogleNews = async(symbol) => {
  debug('fetching news')
  const news = await googleFinance.companyNews({ symbol })
  // This comes back in reverse chrono - reverse the array before returning it
  // to return an array of chrono news stories
  return news.reverse()
}

export default GoogleNewsStoryType
export { fetchGoogleNews }
