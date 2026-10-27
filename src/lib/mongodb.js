import { MongoClient } from "mongodb";

const options = { maxPoolSize: 10, serverSelectionTimeoutMS: 5000 };

let clientPromise;

function getClientPromise() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not configured");

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = new MongoClient(uri, options).connect();
    }
    return global._mongoClientPromise;
  }

  if (!clientPromise) clientPromise = new MongoClient(uri, options).connect();
  return clientPromise;
}

export async function getInquiriesCollection() {
  const client = await getClientPromise();
  return client.db(process.env.MONGODB_DB || "horinlife").collection("inquiries");
}

export async function getApplicationsCollection() {
  const client = await getClientPromise();
  return client.db(process.env.MONGODB_DB || "horinlife").collection("applications");
}
