import { MongoClient } from 'mongodb';

export const connection = async () => {
  const uri  = "mongodb+srv://mainAdmin:admin@cluster0.hrefk.mongodb.net/database?retryWrites=true&w=majority"

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