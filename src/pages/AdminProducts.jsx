import React, { useState, useEffect } from "react";
import "./AdminProducts.css";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploading, setUploading] = useState(false);

    const [formData, setFormData] = useState({
    name: "",
    price: "",
    rating: "",
    category: "",
    image: ""
    });

    const [editingProductId, setEditingProductId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/products"
        );

        const data = await response.json();

        if (response.ok) {
          setProducts(data);
        } else {
          console.error("Products API Error:", data.message);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prevData) => ({
    ...prevData,
    [name]: value
  }));
};

const handleImageSelect = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  if (!allowedTypes.includes(file.type)) {
    alert("Please select a JPG, PNG or WEBP image.");
    e.target.value = "";
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    alert("Image size should not exceed 5 MB.");
    e.target.value = "";
    return;
  }

  setSelectedImageFile(file);
  setImagePreview(URL.createObjectURL(file));

  setFormData((prev) => ({
    ...prev,
    image: ""
  }));
};

const startEditing = (product) => {
  setEditingProductId(product.id);

  setFormData({
    name: product.name,
    price: product.price,
    rating: product.rating,
    category: product.category,
    image: product.image
  });
  setSelectedImageFile(null);
setImagePreview(product.image || "");
  setShowForm(true);
};

const uploadProductImage = async () => {
  const token = sessionStorage.getItem("wearwise-token");

  const imageFormData = new FormData();
  imageFormData.append("image", selectedImageFile);

  const response = await fetch(
    "http://localhost:5000/api/products/upload-image",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: imageFormData
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Image upload failed.");
  }

  return data.image;
};

const handleAddProduct = async (updatedData) => {
  try {
    const token = sessionStorage.getItem("wearwise-token");

    const response = await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updatedData)
    });

    const data = await response.json();

    if (response.ok) {
      setProducts((prevProducts) => [...prevProducts, data.product]);
      alert("Product added successfully!");
      return true;
    }

    alert(data.message || "Failed to add product.");
    return false;

  } catch (error) {
    console.error("Add product error:", error);
    alert(error.message || "Something went wrong.");
    return false;
  }
};

const handleEditProduct = async (productId, updatedData) => {
  try {
    const token = sessionStorage.getItem("wearwise-token");

    const response = await fetch(
      `http://localhost:5000/api/products/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updatedData)
      }
    );

    const data = await response.json();

    if (response.ok) {
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId ? data.product : product
        )
      );

      alert("Product updated successfully!");
      return true;
    } else {
      alert(data.message || "Failed to update product.");
      return false;
    }
  } catch (error) {
    console.error("Edit product error:", error);
    alert("Something went wrong.");
    return false;
  }
};

const handleDeleteProduct = async (productId) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this product?"
  );

  if (!confirmDelete) return;

  try {
    const token = sessionStorage.getItem("wearwise-token");

    const response = await fetch(
      `http://localhost:5000/api/products/${productId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await response.json();

    if (response.ok) {
      setProducts((prevProducts) =>
        prevProducts.filter(
          (product) => product.id !== productId
        )
      );

      alert("Product deleted successfully!");
    } else {
      alert(data.message || "Failed to delete product.");
    }
  } catch (error) {
    console.error("Delete product error:", error);
    alert("Something went wrong.");
  }
};

const handleFormSubmit = async (e) => {
  e.preventDefault();

  try {
    setUploading(true);

    let imageUrl = formData.image.trim();

    // Upload image if a new file is selected
    if (selectedImageFile) {
      imageUrl = await uploadProductImage();
    }

    if (!imageUrl) {
      alert("Please provide a product image URL or upload an image.");
      return;
    }

    const updatedData = {
      ...formData,
      image: imageUrl,
      price: Number(formData.price),
      rating: Number(formData.rating || 0)
    };

    let success = false;

    if (editingProductId !== null) {
      success = await handleEditProduct(editingProductId, updatedData);
    } else {
      success = await handleAddProduct(updatedData);
    }

    if (success) {
      const response = await fetch("http://localhost:5000/api/products");
      const latestProducts = await response.json();

      if (response.ok) {
        setProducts(latestProducts);
      }

      setEditingProductId(null);
      setSelectedImageFile(null);
      setImagePreview("");

      setFormData({
        name: "",
        price: "",
        rating: "",
        category: "",
        image: ""
      });

      setShowForm(false);
    }

  } catch (error) {
    console.error("Product form error:", error);
    alert(error.message || "Something went wrong.");
  } finally {
    setUploading(false);
  }
};

return (
  <div className="admin-products-page">
    <div className="products-header">
      <div>
        <h1>Products Management</h1>
        <p>Manage your WearWise store inventory.</p>
      </div>

      <button
  className="add-product-btn"
 onClick={() => {
  if (!showForm) {
    setEditingProductId(null);
    setSelectedImageFile(null);
    setImagePreview("");

    setFormData({
      name: "",
      price: "",
      rating: "",
      category: "",
      image: ""
    });
  }

  setShowForm(!showForm);
}}
>
  + Add Product
</button>

    </div>

    {showForm && (

<form className="product-form" onSubmit={handleFormSubmit}>
  <h2>
    {editingProductId !== null ? "Edit Product" : "Add New Product"}
  </h2>

  {/* LEFT SIDE - PRODUCT FIELDS */}
  <div className="product-form-fields">

    <input
      type="text"
      name="name"
      placeholder="Product Name"
      value={formData.name}
      onChange={handleChange}
      required
    />

    <input
      type="number"
      name="price"
      placeholder="Price"
      value={formData.price}
      onChange={handleChange}
      required
    />

    <input
      type="number"
      name="rating"
      placeholder="Rating (0–5)"
      min="0"
      max="5"
      step="0.1"
      value={formData.rating}
      onChange={handleChange}
    />

    <input
      type="text"
      name="category"
      placeholder="Category"
      value={formData.category}
      onChange={handleChange}
      required
    />

    <div className="product-image-upload">

      <label>Product Image URL (Optional)</label>

      <input
        type="text"
        name="image"
        placeholder="Paste product image URL"
        value={formData.image}
        onChange={(e) => {
          handleChange(e);
          setSelectedImageFile(null);
          setImagePreview(e.target.value);
        }}
      />

      <p>OR</p>

      <label>Upload Product Image</label>

      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleImageSelect}
      />

    </div>

    <button type="submit" disabled={uploading}>
      {uploading
        ? "Uploading..."
        : editingProductId !== null
          ? "Update Product"
          : "Save Product"}
    </button>

  </div>

  {/* RIGHT SIDE - IMAGE PREVIEW */}
  <div className="product-preview-panel">

    <h3>Product Image Preview</h3>

    {imagePreview ? (
      <img
        src={imagePreview}
        alt="Product Preview"
        className="product-image-preview"
      />
    ) : (
      <div className="preview-placeholder">
        Product image will appear here
      </div>
    )}

  </div>

</form>
)}

    {loading ? (
      <p>Loading products...</p>
    ) : products.length === 0 ? (
      <p>No products found.</p>
    ) : (
      <div className="products-table-wrapper">
        <table className="products-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
            <td>{product.name}</td>

            <td>{product.category}</td>

            <td>₹{product.price}</td>

            <td>{product.rating}</td>

            <td>
                <button
                className="edit-product-btn"
                onClick={() => startEditing(product)}
                >
                Edit
                </button>
                <button
                className="delete-product-btn"
                onClick={() => handleDeleteProduct(product.id)}
                >
                Delete
                </button>
            </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);
}

export default AdminProducts;