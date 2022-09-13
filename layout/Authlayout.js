import React, { Children } from "react";
import Image from "next/image";
import Head from "next/head";
import styles from "./css/auth.module.css";
import Link from "next/link";
import { Pocket } from "react-feather";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import wallet from "../public/fuyoNB2.jpg"
const Authlayout = ({ children, title }) => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
      
        draggable
        pauseOnHover
      />
      <nav className="navbar navbar-expand-lg navbar-light bg-light p-4">
        <div className="container-fluid">
          <Link href="#">
            <a className="navbar-brand">
              <Pocket color="green" />
            </a>
          </Link>
        </div>
      </nav>
      <div className="flex justify-center">
        <Head>
          <title>{title}</title>
        </Head>

        <div className="mt-16 mb-6">
          <h2 className="text-hover text-4xl text-center font-bold my-4 ">
            {title}
          </h2>
          <div className="w-full max-w-xs">
            {children}{" "}
            <p className="text-center text-gray-500 text-xs">
              &copy;2022 Budget Tracker By Soumyadip. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Authlayout;
