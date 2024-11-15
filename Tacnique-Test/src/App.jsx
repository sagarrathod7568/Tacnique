// import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddUserPage from "./pages/AddUserPage";
import EditUserPage from "./pages/EditUserPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddUserPage />} />
        <Route path="/edit/:id" element={<EditUserPage />} />
      </Routes>
    </Router>
  );
};

export default App;
