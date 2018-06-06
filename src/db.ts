import * as mongoose from 'mongoose';

const uri = process.env.MONGO_URI || 'null';

mongoose.connect(uri);

const db = mongoose.connection;

db.once('open', () => {
  console.log('\x1b[36m%s\x1b[0m', 'connected to mongodb');
});

db.on('error', () => {
  console.log('\x1b[31m', 'mongodb connection error');
});
