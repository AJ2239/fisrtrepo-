import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";


//  Yup schema for signup
const customEmailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const signupSchema = yup.object().shape({
  fname: yup.string().required("First Name is required"),
  lname: yup.string().required("Last Name is required"),
  email: yup.string().matches(customEmailRegex, 'Please enter a valid email format')
        .required('Email is required'),
    
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "At least one uppercase letter is required")
  .matches(/[a-z]/, "At least one lowercase letter is required")
  .matches(/[0-9]/, "At least one number is required")
  .matches(/[^A-Za-z0-9]/, "At least one special character is required")
    .required("Password is required"),
    cpassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});

function Register() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({resolver: yupResolver(signupSchema),});

    // const onSubmit = (data) => {
    //     const existingUser = JSON.parse(localStorage.getItem(data.email));
    //     if (existingUser) {
    //         alert("Email is already registered!");
    //     } else {
    //         const userData = {
    //             fname: data.fname,
    //             lname:data.lname,
    //             email: data.email,
    //             password: data.password,
    //             cpassword: data.cpassword,
    //         };
    //         localStorage.setItem(data.email, JSON.stringify(userData));
    //         localStorage.setItem("loggedinname",data.fname, JSON.stringify(userData));
    //         localStorage.setItem("loggedinname",data.lname, JSON.stringify(userData));
    //         alert(data.fname + data.lname + " has been successfully registered");
    //     localStorage.setItem("isLoggedIn", true);
    //       navigate("/home");
    //     }
    // };
  
    // 
   

   const onSubmit = async (data) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    const user = userCredential.user;

    // Store user data in Firestore
    await setDoc(doc(db, "users", user.uid), {
      fname: data.fname,
      lname: data.lname,
      email: data.email,
    });

    // Store UID locally (optional)
    localStorage.setItem("uid", user.uid);
    localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("loggedInEmail", data.email);
      
    // Navigate to home after successful signup and Firestore write
    navigate("/home");
  } catch (error) {
    alert("Signup failed: " + error.message);
  }
};


   
   
    return (
        <>
            <h2 className="text-center font-bold text-2xl pb-6 text-blue-500">
                Signup
            </h2>

            <form className="App" onSubmit={handleSubmit(onSubmit)}>
               
                <p className="font-bold mb-2">First Name</p>
                <input
                    className="w-full rounded-md bg-gray-200 p-2"
                    type="text"
                    {...register("fname", { required: true })}
                    placeholder="Your First Name"
                />
                {errors.fname && (
                    <span className="text-red-500 block mb-2">{errors.fname.message}</span>
                )}
                <p className="font-bold mb-2">Last Name</p>
                <input
                    className="w-full rounded-md bg-gray-200 p-2"
                    type="text"
                    {...register("lname", { required: true })}
                    placeholder="Your Last Name"
                />
                {errors.lname && (
                    <span className="text-red-500 block mb-2">{errors.lname.message}</span>
                )}

                <p className="font-bold mt-2 mb-2">Email</p>
                <input
                    className="w-full rounded-md bg-gray-200 p-2"
                    type="email"
                    {...register("email", { required: true })}
                    placeholder="username@gmail.com"
                />
                {errors.email && (
                    <span className="text-red-500 block mb-2">{errors.email.message}</span>
                )}

                {/* Password */}
                <p className="font-bold mt-2 mb-2">Password</p>
                <input
                    className="w-full rounded-md bg-gray-200 p-2"
                    type="password"
                    {...register("password", { required: true })}
                    placeholder="Password"
                />
                {errors.password && (
                    <span className="text-red-500 block mb-2">{errors.password.message}</span>
                )}
                {/* confim password */}
                 <p className="font-bold mt-2 mb-2">Confirm Password</p>
                <input
                    className="w-full rounded-md bg-gray-200 p-2"
                    type="password"
                    {...register("cpassword", { required: true })}
                    placeholder="Confirm Password"
                />
                {errors.cpassword && (
                    <span className="text-red-500 block mb-2">{errors.cpassword.message}</span>
                )}

                <button
                   
                    className="bg-blue-400 p-1 rounded-md w-full text-white mt-5"
                >
                    Signup
                </button>
            </form>
        </>
    );
}

export default Register;
