import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

//  Yup schema for login
const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }, 
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  // const onSubmit = (data) => {
  //   const userData = JSON.parse(localStorage.getItem(data.email));
    
  //   if (userData) {
  //     if (userData.password === data.password) {
  //       // alert(userData.fname + userData.lname + " you are successfully logged in!");
  //       localStorage.setItem("isLoggedIn", true);
  //       localStorage.setItem("loggedInEmail", data.email);
  //        localStorage.setItem("loggedinname", `${userData.fname} ${userData.lname}`);
  //       reset();
  //       navigate("/home");
  //     } else {
  //       alert("Password is incorrect!");
  //     }
  //   } else {
  //     alert("Email or Password is incorrect!");
  //   }
  // };
    
  const onSubmit = async (data) => {
    try {
     const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
const user = userCredential.user; //  define user here
localStorage.setItem("uid", user.uid); 
      
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("loggedInEmail", data.email);
      //  localStorage.setItem("loggedinname", data.fname + " " + data.lname);
       
      // alert("Login successful!");

      reset();
      navigate("/home");
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };
 
 
  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-500">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
        
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
        >
          Login
        </button>
      </form>
    </>
  );
}

export default Login;
