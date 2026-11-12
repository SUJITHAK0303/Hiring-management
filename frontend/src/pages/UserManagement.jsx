
import React, { useState, useEffect } from "react";
import "../styles/UserManagement.css";

const API_URL = "http://localhost:8080/api/users";
const TEAM_API_URL = "http://localhost:8080/api/teams";

function UserManagement() {

  const [activeSection, setActiveSection] = useState("users");

  const [showForm, setShowForm] = useState(false);
  const [showTeamForm, setShowTeamForm] = useState(false);

  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [temporaryPassword, setTemporaryPassword] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    role: "",
    teamId: "",
    status: "ACTIVE"
  });

  const [teamForm, setTeamForm] = useState({
    teamName: "",
    description: ""
  });

  // Generate Employee ID
  const nextEmployeeId = () => {
    const numbers = users
      .map(user => Number(user.employeeId?.replace("PH", "")))
      .filter(number => !isNaN(number));

    const nextNumber = numbers.length > 0
      ? Math.max(...numbers) + 1
      : 1001;

    return `PH${nextNumber}`;
  };

  // Fetch Employees
  const loadUsers = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Unable to fetch employees");
      }

      const data = await response.json();
      setUsers(data);

    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch Active Teams
  const loadTeams = async () => {
    try {
      const response = await fetch(TEAM_API_URL);

      if (!response.ok) {
        throw new Error("Unable to fetch teams");
      }

      const data = await response.json();
      setTeams(data.filter(team => team.status === "ACTIVE"));

    } catch (err) {
      setError(err.message);
    }
  };

  // Load Employees when page opens
  useEffect(() => {
    loadUsers();
  }, []);

  // Open Add User Form
  const handleAddUser = () => {
    setActiveSection("users");
    setShowForm(true);
    setShowTeamForm(false);
    setMessage("");
    setError("");
    setTemporaryPassword("");
    setFormData(previous => ({ ...previous, teamId: "" }));
    loadTeams();
  };

  // Handle Employee Inputs
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData(previous => ({
      ...previous,
      [name]: value
    }));
  };

  // Create Employee
  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    const employee = {
      employeeId: nextEmployeeId(),
      ...formData,
      teamId: Number(formData.teamId)
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(employee)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Employee creation failed");
      }

      const data = await response.json();

      setMessage("Employee created successfully!");
      setTemporaryPassword(data.temporaryPassword || "");

      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        role: "",
        teamId: "",
        status: "ACTIVE"
      });

      setShowForm(false);

      await loadUsers();

    } catch (err) {
      setError(err.message);
    }
  };

  // Open Teams Section
  const handleTeamsClick = () => {
    setActiveSection("teams");
    setShowForm(false);
    setShowTeamForm(false);
    setMessage("");
    setError("");
    setTemporaryPassword("");
    loadTeams();
  };

  // Handle Team Inputs
  const handleTeamInputChange = (event) => {
    const { name, value } = event.target;

    setTeamForm(previous => ({
      ...previous,
      [name]: value
    }));
  };

  // Create Team
  const handleCreateTeam = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    try {
      const response = await fetch(TEAM_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(teamForm)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Team creation failed");
      }

      setMessage("Team created successfully!");

      setTeamForm({
        teamName: "",
        description: ""
      });

      setShowTeamForm(false);

      await loadTeams();

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="user-management-container">

      {/* Header */}

      <header className="user-management-header">
        <div>
          <h1>User Management</h1>
          <p>Manage company employees and their access.</p>
        </div>
      </header>

      {/* Management Buttons */}

      <div className="management-buttons">

        <button
          className={
            activeSection === "users"
              ? "management-btn active"
              : "management-btn"
          }
          onClick={handleAddUser}
        >
          + Add Users
        </button>

        <button
          className={
            activeSection === "teams"
              ? "management-btn active"
              : "management-btn"
          }
          onClick={handleTeamsClick}
        >
          Teams
        </button>

        <button
          className={
            activeSection === "designations"
              ? "management-btn active"
              : "management-btn"
          }
          onClick={() => {
            setActiveSection("designations");
            setShowForm(false);
            setShowTeamForm(false);
            setMessage("");
            setError("");
            setTemporaryPassword("");
          }}
        >
          Designation
        </button>

      </div>

      {/* Success and Error Messages */}

      {message && (
        <p className="success-message">{message}</p>
      )}

      {temporaryPassword && (
        <section className="temporary-password-box">
          <h3>Employee Created Successfully!</h3>
          <p>Share this temporary password securely with the employee.</p>

          <div className="temporary-password-value">
            <strong>{temporaryPassword}</strong>

            <button
              type="button"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(temporaryPassword);
                  setMessage("Temporary password copied!");
                } catch (err) {
                  setError("Unable to copy password. Please copy it manually.");
                }
              }}
            >
              Copy Password
            </button>
          </div>

          <p className="temporary-password-note">
            This password is shown only now. Make sure you share it with the employee.
          </p>
        </section>
      )}

      {error && (
        <p className="error-message">{error}</p>
      )}

      {/* Add Employee Form */}

      {activeSection === "users" && showForm && (

        <section className="add-user-section">

          <h2>Add New Employee</h2>
          <p>Enter employee details to create an account.</p>

          <form
            className="add-user-form"
            onSubmit={handleSubmit}
          >

            <div className="form-grid">

              <div className="form-group">
                <label>Employee ID</label>
                <input
                  type="text"
                  value={nextEmployeeId()}
                  disabled
                />
              </div>

              <div className="form-group">
                <label>Employee Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter employee name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                  required
                />
              </div>

              <div className="form-group">
                <label>Role *</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="MANAGER">Manager</option>
                  <option value="HR">HR</option>
                  <option value="RECRUITER">Recruiter</option>
                  <option value="INTERVIEWER">Interviewer</option>
                  <option value="EMPLOYEE">Employee</option>
                </select>
              </div>

              <div className="form-group">
                <label>Team *</label>
                <select
                  name="teamId"
                  value={formData.teamId}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Team</option>

                  {teams.map(team => (
                    <option key={team.id} value={team.id}>
                      {team.teamName}
                    </option>
                  ))}
                </select>

                {teams.length === 0 && (
                  <small>
                    No active teams found. Create a team in the Teams section first.
                  </small>
                )}
              </div>

              <div className="form-group">
                <label>Designation</label>
                <select disabled>
                  <option>
                    Designations will be available after setup
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              </div>

            </div>

            <div className="form-actions">

              <button
                type="button"
                className="cancel-btn"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="save-user-btn"
              >
                Create Employee
              </button>

            </div>

          </form>

        </section>
      )}

      {/* User List */}

      {activeSection === "users" && (

        <section className="user-list-section">

          <div className="user-list-header">
            <div>
              <h2>User List</h2>
              <p>All registered company employees.</p>
            </div>
          </div>

          {users.length === 0 ? (

            <div className="empty-user-list">
              <h3>No Employees Found</h3>
              <p>
                Click Add Users to create your first employee account.
              </p>
            </div>

          ) : (

            <div className="user-table-container">

              <table className="user-table">

                <thead>
                  <tr>
                    <th>Employee ID</th>
                    <th>Employee Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Team</th>
                    <th>Role</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.employeeId}</td>
                      <td>{user.fullName}</td>
                      <td>{user.email}</td>
                      <td>{user.phoneNumber}</td>
                      <td>{user.team?.teamName || "-"}</td>
                      <td>{user.role}</td>
                      <td>{user.status}</td>
                    </tr>
                  ))}
                </tbody>

              </table>

            </div>

          )}

        </section>
      )}

      {/* Team Management */}

      {activeSection === "teams" && (

        <section className="placeholder-section">

          <div className="team-header">
            <div>
              <h2>Team Management</h2>
              <p>Create and manage company teams.</p>
            </div>

            <button
              className="save-user-btn"
              onClick={() => {
                setShowTeamForm(!showTeamForm);
                setMessage("");
                setError("");
              }}
            >
              {showTeamForm ? "Cancel" : "+ Create Team"}
            </button>
          </div>

          {/* Create Team Form */}

          {showTeamForm && (

            <form
              className="add-user-form team-form"
              onSubmit={handleCreateTeam}
            >

              <div className="form-group">
                <label>Team Name *</label>
                <input
                  type="text"
                  name="teamName"
                  value={teamForm.teamName}
                  onChange={handleTeamInputChange}
                  placeholder="Enter team name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={teamForm.description}
                  onChange={handleTeamInputChange}
                  placeholder="Enter team description"
                  rows="3"
                />
              </div>

              <button
                type="submit"
                className="save-user-btn"
              >
                Save Team
              </button>

            </form>
          )}

          {/* Team List */}

          <div className="team-list">
            <h3>Team List</h3>

            {teams.length === 0 ? (

              <div className="empty-user-list">
                <p>No Teams Found</p>
                <p>Create your first company team.</p>
              </div>

            ) : (

              <div className="user-table-container">

                <table className="user-table">

                  <thead>
                    <tr>
                      <th>Team ID</th>
                      <th>Team Name</th>
                      <th>Description</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {teams.map(team => (
                      <tr key={team.id}>
                        <td>{team.id}</td>
                        <td>{team.teamName}</td>
                        <td>{team.description || "-"}</td>
                        <td>{team.status}</td>
                      </tr>
                    ))}
                  </tbody>

                </table>

              </div>

            )}
          </div>

        </section>
      )}

      {/* Designation Management */}

      {activeSection === "designations" && (

        <section className="placeholder-section">
          <h2>Designation Management</h2>
          <p>
            We will implement Create, Edit and Manage Designations here.
          </p>
        </section>
      )}

    </div>
  );
}

export default UserManagement;
