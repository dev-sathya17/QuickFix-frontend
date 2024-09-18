import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import userServices from "../../services/user.service";
import { useDispatch } from "react-redux";
import "./Employees.css";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../../features/user/userSlice";
import BACKEND_URL from "../../utils/config";
const Employees = () => {
  const { data } = useLoaderData();
  const [users, setUsers] = useState(data);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(data);
  const [editingUser, setEditingUser] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    role: "employee",
    password: "",
  });
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
            const filteredUsers = users.filter((item) => item._id !== user._id);
            setUsers(filteredUsers);
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

  const handleAddFormChange = (e) => {
    setFormData({
      ...formData,
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

  const handleAdd = () => {
    userServices
      .register(formData)
      .then((response) => {
        alert(response.data.message);
        if (response.status === 201) {
          setUsers([...users, response.data.user]);
          setFormData({
            name: "",
            email: "",
            mobile: "",
            role: "employee",
            password: "",
          });
          setAddModalOpen(false);
        }
      })
      .catch((error) => {
        console.log(error.response);
        alert(error.response.data.message);
      });
  };

  return (
    <>
      <Navbar active={"employees"} role={"admin"} />
      <div className="users-page">
        <h1>Employees List</h1>
        <div className="emp-header">
          <button
            className="edit-btn emp-add-btn"
            onClick={() => setAddModalOpen(true)}
          >
            Add
          </button>
          <input
            type="text"
            className="emp-search-bar"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

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
            <p>No employees found.</p>
          )}
        </div>

        {isAddModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Add Employee</h2>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleAddFormChange}
                />
              </label>
              <label>
                Email:
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleAddFormChange}
                />
              </label>
              <label>
                Mobile:
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleAddFormChange}
                />
              </label>
              <label>
                Password:
                <input
                  type="text"
                  name="password"
                  value={formData.password}
                  onChange={handleAddFormChange}
                />
              </label>
              <div className="modal-actions">
                <button className="save-btn" onClick={handleAdd}>
                  Add
                </button>
                <button
                  className="close-btn"
                  onClick={() => setAddModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Edit Employee</h2>
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

export default Employees;
