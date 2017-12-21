import { GraphQLObjectType, GraphQLString } from 'graphql';

const FundamentalsType = new GraphQLObjectType({
  name: 'InstrumentFundamentals',
  description: 'fundamentals for instrument',
  fields: () => ({
    open: { type: GraphQLString },
    high: { type: GraphQLString },
    low: { type: GraphQLString },
    volume: { type: GraphQLString },
    average_volume: { type: GraphQLString },
    high_52_weeks: { type: GraphQLString },
    dividend_yield: { type: GraphQLString },
    low_52_weeks: { type: GraphQLString },
    market_cap: { type: GraphQLString },
    pe_ratio: { type: GraphQLString },
    description: { type: GraphQLString },
  }),
});

export default FundamentalsType;
