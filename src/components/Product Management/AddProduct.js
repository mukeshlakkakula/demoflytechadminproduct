import React, { useState } from "react";
import { databases, storage } from "../AppWrite/appwriteLoginConfig";
import { v4 as uuidv4 } from "uuid";

const AddProduct = () => {
  const [id, setId] = useState(uuidv4());
  const [productData, setProductData] = useState({
    id,
    name: "",
    description: "",
    price: 0,
    sku: "",
    stock: 0,
    category: "",
    images: [],
    tags: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Handle number parsing for price and stock fields
    const parsedValue =
      name === "price" || name === "stock" ? Number(value) : value;
    setProductData({ ...productData, [name]: parsedValue });
  };

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    const uploadedImages = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const response = await storage.createFile(
        process.env.REACT_APP_ALL_PRODUCTS_BUCKET_ID,
        uuidv4(),
        file
      );
      uploadedImages.push(response.$id);
    }

    setProductData({ ...productData, images: uploadedImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await databases.createDocument(
        process.env.REACT_APP_DATABASE_ID,
        process.env.REACT_APP_ADDED_PRODUCTS_COLLECTION_ID,
        id,
        productData
      );
      // Reset form or redirect after successful submission
      setProductData({
        id: uuidv4(), // Generate a new ID for the next product
        name: "",
        description: "",
        price: 0,
        sku: "",
        stock: 0,
        category: "",
        images: [],
        tags: [],
      });
    } catch (error) {
      console.error("Failed to add product:", error.message);
    }
  };

  const Categories = [
    "Grocery",
    "Mobiles",
    "Fashion",
    "Electronics",
    "Home & Furniture",
    "Appliances",
    "Flight Bookings",
    "Beauty, Toys & More",
    "Two Wheelers",
  ];

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="name"
          >
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            placeholder="Product Name"
            required
            className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="description"
          >
            Product Description
          </label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            placeholder="Product Description"
            required
            className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="price"
          >
            Price
          </label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            placeholder="Price"
            required
            className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="sku"
          >
            SKU
          </label>
          <input
            type="text"
            name="sku"
            value={productData.sku}
            onChange={handleChange}
            placeholder="SKU"
            required
            className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="stock"
          >
            Stock Level
          </label>
          <input
            type="number"
            name="stock"
            value={productData.stock}
            onChange={handleChange}
            placeholder="Stock Level"
            required
            className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="category"
          >
            Category
          </label>
          <select
            name="category"
            value={productData.category}
            onChange={handleChange}
            required
            className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
          >
            <option value="" disabled>
              Select a category
            </option>
            {Categories.map((each, index) => (
              <option value={each} key={index}>
                {each}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="images"
          >
            Upload Images
          </label>
          <input
            type="file"
            multiple
            onChange={handleImageUpload}
            required
            className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="tags"
          >
            Tags
          </label>
          <input
            type="text"
            name="tags"
            value={productData.tags.join(",")}
            onChange={(e) =>
              handleChange({
                target: {
                  name: "tags",
                  value: e.target.value.split(",").map((tag) => tag.trim()),
                },
              })
            }
            placeholder="Tags (comma separated)"
            className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
