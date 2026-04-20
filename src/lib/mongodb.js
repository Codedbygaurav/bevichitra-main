import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("❌ Please add MONGODB_URI to .env.local");
}

// ✅ Better client config
const options = {
  maxPoolSize: 10,
};

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);

    global._mongoClientPromise = client
      .connect()
      .then((client) => {
        console.log("✅ MongoDB connected (dev)");
        return client;
      })
      .catch((err) => {
        console.error("❌ MongoDB connection error:", err);
        throw err;
      });
  }

  clientPromise = global._mongoClientPromise;

} else {
  client = new MongoClient(uri, options);

  clientPromise = client
    .connect()
    .then((client) => {
      console.log("✅ MongoDB connected (prod)");
      return client;
    })
    .catch((err) => {
      console.error("❌ MongoDB connection error:", err);
      throw err;
    });
}

export default clientPromise;