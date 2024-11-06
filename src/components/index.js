const { Client, Databases, ID, Permission, Role } = require("node-appwrite");

// Initialize Appwrite client
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("672853b500304d11b7f0")
  .setKey(
    "standard_ac29d9e204c04f63effbeafb593de785068b2489a911840bfafc30dbabdc7ffaa53ee3a9df57bd9a129896c0f65df4b1303d7b0662680c35619c88f3f8b4c79fad0f80f2a23784abaf2c70d711ceb4fd655ccf989a94da4a0649323731f34c094061a650f0ea14069e4dd26e424422343e57db6636cbb13a50366952f64739f0"
  );

const databases = new Databases(client);

// Database and Collection details
const DATABASE_ID = "6728a32a00152bbe041a";
const COLLECTION_ID = ID.unique();
const COLLECTION_NAME = "sports";

async function createSportsProductCollection() {
  try {
    // Create the collection with simple permission strings
    const collection = await databases.createCollection(
      DATABASE_ID,
      COLLECTION_ID,
      COLLECTION_NAME,
      [
        'read("any")',
        'write("any")',
        'create("any")',
        'update("any")',
        'delete("any")',
      ]
    );

    // Add attributes for sports product
    await databases.createStringAttribute(
      DATABASE_ID,
      COLLECTION_ID,
      "productName",
      255,
      true
    );

    await databases.createStringAttribute(
      DATABASE_ID,
      COLLECTION_ID,
      "category",
      100,
      true
    );

    await databases.createStringAttribute(
      DATABASE_ID,
      COLLECTION_ID,
      "brand",
      100,
      true
    );

    await databases.createFloatAttribute(
      DATABASE_ID,
      COLLECTION_ID,
      "price",
      true
    );

    await databases.createIntegerAttribute(
      DATABASE_ID,
      COLLECTION_ID,
      "stockQuantity",
      true
    );

    await databases.createStringAttribute(
      DATABASE_ID,
      COLLECTION_ID,
      "description",
      5000,
      true
    );

    await databases.createStringAttribute(
      DATABASE_ID,
      COLLECTION_ID,
      "size",
      50,
      false
    );

    await databases.createStringAttribute(
      DATABASE_ID,
      COLLECTION_ID,
      "color",
      50,
      false
    );

    await databases.createStringAttribute(
      DATABASE_ID,
      COLLECTION_ID,
      "imageUrl",
      1000,
      false
    );

    await databases.createBooleanAttribute(
      DATABASE_ID,
      COLLECTION_ID,
      "isAvailable",
      true
    );

    console.log("Sports Products Collection created successfully:", collection);
  } catch (error) {
    console.error("Error creating collection:", error);
  }
}

// Execute the function
createSportsProductCollection();
