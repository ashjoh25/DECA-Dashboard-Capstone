import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UnapprovedParticipants.css";
import Header from "../../components/Header/Header";
import Menu from "../../components/Menu/Menu";

export default function UnapprovedParticipants({ userRole }) {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState({});
  const [selectedRole, setSelectedRole] = useState(""); // Stores the selected role
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/participantdetails/displayunapprovedusers"
        );
        setUsers(Array.isArray(response.data) ? response.data : []);
<<<<<<< HEAD
=======
        setError(null); // Clear any previous errors
>>>>>>> ccf33a0317affe2740c217ec32d58adb1167cd14
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users.");
      }
    };

    fetchUsers();
  }, []);

  const handleSelection = (userId) => {
    setSelectedUsers((prev) => ({
      ...prev,
      [userId]: !prev[userId], // Toggle selection
    }));
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const updateUserRole = async () => {
    const selectedIds = Object.keys(selectedUsers).filter((id) => selectedUsers[id]);

    if (selectedIds.length === 0) {
      alert("Please select at least one user.");
      return;
    }

    if (!selectedRole) {
      alert("Please select a role.");
      return;
    }

    try {
      await axios.put("http://localhost:8081/participantdetails/updateusers", {
        userIds: selectedIds,
        position: selectedRole,
      });

      // Update UI with new role
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          selectedIds.includes(user.user_id.toString()) ? { ...user, position: selectedRole } : user
        )
      );

      setSelectedUsers({});
      alert("User roles updated successfully!");
    } catch (error) {
      console.error("Error updating users:", error);
      alert("Failed to update users.");
    }
  };

<<<<<<< HEAD
=======
  const deleteRequest = async () => {
    const selectedIds = Object.keys(selectedUsers).filter((id) => selectedUsers[id]);

    if (selectedIds.length === 0) {
      alert("Please select at least one user.");
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${selectedIds.length} selected user(s)? This action cannot be undone.`
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete("http://localhost:8081/participantdetails/deleteusers", {
        data: { userIds: selectedIds },
      });

      // Remove deleted users from the UI
      setUsers((prevUsers) => prevUsers.filter((user) => !selectedIds.includes(user.user_id.toString())));
      setSelectedUsers({});
      alert("Users deleted successfully!");
    } catch (error) {
      console.error("Error deleting users:", error);
      alert("Failed to delete users.");
    }
  }

>>>>>>> ccf33a0317affe2740c217ec32d58adb1167cd14
  return (
    <>
      <Header />
      <Menu />

      <h1 id="partheader">Unapproved Participants</h1>
      <div className="approvals">
<<<<<<< HEAD
        {error ? <p>{error}</p> : null}
        {users.length === 0 ? <p>Loading users...</p> : null}
=======
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!error && users.length === 0 ? <p>No unapproved participants found.</p> : null}
>>>>>>> ccf33a0317affe2740c217ec32d58adb1167cd14

        {users.map((user) => (
          <div className="userselection" key={user.user_id}>
            <input
              type="checkbox"
              checked={!!selectedUsers[user.user_id]}
              onChange={() => handleSelection(user.user_id)}
            />
            <label>{user.first_name} {user.last_name}</label>
          </div>
        ))}

<<<<<<< HEAD
        <div className="roleselection">
          <label>Select Role: </label>
          <select class="roleselect" value={selectedRole} onChange={handleRoleChange}>
            <option id="pickrole" value="">--Select Role--</option>
            <option value="Admin">Admin</option>
            <option value="Participant">Participant</option>
            <option value="Board Member">Board Member</option>
            <option value={null}>No Role</option>
          </select>
          <button id="updatebtn" onClick={updateUserRole}>Update Role</button>
        </div>
=======
        {users.length > 0 && (
          <div className="roleselection">
            <label>Select Role: </label>
            <select className="roleselect" value={selectedRole} onChange={handleRoleChange}>
              <option id="pickrole" value="">--Select Role--</option>
              <option value="Admin">Admin</option>
              <option value="Participant">Participant</option>
              <option value="Board Member">Board Member</option>
              <option value={null}>No Role</option>
            </select>
            <button id="updatebtn" onClick={updateUserRole}>Update Role</button>
            <button id="deletebtn" onClick={deleteRequest}>Delete Request</button>
          </div>
        )}
>>>>>>> ccf33a0317affe2740c217ec32d58adb1167cd14
      </div>
    </>
  );
}
