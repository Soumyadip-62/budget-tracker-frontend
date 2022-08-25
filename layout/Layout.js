import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Layout = ({ children }) => {
  return (
    <div>
      {" "}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        
      />
      <Navbar />
      {children}
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
