import { MongoClient } from "mongodb";

const options = {
  auth: {
    username: process.env.MONGO_USERNAME,
    password: process.env.MONGO_ACCOUNT_PASSWORD,
  },
};

const uri = process.env.MONGO_URI!;
const client = new MongoClient(uri, options);

let dbInstance: MongoClient | null = null;

export const connect = async () => {
  if (dbInstance) {
    return dbInstance.db(process.env.MONGO_DB_NAME);
  }
  try {
    await client.connect();
    console.log("MongoDB is connected");
    dbInstance = client;
    return client.db(process.env.MONGO_DB_NAME);
  } catch (err) {
    console.error(
      "MongoDB connection unsuccessful, retry after 5 seconds.",
      err
    );
    setTimeout(connect, 5000);
    throw err;
  }
};

export default connect;
