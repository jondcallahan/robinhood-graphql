'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

require('babel-polyfill');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var fetchFundamentals = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(id) {
    var response, data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('fetching fundamentals');
            _context.next = 3;
            return (0, _nodeFetch2.default)(BASE_URL + '/fundamentals/' + id + '/');

          case 3:
            response = _context.sent;
            _context.next = 6;
            return response.json();

          case 6:
            data = _context.sent;
            return _context.abrupt('return', data);

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function fetchFundamentals(_x) {
    return _ref.apply(this, arguments);
  };
}();
var FundamentalsType = new _graphql.GraphQLObjectType({
  name: "InstrumentFundamentals",
  description: "fundamentals for instrument",
  fields: function fields() {
    return {
      "open": { type: _graphql.GraphQLString },
      "high": { type: _graphql.GraphQLString },
      "low": { type: _graphql.GraphQLString },
      "volume": { type: _graphql.GraphQLString },
      "average_volume": { type: _graphql.GraphQLString },
      "high_52_weeks": { type: _graphql.GraphQLString },
      "dividend_yield": { type: _graphql.GraphQLString },
      "low_52_weeks": { type: _graphql.GraphQLString },
      "market_cap": { type: _graphql.GraphQLString },
      "pe_ratio": { type: _graphql.GraphQLString },
      "description": { type: _graphql.GraphQLString },
      "instrument": { type: InstrumentType }
    };
  }
});

