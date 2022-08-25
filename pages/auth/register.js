/* eslint-disable react-hooks/rules-of-hooks */
import Link from "next/link";
import React, { useState } from "react";
import UseApi from "../../Hooks/UseApi";
import Authlayout from "../../layout/Authlayout";
import history from "next/router";
import { toast } from "react-toastify";

const register = () => {
  const { usePost } = UseApi();
  const [user, setuser] = useState({
    uname: "",
    fname: "",
    email: "",
    pword: "",
  });

  const [error, seterror] = useState("");

  const handleChange = (e) => {
    setuser({
      ...user,
      [e.target.id]: e.target.value,
    });
  };

  function validate(next) {
    !user.email.includes("@") && toast.warn("Enter a valid email!");
    !user.fname && toast.warn("Enter full name");
    !user.uname && toast.warn("Enter user name");
    !user.pword.length > 5 ||
      (!user.pword && toast.warn("Password Must be of 6 or more characteres"));
    const valid =
      user.email.includes("@") &&
      user.fname &&
      user.uname &&
      user.pword.length > 5;
    // console.log(valid);
    if (valid) {
      next();
    }
  }

  async function handleSubmit() {
    console.log(user);
    const { status, data } = await usePost("user/register", user);
    if (status === 200) {
      toast.success("Successfully Created! Redirecting to login")
      setTimeout(() => {
        
        history.push("/auth/login");
      }, 2500);
      console.log(data);
    } else {
      console.log(data);
      seterror(data.error);
      setInterval(() => {
        seterror("");
      }, 3000);
    }
  }

  return (
    <>
      {error && (
        <div
          className="bg-red-100 border  border-red-400 text-red-700 px-4 py-3 my-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <form className=" shadow-lg rounded px-8 pt-6 pb-8 mb-4 bg-background">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="uname"
            type="text"
            value={user.uname}
            onChange={(e) => handleChange(e)}
            placeholder="Username"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="fullname"
          >
            Full Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="fname"
            type="text"
            value={user.fname}
            onChange={(e) => handleChange(e)}
            placeholder="Full Name"
          />
        </div>
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
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="pword"
            type="password"
            value={user.pword}
            onChange={(e) => {
              handleChange(e);
            }}
            placeholder="Password"
          />
          {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
        </div>
        <button
          className="bg-primary hover:bg-hover duration-300 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={() => {
            validate(handleSubmit);
          }}
        >
          Create Account
        </button>
        <div className="grid grid-cols-1 text-center my-4">
          <Link href="/auth/login">
            <a className="inline-block align-baseline font-bold text-sm text-primary hover:text-hover">
              Already Have An Account? Login!
            </a>
          </Link>
        </div>
      </form>
    </>
  );
};

register.getLayout = function getLayout(page) {
  return <Authlayout title="Register">{page}</Authlayout>;
};

export default register;
