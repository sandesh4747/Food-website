import React, { useState } from "react";

import { useAddProductMutation } from "./api/productApi";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

export default function AddProduct() {
  const [addProduct, { isLoading }] = useAddProductMutation();
  const [images, setImages] = useState([]);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    offerPrice: "",
    category: "",
    stock: "",
    isFeatured: false,
  });

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const updatedImages = [...images];
      updatedImages[index] = file;
      setImages(updatedImages);
    }
  };

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setProductData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length === 0) {
      toast.error("At least one image is required");
      return;
    }

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("category", productData.category);
    formData.append("stock", productData.stock);
    formData.append("isFeatured", productData.isFeatured);

    images.forEach((img) => {
      if (img) formData.append("images", img);
    });

    try {
      const res = await addProduct(formData).unwrap();

      toast.success("Product added successfully");
      setProductData({
        name: "",
        description: "",
        price: "",
        offerPrice: "",
        category: "",
        stock: "",
        isFeatured: false,
      });
      setImages([]);
    } catch (err) {
      console.error(err);
      toast.error(
        err?.data?.message || err.error || "Failed to add product",
        err
      );
    }
  };

  return (
    <div className="py-10 bg-red-50">
      <form
        onSubmit={handleSubmit}
        className="md:p-10 p-4 space-y-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-red-600">Add New Product</h2>

        {/* Image Uploads */}
        <div>
          <p className="text-base font-semibold text-orange-500">
            Product Images
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {Array(4)
              .fill("")
              .map((_, index) => (
                <label key={index} htmlFor={`image${index}`}>
                  <input
                    accept="image/*"
                    type="file"
                    id={`image${index}`}
                    hidden
                    onChange={(e) => handleImageChange(e, index)}
                  />
                  <img
                    className="max-w-24 cursor-pointer rounded border border-orange-300 hover:opacity-80"
                    src={
                      images[index]
                        ? URL.createObjectURL(images[index])
                        : "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png"
                    }
                    alt="upload"
                  />
                </label>
              ))}
          </div>
        </div>

        {/* Product Name */}
        <div className="flex flex-col gap-1">
          <label
            className="text-base font-semibold text-orange-500"
            htmlFor="name"
          >
            Product Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Type here"
            className="py-2 px-3 rounded border border-orange-300 outline-none focus:ring-2 focus:ring-red-500"
            value={productData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label
            className="text-base font-semibold text-orange-500"
            htmlFor="description"
          >
            Product Description
          </label>
          <textarea
            id="description"
            rows={4}
            placeholder="Type here"
            className="py-2 px-3 rounded border border-orange-300 outline-none resize-none focus:ring-2 focus:ring-red-500"
            value={productData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Category */}
        <div className="flex flex-col gap-1">
          <label
            className="text-base font-semibold text-orange-500"
            htmlFor="category"
          >
            Category
          </label>
          <select
            id="category"
            className="py-2 px-3 rounded border border-orange-300 outline-none focus:ring-2 focus:ring-red-500"
            value={productData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            {[
              "fruits",
              "vegetables",
              "dairy",
              "instant",
              "drinks",
              "bakery",
              "grains",
            ].map((cat, i) => (
              <option key={i} value={cat} className="text-red-400">
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Price & Stock */}
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex-1 flex flex-col gap-1 min-w-[120px]">
            <label
              className="text-base font-semibold text-orange-500"
              htmlFor="price"
            >
              Price
            </label>
            <input
              id="price"
              type="number"
              placeholder="0"
              value={productData.price}
              onChange={handleChange}
              className="py-2 px-3 rounded border border-orange-300 outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div className="flex-1 flex flex-col gap-1 min-w-[120px]">
            <label
              className="text-base font-semibold text-orange-500"
              htmlFor="stock"
            >
              Stock
            </label>
            <input
              id="stock"
              type="number"
              placeholder="0"
              value={productData.stock}
              onChange={handleChange}
              className="py-2 px-3 rounded border border-orange-300 outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
        </div>

        {/* Featured */}
        <div className="flex items-center gap-3">
          <input
            id="isFeatured"
            type="checkbox"
            checked={productData.isFeatured}
            onChange={handleChange}
          />
          <label
            htmlFor="isFeatured"
            className="text-base font-semibold text-orange-500"
          >
            Featured Product
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className={`px-8 py-2.5 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded shadow transition ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isLoading && <Loader className="w-5 h-5 animate-spin" />}
          {isLoading ? "Adding..." : "ADD PRODUCT"}
        </button>
      </form>
    </div>
  );
}
