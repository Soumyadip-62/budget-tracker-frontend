/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";

import { Edit, LogOut, Pocket } from "react-feather";
import styles from "../styles/Home.module.css";
import Script from "next/script";
import Link from "next/link";
import Head from "next/head";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import UseApi from "../Hooks/UseApi";
import { toast } from "react-toastify";
import Modal from "../components/Modal/Modal";

const Navbar = () => {
  const [token, settoken] = useState(Cookies.get("tkn"));
  const name = "tkn";
  const router = useRouter();

  const [profile, setprofile] = useState({});
  const { useGet, usePost, usePut } = UseApi();

  async function getUserdata() {
    const { data, status } = await useGet("user/profile");
    console.log(data);
    if (status === 200) {
      setprofile(data.user);
    } else if (status === 403) {
      toast.warn('Please Login!')
      router.replace('/auth/login')
    }
  }

  useEffect(() => {
    getUserdata();
  }, []);

  const Navitems = [
    { name: "Dashboard", path: "/" },
    { name: "Accounts", path: "/accounts" },
    { name: "Transanctions", path: "/transanctions" },
    // {
    //   name:"Profile", path:'/profile'
    // }
  ];

  // !states And fucntions related to edit profile
  const [editModal, seteditModal] = useState(false);
  const [user, setuser] = useState({
    uname: "",
    fname: "",
  });

  const openEditModal = () => {
    seteditModal(true);
    setuser({
      uname: profile.userName,
      fname: profile.fullName,
    });
  };
  const CloseeditModal = () => {
    seteditModal(false);
    setuser({
      uname: "",
      fname: "",
    });
  };

  const handleEditchange = (e) => {
    setuser({
      ...user,
      [e.target.id]: e.target.value,
    });
  };

  const handleEdit = async () => {
    const { data, status } = await usePut("user/edit_profile", user);
    if (status === 200) {
      getUserdata()
      toast.success('Profile Updated Succesfully')
      CloseeditModal()
    }else{
      toast.error('Something went wrong')
    }
  };


  // !All states and fucntions related to change pasowrd
  const [changePassModal, setchangePassModal] = useState(false);
  const [pass, setpass] = useState({
    password:"",
    new_password1:'',
    new_password2:""
  })

  const openChangePassModal =()=>{
    setchangePassModal(true)
  }
  const closeChangePassModal =()=>{
    setchangePassModal(false)
    setpass({
      password: "",
      new_password1: "",
      new_password2: "",
    });
  }

  const handleChangePasswordEdit=(e)=>{
    setpass({
      ...pass,
      [e.target.id]:e.target.value
    })


  }

  const handleChangePassword=async ()=>{
    const {data,status} = await usePut("user/change_password", pass);
    console.log(data);
    if (status===200) {
      localStorage.setItem("user", JSON.stringify(data.user));
      Cookies.remove('tkn')
      Cookies.set("tkn", data.token, { expires: 7 });
      toast.success('Password Updated')
      closeChangePassModal()
    }
  }


  // !logout fucntion
  async function Logout() {
    const { status, data } = await useGet("user/logout");
    if (status === 200) {
      toast.warn("Logged Out Successfully");
      Cookies.remove("tkn");
      router.push("/auth/login");
    }
  }
  return (
    <div>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
          crossOrigin="anonymous"
        />
      </Head>
      <Script
        id="bootstrap-cdn"
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
      />
      <nav className="navbar navbar-expand-lg navbar-light bg-light ">
        <div className="container-fluid">
          <Link href="/">
            <a className="navbar-brand">
              <Pocket color="green" />
            </a>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarNav">
            <ul className="navbar-nav ">
              {Navitems.map((item, id) => (
                <li className="" key={id}>
                  <Link href={item.path}>
                    <a className={styles.navLink}> {item.name} </a>
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="navbar-nav">
              {" "}
              <li className="nav-item dropdown">
                <a
                  className="px-2 dropdown-toggle hover:font-bold hover:text-hover"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Welcome {profile.userName}
                </a>

                <ul className="dropdown-menu " aria-labelledby="navbarDropdown">
                  <li className="p-2 rounded-lg m-0 ">
                    <div className="card w-80 bg-secondary text-white">
                      <div className="card-body">
                        <h5 className="card-title font-bold text-2xl  flex justify-between">
                          {profile.fullName}{" "}
                          <button onClick={() => openEditModal()}>
                            <Edit />
                          </button>
                        </h5>
                        <p className="card-text">
                          Email :{" "}
                          <span className="font-semibold">{profile.email}</span>{" "}
                        </p>
                        <p className="card-text">
                          User Name :{" "}
                          <span className="font-semibold">
                            {profile.userName}
                          </span>
                        </p>
                      </div>
                      <div className="card-footer text-white">
                        <a
                          className=""
                          href="#"
                          onClick={() => openChangePassModal()}
                        >
                          Change Password
                        </a>
                        <a
                          className=" flex justify-start gap-2"
                          role="button"
                          onClick={() => Logout()}
                          href="#"
                        >
                          Logout <LogOut />
                        </a>
                      </div>
                    </div>{" "}
                  </li>
                  {/* <li></li>

                  <li></li> */}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Modal
        open={editModal}
        onClose={CloseeditModal}
        SubmitFunction={handleEdit}
      >
        <form className=" rounded px-8 pt-6 pb-8 bg-background">
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
              onChange={(e) => handleEditchange(e)}
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
              onChange={(e) => handleEditchange(e)}
              placeholder="Full Name"
            />
          </div>
        </form>
      </Modal>

      {/* change password modal */}
      <Modal
        open={changePassModal}
        onClose={closeChangePassModal}
        SubmitFunction={handleChangePassword}
      >
        <form className=" rounded px-8 pt-6 pb-8 bg-background">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Current Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="text"
              value={pass.password}
              onChange={(e) => handleChangePasswordEdit(e)}
              placeholder="Current Password"
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
              value={pass.new_password1}
              onChange={(e) => handleChangePasswordEdit(e)}
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
              value={pass.new_password2}
              onChange={(e) => handleChangePasswordEdit(e)}
              placeholder="Confirm New Password"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export async function getServerSideProps(context) {
  return { props: { token: "gshghggsgyg" } };
}

export default Navbar;
