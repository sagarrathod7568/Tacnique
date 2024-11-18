import { useState, useEffect } from "react";

const UserForm = ({ isEdit, userDetails, saveUser }) => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  const [errors, setErrors] = useState({}); 

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

  const validateForm = () => {
    let formErrors = {};
    if (!user.firstName) formErrors.firstName = "First Name is required";
    if (!user.lastName) formErrors.lastName = "Last Name is required";
    if (!user.email) formErrors.email = "Email is required";
    if (!user.department) formErrors.department = "Department is required";
    return formErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors); 
    } else {
      saveUser({
        id: isEdit ? userDetails.id : Date.now(),
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        company: { name: user.department },
      });
    }
  };

  return (
    <div className="container mt-4">
      <h2>{isEdit ? "Edit User" : "Add User"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
            required
          />
          {errors.firstName && (
            <div className="invalid-feedback">{errors.firstName}</div>
          )}
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
            required
          />
          {errors.lastName && (
            <div className="invalid-feedback">{errors.lastName}</div>
          )}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>

        <div className="form-group">
          <label>Department</label>
          <input
            type="text"
            className={`form-control ${errors.department ? "is-invalid" : ""}`}
            name="department"
            value={user.department}
            onChange={handleChange}
            required
          />
          {errors.department && (
            <div className="invalid-feedback">{errors.department}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          {isEdit ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
