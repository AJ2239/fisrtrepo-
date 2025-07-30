import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/signup";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import logo from "./user.png";
import Student from "./components/student";


function App() {
  const [showLogin, setShowLogin] = useState(true); // default = signup

  return (
    
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
     
   <div className="min-h-screen flex flex-col items-center justify-center bg-green-100 p-4">
              <h1 className="text-4xl text-center font-bold mb-10 mr-12 flex">
                <img src={logo} className="size-12" alt="user" /> User
              </h1>
              <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                {showLogin ? <Login /> : <Register />}

                <p className="text-center mt-6 text-sm">
                  {showLogin ? "Don’t have an account?" : "Already have an account?"}
                  <button
                    onClick={() => setShowLogin(!showLogin)}
                    className="text-blue-500 font-medium hover:underline ml-2"
                  >
                    {showLogin ? "Signup" : "Login"}
                  </button>
                </p>
              </div>
            </div>
          }
        />

        {/* Protected Route Example */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
               <Student />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;