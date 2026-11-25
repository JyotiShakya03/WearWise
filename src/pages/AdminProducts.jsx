import React, { useState, useEffect } from "react";
import "./AdminProducts.css";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

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

const startEditing = (product) => {
  setEditingProductId(product.id);

  setFormData({
    name: product.name,
    price: product.price,
    rating: product.rating,
    category: product.category,
    image: product.image
  });

  setShowForm(true);
};

const handleAddProduct = async (e) => {
  e.preventDefault();

  try {
    const token = sessionStorage.getItem("wearwise-token");

    const response = await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        ...formData,
        price: Number(formData.price),
        rating: Number(formData.rating || 0)
      })
    });

    const data = await response.json();

    if (response.ok) {
      setProducts((prevProducts) => [...prevProducts, data.product]);
      setFormData({
        name: "",
        price: "",
        rating: "",
        category: "",
        image: ""
      });
      setShowForm(false);
      alert("Product added successfully!");
    } else {
      alert(data.message || "Failed to add product.");
    }
  } catch (error) {
    console.error("Add product error:", error);
    alert("Something went wrong.");
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
    } else {
      alert(data.message || "Failed to update product.");
    }
  } catch (error) {
    console.error("Edit product error:", error);
    alert("Something went wrong.");
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

  const updatedData = {
    ...formData,
    price: Number(formData.price),
    rating: Number(formData.rating || 0)
  };

  if (editingProductId !== null) {
    await handleEditProduct(editingProductId, updatedData);

    setEditingProductId(null);
    setFormData({
      name: "",
      price: "",
      rating: "",
      category: "",
      image: ""
    });
    setShowForm(false);
  } else {
    handleAddProduct(e);
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
        onClick={() => setShowForm(!showForm)}
        >
        + Add Product
        </button>
    </div>

    {showForm && (
    <form className="product-form" onSubmit={handleFormSubmit}>
        <h2>Add New Product</h2>

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

    <input
      type="text"
      name="image"
      placeholder="Product Image URL"
      value={formData.image}
      onChange={handleChange}
      required
    />

        <button type="submit">
    {editingProductId !== null ? "Update Product" : "Save Product"}
    </button>
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