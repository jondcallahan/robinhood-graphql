const InstrumentType = new GraphQLObjectType({
  name: 'Instrument',
  description: 'a financial instrument',
  fields: () => ({
    min_tick_size: { type: GraphQLString, },
    splits: { type: GraphQLString, },
    margin_initial_ratio: { type: GraphQLString, },
    url: { type: GraphQLString, },
    quote: {
      type: QuoteType,
      resolve: (instrument) => fetchQuote(instrument.id),
    },
    symbol: { type: GraphQLString, },
    bloomberg_unique: { type: GraphQLString, },
    list_date: { type: GraphQLString, },
    fundamentals: {
      type: FundamentalsType,
      resolve: (instrument) => fetchFundamentals(instrument.id),
    },
    state: { type: GraphQLString, },
    day_trade_ratio: { type: GraphQLString, },
    tradeable: { type: GraphQLBoolean, },
    maintenance_ratio: { type: GraphQLString, },
    id: { type: GraphQLString, },
    market: { type: GraphQLString, },
    name: { type: GraphQLString, },
  }),
})

export default InstrumentType
