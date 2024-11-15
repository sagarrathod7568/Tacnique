import  { useState, useEffect } from "react";

const UserForm = ({ isEdit, userDetails, saveUser }) => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  useEffect(() => {
    if (isEdit && userDetails) {
      const [firstName, lastName] = userDetails.name.split(" ");
      setUser({
        firstName,
        lastName,
        email: userDetails.email,
        department: userDetails.company.name,
      });
    }
  }, [isEdit, userDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveUser({
      id: isEdit ? userDetails.id : Date.now(), 
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      company: { name: user.department },
    });
  };

  return (
    <div className="container mt-4">
      <h2>{isEdit ? "Edit User" : "Add User"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Department</label>
          <input
            type="text"
            className="form-control"
            name="department"
            value={user.department}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          {isEdit ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
