import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as graphqlHTTP from 'express-graphql';

import router from './routes';
import schema from './schema';
import './db';

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1', cors(), router);
app.use('/api/v2', cors(), graphqlHTTP({ schema, graphiql: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Server' });
});

app.listen(port, () => {
  console.log(`Express RESTful API on port ${port}`);
});
