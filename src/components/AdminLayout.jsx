
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./AdminLayout.css";

function AdminLayout() {
  return (
    <div className="admin-layout">

      <aside className="admin-sidebar">
        <h2 className="admin-logo">
          WearWise<span>.</span>
        </h2>

        <p className="sidebar-heading">MAIN MENU</p>

        <nav className="admin-nav">
          <NavLink to="/admin" end>Dashboard</NavLink>
          <NavLink to="/admin/products">Products</NavLink>
          <NavLink to="/admin/orders">Orders</NavLink>
          <NavLink to="/admin/customers">Customers</NavLink>
        </nav>

        <div className="sidebar-bottom">
          <p>ADMIN PANEL</p>
          <span>WearWise Management</span>
        </div>
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>

    </div>
  );
}

export default AdminLayout;
