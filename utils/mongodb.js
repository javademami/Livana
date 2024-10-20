// lib/mongodb.js

import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://javademami2030:demo@cluster0.qv4j7.mongodb.net/'; // رشته اتصال خود را وارد کنید
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the MongoClient is not repeatedly instantiated
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
