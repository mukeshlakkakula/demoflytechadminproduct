// src/appwriteConfig.js
import { Client, Account, Databases, Storage } from "appwrite"; // Ensure Storage is imported

const client = new Client();

client
  .setEndpoint(process.env.REACT_APP_APPWRITE_URL) // Your Appwrite endpoint
  .setProject(process.env.REACT_APP_PROJECT_ID); // Your Appwrite project ID

console.log(
  "projectid",
  process.env.REACT_APP_PROJECT_ID,
  process.env.REACT_APP_APPWRITE_URL
);
// Export the account object for authentication
export const account = new Account(client);
export const storage = new Storage(client); // Ensure Storage is imported and instantiated
// Export the databases object for database operations
export const databases = new Databases(client);
