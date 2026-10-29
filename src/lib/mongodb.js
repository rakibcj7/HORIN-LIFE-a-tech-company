import { MongoClient } from "mongodb";

const options = { maxPoolSize: 10, serverSelectionTimeoutMS: 5000 };

let clientPromise;

export async function connectToMongoDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not configured");

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = new MongoClient(uri, options).connect().catch((error) => {
        delete global._mongoClientPromise;
        throw error;
      });
    }
    return global._mongoClientPromise;
  }

  if (!clientPromise) clientPromise = new MongoClient(uri, options).connect();
  return clientPromise;
}

// Call only when the application is shutting down. Next.js manages server
// process lifetime, so route handlers should reuse the client instead.
export async function disconnectFromMongoDB() {
  const promise = process.env.NODE_ENV === "development"
    ? global._mongoClientPromise
    : clientPromise;
  if (!promise) return;

  const client = await promise;
  await client.close();
  if (process.env.NODE_ENV === "development") delete global._mongoClientPromise;
  else clientPromise = undefined;
}

export async function getInquiriesCollection() {
  const client = await connectToMongoDB();
  return client.db(process.env.MONGODB_DB || "horinlife").collection("inquiries");
}

export async function getApplicationsCollection() {
  const client = await connectToMongoDB();
  return client.db(process.env.MONGODB_DB || "horinlife").collection("applications");
}
