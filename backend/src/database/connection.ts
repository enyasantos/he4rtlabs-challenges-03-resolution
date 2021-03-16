import { MongoClient } from 'mongodb';

import 'dotenv/config';

export const connection = async () => {
  const uri  = process.env.URI_MONGO

  const client = new MongoClient(uri, { 
    useUnifiedTopology: true, 
    useNewUrlParser: true,
  });

  try {
    await client.connect();
  } catch (e) {
    console.error(e);
  }

  return client;
}

export default connection();