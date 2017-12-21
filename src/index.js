import express from 'express';
import compression from 'compression';
import cors from 'cors';
import graphQLHTTP from 'express-graphql';
const debug = require('debug')('App:Server');

import schema from './schema';

const app = express();
app.use(cors());

app.use(compression());

app.use(
  graphQLHTTP({
    schema,
    graphiql: true,
  })
);

const port = process.env.PORT || 8080;
app.listen(port);
debug('Listening on port:', port);
