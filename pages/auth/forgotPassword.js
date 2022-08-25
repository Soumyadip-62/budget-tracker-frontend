/* eslint-disable react-hooks/rules-of-hooks */
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";
import UseApi from "../../Hooks/UseApi";
import Authlayout from "../../layout/Authlayout";
import history from "next/router";

const forgotPassword = () => {
  const { usePut, usePost } = UseApi();
  const [show, setshow] = useState(false);
  const [timer, settimer] = useState(60);
  const [email, setemail] = useState("");
  const [form, setform] = useState({
    otp: "",
    new_password1: "",
    new_password2: "",
  });

  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.id]: e.target.value,
    });
  };
  function validateMail(next) {
    !email.includes("@") && toast.warn("Enter a valid email!");
    const valid = email.includes("@");
    if (valid) {
      next();
    }
  }
  function validate(next) {
    !form.otp && toast.warn("Enter Otp");
    !form.new_password1.length > 5 ||
      (!form.new_password1 &&
        toast.warn("Password Must be of 6 or more characteres"));
    
      (!form.new_password2 &&
        toast.warn("Confirm Password"));
    const valid =
      form.otp &&
      form.new_password1.length > 5 &&
      form.new_password2.length > 5;
    // console.log(valid);
    if (valid) {
      next();
    }
  }

  async function handleEmail() {
    const { data, status } = await usePost("user/forgotpassword", {
      email: email,
    });
    if (status === 200) {
      toast.success(data.message);
      setshow(true);
    } else {
      toast.error(data.error);
    }
  }

  async function handleOtp() {
    const { data, status } = await usePost("user/resetpassword", form);
    if (status === 200) {
      toast.success(data.message);
      history.push("/auth/login");
    } else {
      toast.error(data.error);
    }
  }

  return (
    <form className=" shadow-lg rounded px-8 pt-6 pb-8 mb-4 bg-background">
      {show ? (
        ""
      ) : (
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
            value={email}
            onChange={(e) => setemail(e.target.value)}
            placeholder="Email"
          />
        </div>
      )}
      {show && (
        <>
          {" "}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="otp"
            >
              Otp
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="otp"
              type="text"
              value={form.otp}
              onChange={(e) => handleChange(e)}
              placeholder="Enter Otp"
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="new_password1"
              type="text"
              value={form.new_password1}
              onChange={(e) => handleChange(e)}
              placeholder="New Password"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirm"
            >
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="new_password2"
              type="text"
              value={form.new_password2}
              onChange={(e) => handleChange(e)}
              placeholder="Confirm New Password"
            />
          </div>
        </>
      )}
      {show ? (
        <button
          className="bg-primary hover:bg-hover duration-300 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={() => validate(handleOtp)}
        >
          Change Password
        </button>
      ) : (
        <button
          className="bg-primary hover:bg-hover duration-300 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={() => {
            validateMail(handleEmail);
          }}
        >
          Get Otp
        </button>
      )}
      <div className="grid grid-cols-1 text-center my-4">
        <Link href="/auth/login">
          <a className="inline-block align-baseline font-bold text-sm text-primary hover:text-hover">
            Remember Password? Login!
          </a>
        </Link>
      </div>
    </form>
  );
};

forgotPassword.getLayout = function getLayout(page) {
  return <Authlayout title="Forget Password">{page}</Authlayout>;
};

export default forgotPassword;
