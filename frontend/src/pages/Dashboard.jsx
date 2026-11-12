import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const savedUser =
    localStorage.getItem("user") ||
    sessionStorage.getItem("user");

  const user = savedUser ? JSON.parse(savedUser) : null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    navigate("/");
  };

  if (!user || user.role !== "MANAGER") {
    return (
      <div className="access-denied">
        <h2>Access Denied</h2>
        <button onClick={handleLogout}>Back to Login</button>
      </div>
    );
  }

  return (
    <div className="dashboard-container">

      <aside className="sidebar">

        <h2 className="dashboard-logo">
          <span>Pro</span>Hire
        </h2>

        <p className="menu-heading">MAIN MENU</p>

        <button className="menu-item active">
          Dashboard
        </button>

        <button
  className="menu-item"
  onClick={() => navigate("/user-management")}
>
  User Management
</button>

        <button
  className="menu-item"
  onClick={() => navigate("/add-rfh")}
>
  RFH Management
</button>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>

      </aside>

      <main className="dashboard-main">

        <header className="dashboard-header">

          <div>
            <h1>Manager Dashboard</h1>
            <p>Welcome to ProHire Hiring Management System</p>
          </div>

          <div className="admin-profile">

            <div className="profile-circle">
              {(user.fullName || user.name || "M")
                .charAt(0)
                .toUpperCase()}
            </div>

            <div>
              <h4>{user.fullName || user.name}</h4>
              <span>Manager</span>
            </div>

          </div>

        </header>

        <section className="welcome-card">
          <h2>Welcome to ProHire!</h2>
          <p>
            Manage your hiring activities from one place.
          </p>
        </section>

        <section className="dashboard-cards">

          <div className="dashboard-card">
            <h3>Total Users</h3>
            <h1>0</h1>
            <p>Registered users</p>
          </div>

          <div className="dashboard-card">
            <h3>Total RFH</h3>
            <h1>0</h1>
            <p>Hiring requests</p>
          </div>

          <div className="dashboard-card">
            <h3>Pending RFH</h3>
            <h1>0</h1>
            <p>Requests awaiting action</p>
          </div>

          <div className="dashboard-card">
            <h3>Active Users</h3>
            <h1>0</h1>
            <p>Currently active</p>
          </div>

        </section>

      </main>
    </div>
  );
}

export default Dashboard;