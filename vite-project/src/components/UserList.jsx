import { useEffect, useState } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
import UserForm from "./UserForm";
// import './userlist.css'

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const usersPerPage = 5;

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => setUsers(users.filter((user) => user.id !== id)))
      .catch((error) => console.error("Error deleting user:", error));
  };

  const saveUser = (newUser) => {
    if (isEditing) {
      setUsers(users.map((user) => (user.id === newUser.id ? newUser : user)));
      setIsEditing(false);
    } else {
      setUsers([...users, newUser]);
      setIsAdding(false);
    }
  };

  const handleEdit = (user) => {
    setIsEditing(true);
    setEditingUser(user);
  };

  const handleAddUser = () => {
    setIsAdding(true);
  };

  const cancelForm = () => {
    setIsEditing(false);
    setIsAdding(false);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <div className="container mt-4">
      <h2>User List</h2>
      <button onClick={handleAddUser} className="btn btn-primary mb-3">
        Add User
      </button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th className="ps-4">ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td className="ps-4">{user.id}</td>
              <td>{user.name.split(" ")[0]}</td>
              <td>{user.name.split(" ")[1]}</td>
              <td>{user.email}</td>
              <td>{user.company.name}</td>
              <td>
                <button
                  onClick={() => handleEdit(user)}
                  className="btn btn-secondary btn-sm mx-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-center align-items-center mt-3">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          className="btn btn-secondary mx-4"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className="btn btn-secondary mx-4"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      <div>
        {(isAdding || isEditing) && (
          <UserForm
            isEdit={isEditing}
            userDetails={editingUser}
            saveUser={saveUser}
          />
        )}

        {(isAdding || isEditing) && (
          <button onClick={cancelForm} className="btn btn-danger mt-3 mx-2">
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default UserList;
