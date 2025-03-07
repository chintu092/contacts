/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"; 

import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";


const Signup = () => {
    const authContext = useAuth();
    if (!authContext) {
        return <div>Error: Auth context is not available</div>;
    }
    const { signup, loading, error } = authContext;
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ email?: string; name?: string; username?: string; password?: string }>({});
  
    const handleSubmit = (e:any) => {
      e.preventDefault();
      const newErrors: { email?: string; name?: string; username?: string; password?: string } = {};

      if (!name) {
        newErrors.name = 'Name is required';
      }
      if (!username) {
        newErrors.username = 'Username is required';
      }

      if (!email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = 'Email address is invalid';
      }
  
      if (!password) {
        newErrors.password = 'Password is required';
      } else if (password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters long';
      }

      if (Object.keys(newErrors).length > 0) {
        console.log(newErrors);
        setErrors(newErrors);
        return; // Don't proceed with the login if there are errors
      }
      
      signup(name,username,email, password);
    };

    const router = useRouter();

    useEffect(() => {
      const token = Cookies.get("usercookie");
  
      if (token) {
        router.replace("/");
      }
    }, []);


  return (
    <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden">
    <div className="w-full p-6 bg-linear-[180deg,#121212_5%,#000_60%,#000_90%,#000] border-2 border-blue-600 rounded-md shadow-md border-top lg:max-w-md">
        <h1 className="text-3xl font-semibold text-center text-white">
        Signup
        </h1>
        <form className="space-y-4 text-[#000]" onSubmit={handleSubmit}>
        <div>
                <label className="label">
                    <span className="text-[#fff] text-sm label-text">Name</span>
                </label>
                <input  
                value={name} 
                onChange={(e) => {setName(e.target.value); setErrors((prevErrors) => ({ ...prevErrors, name: '' }));}} 
                type="text" 
                placeholder="Name" 
                className="w-full input input-bordered" />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            <div>
                <label className="label">
                    <span className="text-[#fff] text-sm label-text">Username</span>
                </label>
                <input 
                value={username} 
                onChange={(e) => {setUsername(e.target.value); setErrors((prevErrors) => ({ ...prevErrors, username: '' }));}} 
                type="text" 
                placeholder="Username" 
                className="w-full input input-bordered" />
                {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
            </div>
            <div>
                <label className="label">
                    <span className="text-[#fff] text-sm label-text">Email</span>
                </label>
                <input 
                value={email} 
                onChange={(e) => {setEmail(e.target.value); setErrors((prevErrors) => ({ ...prevErrors, email: '' }));}} 
                type="email" 
                placeholder="Email Address" 
                className="w-full input input-bordered" />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div>
                <label className="label">
                    <span className="text-[#fff] text-sm label-text">Password</span>
                </label>
                <input 
                value={password} 
                onChange={(e) => {setPassword(e.target.value); setErrors((prevErrors) => ({ ...prevErrors, password: '' }));}} 
                type="password" 
                placeholder="Enter Password" 
                className="w-full input input-bordered" />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
            <div className="text-xs text-[#fff] text-right">Already Have an account? <Link href="/login" className="text-blue-600">Login Here</Link></div>
            <div className="mt-2">
                <button className="btn shadow-none bg-[#67696b] text-[#fff] hover:bg-blue-600 hover:text-[#fff] rounded-lg border-0  btn-soft btn-block btn-info">Signup Now</button>
            </div>
        </form>
        {loading &&
        <div role="alert" className="alert alert-success mt-2 alert-dash">
        <span className="loading loading-spinner loading-xs"></span> <span>Account Creation in progress....</span>
         </div>
         }
         {
            error &&
            <div role="alert" className="alert alert-error mt-2 alert-dash">
              <span>{error}</span>
         </div>
         }
    </div>
</div>
  );
};

export default Signup;