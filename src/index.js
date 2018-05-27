import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import router from './routes';
import './db';

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', cors(), router);

app.get('/', (req, res) => {
  res.json({ message: 'Server' });
});

app.listen(port, () => {
  console.log(`Express RESTful API on port ${port}`);
});
