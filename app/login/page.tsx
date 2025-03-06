/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"; 

import { useState } from "react";
import { useAuth } from "../auth/AuthContext";


const Login = () => {
    const authContext = useAuth();
    if (!authContext) {
        return <div>Error: Auth context is not available</div>;
    }
    const { login } = authContext;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const handleSubmit = (e:any) => {
      e.preventDefault();
      login(email, password);
    };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden">
    <div className="w-full p-6 bg-linear-[180deg,#121212_5%,#000_60%,#000_90%,#000] border-2 border-blue-600 rounded-md shadow-md border-top lg:max-w-md">
        <h1 className="text-3xl font-semibold text-center text-white">
            Login
        </h1>
        <form className="space-y-4 text-[#000]" onSubmit={handleSubmit}>
            <div>
                <label className="label">
                    <span className="text-[#fff] text-sm label-text">Email</span>
                </label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email Address" className="w-full input input-bordered" />
            </div>
            <div>
                <label className="label">
                    <span className="text-[#fff] text-sm label-text">Password</span>
                </label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter Password" className="w-full input input-bordered" />
            </div>
            <a href="#" className="text-xs text-[#fff] hover:text-blue-600">Forget Password?</a>
            <div className="mt-2">
                <button className="btn shadow-none bg-[#67696b] text-[#fff] hover:bg-blue-600 hover:text-[#fff] rounded-lg border-0  btn-soft btn-block btn-info">Login</button>
            </div>
        </form>
    </div>
</div>
  );
};

export default Login;
