
import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";

function AdminDashboard() {

    const [totalProducts, setTotalProducts] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalCustomers, setTotalCustomers] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [recentOrders, setRecentOrders] = useState([]);
    const [contactMessages, setContactMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [totalMessages, setTotalMessages] = useState(0);
    const [newMessages, setNewMessages] = useState(0);
    const [repliedMessages, setRepliedMessages] = useState(0);



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


useEffect(() => {
  const fetchContactMessages = async () => {
    try {
      const token = sessionStorage.getItem("wearwise-token");

const response = await fetch("http://localhost:5000/api/contact", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
      const data = await response.json();

      if (response.ok) {
        const messages = data.data || [];

        setContactMessages(messages);
        setTotalMessages(messages.length);
        setNewMessages(
          messages.filter((msg) => msg.status === "New").length
        );
        setRepliedMessages(
          messages.filter((msg) => msg.status === "Replied").length
        );
      }
    } catch (error) {
      console.error("Contact Messages Error:", error);
    }
  };

  fetchContactMessages();
}, []);



const updateMessageStatus = async (id, status) => {
  try {
    const token = sessionStorage.getItem("wearwise-token");

    const response = await fetch(
      `http://localhost:5000/api/contact/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      setContactMessages((prev) =>
        prev.map((msg) =>
          msg._id === id ? { ...msg, status } : msg
        )
      );

      setNewMessages((prev) =>
        prev + (status === "New" ? 1 : -1)
      );

      // Refresh accurate counts
      const refresh = await fetch("http://localhost:5000/api/contact", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const refreshedData = await refresh.json();

      if (refresh.ok) {
        setNewMessages(
          refreshedData.data.filter((msg) => msg.status === "New").length
        );
        setRepliedMessages(
          refreshedData.data.filter((msg) => msg.status === "Replied").length
        );
      }
    } else {
      alert(data.message || "Unable to update status.");
    }
  } catch (error) {
    console.error("Update Status Error:", error);
  }
};

const deleteContactMessage = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this message?"
  );

  if (!confirmDelete) return;

  try {
    const token = sessionStorage.getItem("wearwise-token");

    const response = await fetch(
      `http://localhost:5000/api/contact/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (response.ok) {
      const updatedMessages = contactMessages.filter(
        (msg) => msg._id !== id
      );

      setContactMessages(updatedMessages);
      setTotalMessages(updatedMessages.length);
      setNewMessages(
        updatedMessages.filter((msg) => msg.status === "New").length
      );
      setRepliedMessages(
        updatedMessages.filter((msg) => msg.status === "Replied").length
      );
    } else {
      alert(data.message || "Unable to delete message.");
    }
  } catch (error) {
    console.error("Delete Message Error:", error);
  }
};



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


<section className="dashboard-stats">
  <div className="stat-card">
    <p>Total Messages</p>
    <h2>{totalMessages}</h2>
    <span>Customer enquiries</span>
  </div>

  <div className="stat-card">
    <p>New Messages</p>
    <h2>{newMessages}</h2>
    <span>Awaiting attention</span>
  </div>

  <div className="stat-card">
    <p>Replied Messages</p>
    <h2>{repliedMessages}</h2>
    <span>Customer responses</span>
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



<section className="recent-orders-section contact-messages-section">
  <div className="recent-orders-header">
    <div>
      <h2>Customer Messages</h2>
      <p>Manage enquiries received from your customers.</p>
    </div>
  </div>

  {contactMessages.length === 0 ? (
    <p>No contact messages found.</p>
  ) : (
    <div className="recent-orders-table-wrapper">
      <table className="recent-orders-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Subject</th>
            <th>Message</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {contactMessages.map((msg) => (
            <tr key={msg._id}>
              <td>
                <strong>{msg.name}</strong>
                <br />
                {msg.email}
              </td>

              <td>{msg.subject}</td>

              <td>
              {msg.message.length > 50
                ? msg.message.substring(0, 50) + "..."
                : msg.message}

              <button
                className="view-orders-btn"
                onClick={() => setSelectedMessage(msg)}
              >
                View
              </button>
            </td>

              <td>
                {new Date(msg.createdAt).toLocaleDateString("en-IN")}
              </td>

              <td>
                <select
                    className={`message-status-select ${msg.status.toLowerCase()}`}
                    value={msg.status}
                    onChange={(e) =>
                      updateMessageStatus(msg._id, e.target.value)
                    }
                  >
                  <option value="New">New</option>
                  <option value="Read">Read</option>
                  <option value="Replied">Replied</option>
                </select>
              </td>

              <td>
                <button
                  className="view-orders-btn"
                  onClick={() => deleteContactMessage(msg._id)}
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

  {selectedMessage && (
  <div className="message-modal-overlay">
    <div className="message-modal">
      <button
        className="message-modal-close"
        onClick={() => setSelectedMessage(null)}
      >
        ×
      </button>

      <h2>Customer Message</h2>

      <p><strong>Name:</strong> {selectedMessage.name}</p>
      <p><strong>Email:</strong> {selectedMessage.email}</p>
      <p><strong>Subject:</strong> {selectedMessage.subject}</p>
      <p><strong>Date:</strong> {new Date(selectedMessage.createdAt).toLocaleString("en-IN")}</p>
      <p><strong>Status:</strong> {selectedMessage.status}</p>

      <div className="message-full-content">
        <strong>Message:</strong>
        <p>{selectedMessage.message}</p>
      </div>
    </div>
  </div>
)}

</section>

  </>
);
}

export default AdminDashboard;
