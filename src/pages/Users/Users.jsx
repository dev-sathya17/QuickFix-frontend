import { useState, useEffect } from "react";
import "./Users.css";
import { useLoaderData } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import userServices from "../../services/user.service";
import { useDispatch } from "react-redux";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../../features/user/userSlice";
import BACKEND_URL from "../../utils/config";

const Users = () => {
  const { data } = useLoaderData();
  const [users, setUsers] = useState(data);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(data);
  const [editingUser, setEditingUser] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const results = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
  }, [searchTerm, users]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = (user) => {
    const choice = confirm(`Are you sure you want to delete ${user.name}?`);
    if (choice) {
      dispatch(deleteUserStart());
      userServices
        .deleteUser(user._id)
        .then((response) => {
          if (response.status === 200) {
            alert(response.data.message);
            dispatch(deleteUserSuccess());
            setUsers(users.filter((user) => user._id !== user._id));
          } else {
            alert(response);
            dispatch(deleteUserFailure(response));
          }
        })
        .catch((error) => {
          console.error(error);
          dispatch(deleteUserFailure(error.message));
          alert(error.message);
        });
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setModalOpen(true);
  };

  const handleFormChange = (e) => {
    setEditingUser({
      ...editingUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    dispatch(updateUserStart());
    userServices
      .updateUser(editingUser._id, editingUser)
      .then((response) => {
        if (response.status === 200) {
          alert(response.data.message);
          setEditingUser(null);
          setUsers(
            users.map((user) =>
              user._id === editingUser._id ? editingUser : user
            )
          );
          setModalOpen(false);
          dispatchEvent(updateUserSuccess(response.data.updatedUser));
        } else {
          alert(response);
          dispatchEvent(updateUserFailure(response));
        }
      })
      .catch((err) => {
        dispatch(updateUserFailure(err.message));
        console.error(err);
      });
  };

  return (
    <>
      <Navbar active={"users"} role={"admin"} />
      <div className="users-page">
        <h1>User List</h1>

        <input
          type="text"
          className="search-bar"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={handleSearch}
        />

        <div className="user-cards">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <div key={index} className="user-card">
                <img
                  src={`${BACKEND_URL}/${user.image.replace("\\", "/")}`}
                  alt={user.name}
                  className="user-image"
                />
                <h2>{user.name}</h2>
                <p>Email: {user.email}</p>
                <p>Role: {user.role}</p>
                <p>Mobile: {user.mobile}</p>

                <div className="user-actions">
                  <button className="edit-btn" onClick={() => handleEdit(user)}>
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(user)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No users found.</p>
          )}
        </div>

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Edit User</h2>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={editingUser.name}
                  onChange={handleFormChange}
                />
              </label>
              <label>
                Email:
                <input
                  type="text"
                  name="email"
                  value={editingUser.email}
                  onChange={handleFormChange}
                />
              </label>
              <label>
                Mobile:
                <input
                  type="text"
                  name="mobile"
                  value={editingUser.mobile}
                  onChange={handleFormChange}
                />
              </label>
              <div className="modal-actions">
                <button className="save-btn" onClick={handleSave}>
                  Save
                </button>
                <button
                  className="close-btn"
                  onClick={() => setModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Users;
