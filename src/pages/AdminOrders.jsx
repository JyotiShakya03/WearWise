import React, { useState, useEffect } from "react";
import "./AdminOrders.css";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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
          setOrders(data.orders);
        } else {
          console.error("Orders API Error:", data.message);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
  try {
    const token = sessionStorage.getItem("wearwise-token");

    const response = await fetch(
      `http://localhost:5000/api/orders/${orderId}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderStatus: newStatus,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
       console.log("UPDATED ORDER FROM DATABASE:", data.order);

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? { ...order, orderStatus: newStatus }
            : order
        )
      );

      alert("Order status updated successfully!");
    } else {
      alert(data.message || "Failed to update order status.");
    }
  } catch (error) {
    console.error("Status update error:", error);
    alert("Something went wrong while updating status.");
  }
};

  return (
  <div className="orders-page">
    <div className="orders-header">
      <div>
        <h1>Orders Management</h1>
        <p>View and manage all customer orders.</p>
      </div>

      <div className="orders-count">
        Total Orders: {orders.length}
      </div>
    </div>

    {loading ? (
      <p>Loading orders...</p>
    ) : orders.length === 0 ? (
      <p>No orders found.</p>
    ) : (
      <div className="orders-table-wrapper">
        <table className="orders-table">
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
            {orders.map((order) => (
              <tr key={order._id}>
                <td>#{order._id.slice(-6)}</td>

                <td>
                  {order.userId?.name || "Customer"}
                </td>

                <td>₹{order.totalAmount}</td>

                <td>
                  <select
                    value={order.orderStatus}
                    onChange={(e) =>
                      updateOrderStatus(order._id, e.target.value)
                    }
                  >
                    {order.orderStatus === "Placed" && (
                      <option value="Placed" disabled>
                        Placed
                      </option>
                    )}

                    {order.orderStatus === "Processing" && (
                      <option value="Processing" disabled>
                        Processing
                      </option>
                    )}

                    {order.orderStatus === "Shipped" && (
                      <option value="Shipped" disabled>
                        Shipped
                      </option>
                    )}

                    {order.orderStatus === "Delivered" && (
                      <option value="Delivered" disabled>
                        Delivered
                      </option>
                    )}

                    <option value="Processing" disabled={order.orderStatus !== "Placed"}>
                      Processing
                    </option>

                    <option value="Shipped" disabled={order.orderStatus !== "Processing"}>
                      Shipped
                    </option>

                    <option value="Delivered" disabled={order.orderStatus !== "Shipped"}>
                      Delivered
                    </option>
                    <option
                      value="Cancelled"
                      disabled={!["Placed", "Processing"].includes(order.orderStatus)}
                    >
                      Cancelled
                    </option>
                  </select>
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
  </div>
);

}

export default AdminOrders;