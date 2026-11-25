
import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";

function AdminDashboard() {

    const [totalProducts, setTotalProducts] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalCustomers, setTotalCustomers] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [recentOrders, setRecentOrders] = useState([]);


    useEffect(() => {
    const fetchProducts = async () => {
        try {
        const response = await fetch("http://localhost:5000/api/products");
        const data = await response.json();

        setTotalProducts(data.length);
        } catch (error) {
        console.error("Error fetching products:", error);
        }
    };

    fetchProducts();
    }, []);

useEffect(() => {
  const fetchOrders = async () => {
    try {
      const token = sessionStorage.getItem("wearwise-token");


      const response = await fetch(
        "http://localhost:5000/api/orders/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
            
            if (response.ok) {
                setTotalOrders(data.count);
        const latestOrders = [...data.orders]
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  .slice(0, 5);

setRecentOrders(latestOrders);
    const revenue = data.orders
  .filter(order => order.orderStatus !== "Cancelled")
  .reduce((total, order) => {
    return total + Number(order.totalAmount || 0);
  }, 0);

setTotalRevenue(revenue);
        
        } else {
        console.error("Orders API Error:", data.message);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  fetchOrders();
}, []);


    useEffect(() => {
  const fetchCustomers = async () => {
    try {
      const token = sessionStorage.getItem("wearwise-token");

      const response = await fetch(
        "http://localhost:5000/api/auth/customers/count",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

console.log("Customer API Status:", response.status);
console.log("Customer API Response:", data);

if (response.ok) {
  setTotalCustomers(data.totalCustomers);
} else {
  console.error("Customers API Error:", data.message);
}
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };
  

  fetchCustomers();
}, []);

return (
  <>
    <header className="admin-header">
      <div>
        <h1>Dashboard Overview</h1>
        <p>Welcome back! Here's what's happening with your store.</p>
      </div>

      <div className="admin-profile">
        <div className="profile-avatar">A</div>
        <span>Administrator</span>
      </div>
    </header>

    {/* Statistics */}
    <section className="dashboard-stats" id="overview">
<div className="stat-card">
  <p>Total Products</p>
  <h2>{totalProducts}</h2>
  <span>Store inventory</span>
</div>

<div className="stat-card">
  <p>Total Orders</p>
  <h2>{totalOrders}</h2>
  <span>Customer orders</span>
</div>

<div className="stat-card">
  <p>Total Customers</p>
  <h2>{totalCustomers}</h2>
  <span>Registered users</span>
</div>

<div className="stat-card">
  <p>Total Revenue</p>
  <h2>₹{totalRevenue.toLocaleString("en-IN")}</h2>
  <span>Revenue from all orders</span>
</div>
    </section>

    {/* Welcome Section */}
    <section className="admin-welcome">
      <h2>Manage Your Store</h2>
      <p>
        Manage products, track customer orders and monitor
        your WearWise store from one place.
      </p>
    </section>
    <section className="recent-orders-section">
  <div className="recent-orders-header">
    <div>
      <h2>Recent Orders</h2>
      <button
        className="view-orders-btn"
        onClick={() => window.location.href = "/admin/orders"}
        >
        View All Orders <span>→</span>
        </button>
      <p>Latest customer orders from your store.</p>
    </div>
  </div>

  {recentOrders.length === 0 ? (
    <p>No recent orders found.</p>
  ) : (
    <div className="recent-orders-table-wrapper">
      <table className="recent-orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {recentOrders.map((order) => (
            <tr key={order._id}>
              <td>#{order._id.slice(-6)}</td>
              <td>{order.userId?.name || "Customer"}</td>
              <td>₹{order.totalAmount}</td>
              <td>
                <span className={`order-status ${order.orderStatus?.toLowerCase()}`}>
                    {order.orderStatus}
                </span>
                </td>
              <td>
                {new Date(order.createdAt).toLocaleDateString("en-IN")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</section>
  </>
);
}

export default AdminDashboard;
