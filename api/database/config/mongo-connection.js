const { MongoClient, ServerApiVersion } = require("mongodb");
require('dotenv/config');

const url = process.env.DB_CONNECTION_URL;
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

mongoConnect = async () => {
  try {
    const res = await client.connect();
    console.log("Mongodb connected", res);
    return res;
  } catch (error) {
    console.log("Error: Could not connect to database");
  } finally {
    await client.close();
  }
};

mongoConnect();

client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

module.exports = mongoConnect;
