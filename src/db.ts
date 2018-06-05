import * as mongoose from 'mongoose';

mongoose.connect('mongodb://user:pass@ds121309.mlab.com:21309/blog');
const db = mongoose.connection;

db.once('open', () => {
  console.log('\x1b[36m%s\x1b[0m', 'connected to mongodb');
});

db.on('error', () => {
  console.log('\x1b[31m', 'mongodb connection error');
});
