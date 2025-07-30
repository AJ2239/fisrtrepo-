// src/components/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import pic from "./homebackground.jpg"

const Home = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-100 h-screen bg-cover"
    style={{ backgroundImage: `url(${pic})` }}>
        <div className="ml-80">
      <h1 className="text-3xl font-bold mb-4 text-green-700 ml-20">Hello User!</h1>
      <h2 className="text-3xl font-bold mb-4 text-green-700">Welcome to the Home Page</h2>
      <p className="text-green-600 mb-5">This is the test homepage for protecting routes </p>
      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-100 ml-20 align-center"
      >
        Logout
      </button>
      </div>
    </div>
  );
};

export default Home;
