import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
} from 'graphql';

const QuoteType = new GraphQLObjectType({
  name: 'InstrumentQuote',
  description: "today's quote",
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
  }),
});

export default QuoteType;