var fetchQuote = function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(id) {
    var response, data;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log('fetching quote');
            _context2.next = 3;
            return (0, _nodeFetch2.default)(BASE_URL + '/quotes/' + id + '/');

          case 3:
            response = _context2.sent;
            _context2.next = 6;
            return response.json();

          case 6:
            data = _context2.sent;
            return _context2.abrupt('return', data);

          case 8:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function fetchQuote(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
var QuoteType = new _graphql.GraphQLObjectType({
  name: "InstrumentQuote",
  description: "today's quote",
  fields: function fields() {
    return {
      "ask_price": { type: _graphql.GraphQLString },
      "ask_size": { type: _graphql.GraphQLInt },
      "bid_price": { type: _graphql.GraphQLString },
      "bid_size": { type: _graphql.GraphQLInt },
      "last_trade_price": { type: _graphql.GraphQLString },
      "last_extended_hours_trade_price": { type: _graphql.GraphQLString },
      "previous_close": { type: _graphql.GraphQLString },
      "adjusted_previous_close": { type: _graphql.GraphQLString },
      "previous_close_date": { type: _graphql.GraphQLString },
      "symbol": { type: _graphql.GraphQLString },
      "trading_halted": { type: _graphql.GraphQLBoolean },
      "last_trade_price_source": { type: _graphql.GraphQLString },
      "updated_at": { type: _graphql.GraphQLString },
      "instrument": { type: InstrumentType }
    };
  }
});
var InstrumentType = new _graphql.GraphQLObjectType({
  name: "Instrument",
  description: "a financial instrument",
  fields: function fields() {
    return {
      min_tick_size: { type: _graphql.GraphQLString },
      splits: { type: _graphql.GraphQLString },
      margin_initial_ratio: { type: _graphql.GraphQLString },
      url: { type: _graphql.GraphQLString },
      quote: {
        type: QuoteType,
        resolve: function resolve(instrument) {
          return fetchQuote(instrument.id);
        }
      },
      symbol: { type: _graphql.GraphQLString },
      bloomberg_unique: { type: _graphql.GraphQLString },
      list_date: { type: _graphql.GraphQLString },
      fundamentals: {
        type: FundamentalsType,
        resolve: function resolve(instrument) {
          return fetchFundamentals(instrument.id);
        }
      },
      state: { type: _graphql.GraphQLString },
      day_trade_ratio: { type: _graphql.GraphQLString },
      tradeable: { type: _graphql.GraphQLBoolean },
      maintenance_ratio: { type: _graphql.GraphQLString },
      id: { type: _graphql.GraphQLString },
      market: { type: _graphql.GraphQLString },
      name: { type: _graphql.GraphQLString }
    };
  }
});

// TODO: Implement Movers
// const MoversType = new GraphQLObjectType({
//   name: "Movers",
//   description: "the recent large percentage movers",
//   fields: () => ({
//
//   })
// })
var fetchInstrument = function () {
  var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(root, args) {
    var url, response, data, result;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log('fetching data');
            console.log('args', args);
            url = void 0;

            if (args.id) {
              url = BASE_URL + '/instruments/' + args.id;
            } else if (args.symbol) {
              url = BASE_URL + '/instruments/?symbol=' + args.symbol;
            }
            _context3.next = 6;
            return (0, _nodeFetch2.default)(url);

          case 6:
            response = _context3.sent;
            _context3.next = 9;
            return response.json();

          case 9:
            data = _context3.sent;
            result = args.symbol ? data.results[0] : data;

            console.log('result', result);
            return _context3.abrupt('return', result);

          case 13:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function fetchInstrument(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();
var fetchMovers = function () {
  var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(direction) {
    var url, response, data, result;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            url = BASE_URL + '/midlands/movers/sp500/?direction=' + direction;
            _context4.next = 3;
            return (0, _nodeFetch2.default)(url);

          case 3:
            response = _context4.sent;
            _context4.next = 6;
            return response.json();

          case 6:
            data = _context4.sent;
            result = data.results;
            return _context4.abrupt('return', result);

          case 9:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function fetchMovers(_x5) {
    return _ref4.apply(this, arguments);
  };
}();
var BASE_URL = 'https://api.robinhood.com';
var QueryType = new _graphql.GraphQLObjectType({
  name: 'Query',
  description: '...',
  fields: function fields() {
    return {
      instrument: {
        type: InstrumentType,
        args: {
          id: { type: _graphql.GraphQLString },
          symbol: { type: _graphql.GraphQLString }
        },
        resolve: function resolve(root, args) {
          return fetchInstrument(root, args);
        }
      }
    };
  }
});

exports.default = new _graphql.GraphQLSchema({
  query: QueryType
});


var InstrumentFields = {
  "min_tick_size": { type: _graphql.GraphQLString },
  "splits": { type: _graphql.GraphQLString },
  "margin_initial_ratio": { type: _graphql.GraphQLString },
  "url": { type: _graphql.GraphQLString },
  "quote": { type: _graphql.GraphQLString },
  "symbol": { type: _graphql.GraphQLString },
  "bloomberg_unique": { type: _graphql.GraphQLString },
  "list_date": { type: _graphql.GraphQLString },
  "fundamentals": { type: _graphql.GraphQLString },
  "state": { type: _graphql.GraphQLString },
  "day_trade_ratio": { type: _graphql.GraphQLString },
  "tradeable": { type: _graphql.GraphQLBoolean },
  "maintenance_ratio": { type: _graphql.GraphQLString },
  "id": { type: _graphql.GraphQLString },
  "market": { type: _graphql.GraphQLString },
  "name": { type: _graphql.GraphQLString }
};

var QuoteFields = {
  "ask_price": { type: _graphql.GraphQLString },
  "ask_size": { type: _graphql.GraphQLInt },
  "bid_price": { type: _graphql.GraphQLString },
  "bid_size": { type: _graphql.GraphQLInt },
  "last_trade_price": { type: _graphql.GraphQLString },
  "last_extended_hours_trade_price": { type: _graphql.GraphQLString },
  "previous_close": { type: _graphql.GraphQLString },
  "adjusted_previous_close": { type: _graphql.GraphQLString },
  "previous_close_date": { type: _graphql.GraphQLString },
  "symbol": { type: _graphql.GraphQLString },
  "trading_halted": { type: _graphql.GraphQLBoolean },
  "last_trade_price_source": { type: _graphql.GraphQLString },
  "updated_at": { type: _graphql.GraphQLString },
  "instrument": { type: InstrumentType }
};

var FundamentalsFields = {
  "open": { type: _graphql.GraphQLString },
  "high": { type: _graphql.GraphQLString },
  "low": { type: _graphql.GraphQLString },
  "volume": { type: _graphql.GraphQLString },
  "average_volume": { type: _graphql.GraphQLString },
  "high_52_weeks": { type: _graphql.GraphQLString },
  "dividend_yield": { type: _graphql.GraphQLString },
  "low_52_weeks": { type: _graphql.GraphQLString },
  "market_cap": { type: _graphql.GraphQLString },
  "pe_ratio": { type: _graphql.GraphQLString },
  "description": { type: _graphql.GraphQLString },
  "instrument": { type: InstrumentType }
};