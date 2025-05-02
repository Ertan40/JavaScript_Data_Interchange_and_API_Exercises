// Import the MongoDB client
// const { MongoClient } = require("mongodb"); // If you prefer CommonJS, rename your file from .js to .cjs
import { MongoClient } from "mongodb";

// Define the MongoDB connection URI
const uri =
  "mongodb://your-user:your-password@localhost:27017/?authSource=admin";
const client = new MongoClient(uri);

async function connectToDB() {
  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log("Connected to MongoDB");
    // List databases to verify connection
    const databases = await client.db().admin().listDatabases();
    console.log(
      "Databases:",
      databases.databases.map((db) => db.name)
    );
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`);
  } finally {
    await client.close();
    console.log("Connection has been closed successfully.");
  }
}

// connectToDB();

// Create: Insert Documents
async function insertDocuments() {
  const db = client.db("testdb");
  const collection = db.collection("users");

  const result = await collection.insertMany([
    { name: "Ertan", age: 40 },
    { name: "Meryem", age: 12 },
    { name: "Ani", age: 40 },
  ]);

  console.log(`${result.insertedCount} documents inserted`);
}
// Read: Query Documents
async function findDocuments() {
  const db = client.db("testdb");
  const collection = db.collection("users");

  const users = await collection.find({}).toArray();
  console.log(`Users are: ${users}`);
}
// Update: Modify Documents
async function updateDocuments() {
  const db = client.db("testdb");
  const collection = db.collection("users");

  const result = await collection.updateOne(
    { name: "Ertan" }, // Filter
    { $set: { age: 42 } }
  );
  console.log(`${result.modifiedCount} document(s) updated`);
}
// Delete: Remove Documents
async function deleteDocuments() {
  const db = client.db("testdb");
  const collection = db.collection("users");

  const user = await collection.deleteOne({ name: "Ani" });
  console.log(`${user.deletedCount} document(s) deleted`);
}

async function main() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    await insertDocuments(); // Perform Create
    await findDocuments(); // Perform Read
    await updateDocuments(); // Perform Update
    await deleteDocuments(); // Perform Delete
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
    console.log("Connection has been closed successfully.");
  }
}

// Call the main function
main();
