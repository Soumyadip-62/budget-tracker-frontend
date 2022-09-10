/* eslint-disable react-hooks/rules-of-hooks */
import Link from 'next/link';
import React, { useState } from 'react'
import Authlayout from '../../layout/Authlayout';
import history from "next/router";
import { toast } from "react-toastify";
import UseApi from '../../Hooks/UseApi';
import Cookies from 'js-cookie';
import { LogIn } from 'react-feather';
const login = () => {

  const {usePost} =UseApi()
  const [user, setuser] = useState({
    email: "",
    password: "",
  });

   const handleChange = (e) => {
    setuser({
      ...user,
      [e.target.id]: e.target.value,
    });
  };
  function validate(next) {
    !user.email.includes("@") && toast.warn("Enter a valid email!");
    !user.password.length > 5 ||
      (!user.password && toast.warn("Password Must be of 6 or more characteres"));
    const valid =
      user.email.includes("@") &&
      
      user.password.length > 5;
    // console.log(valid);
    if (valid) {
      next();
    }
  }

  const handleSubmit =async()=>{
    const {status,data} = await usePost('user/login', user)
    if (status===200) {
      localStorage.setItem('user',JSON.stringify( data.user))
      Cookies.set("tkn", data.token, { expires: 7 });
      history.push('/')
      toast.success("Login Successful!")
    }
    else{
      console.log();
      toast.error(data.error)
    }
    
  }
  return (
    <form className="shadow-lg rounded px-8 pt-6 pb-8 mb-4 bg-background">
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => handleChange(e)}
          placeholder="Email"
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => handleChange(e)}
          placeholder="Password"
        />
        {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
      </div>
      <button
        className="bg-primary flex justify-center gap-2 hover:bg-hover duration-300 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={()=>validate(handleSubmit)}
      >
       Log In <LogIn/>
      </button>
      <div className="grid grid-cols-1 text-center my-4">
        <Link href="/auth/forgotPassword">
          <a className="inline-block align-baseline font-bold text-sm text-primary hover:text-hover">
            Forgot Password?
          </a>
        </Link>
        <Link href="/auth/register">
          <a className="inline-block align-baseline font-bold text-sm text-hover hover:text-primary my-2">
            Create New Account
          </a>
        </Link>
      </div>
    </form>
  );
}

login.getLayout = function getLayout(page) {
  return <Authlayout title="Login">{page}</Authlayout>;
};
export default login