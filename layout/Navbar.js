import React, { useEffect, useState } from "react";

import { Edit, Pocket } from "react-feather";
import styles from "../styles/Home.module.css";
import Script from "next/script";
import Link from "next/link";
import Head from "next/head";
import Cookies from "js-cookie";

const Navbar = () => {
  const [token, settoken] = useState(Cookies.get("tkn"));
  const name = "tkn";

  


  const Navitems = [
    { name: "Dashboard", path: "/" },
    { name: "Accounts", path: "/accounts" },
    { name: "Transanctions", path: "/transanctions" },
    { name: "Analytics", path: "/" },
  ];
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
            <ul className="navbar-nav">
              {Navitems.map((item, id) => (
                <li className="" key={id}>
                  <Link href={item.path}>
                    <a className={styles.navLink}> {item.name} </a>
                  </Link>
                </li>
              ))}
            </ul>

            {/* {token !== null && (
              <ul className="navbar-nav">
                <li>
                  <Link href={"/auth/login"}>
                    <a
                      style={{
                        color: "rgb(77, 146, 8)",
                        fontWeight: "bolder",
                        padding: "10px",
                      }}
                    >
                      {" "}
                      Login
                    </a>
                  </Link>
                </li>
              </ul>
            )} */}
          </div>
        </div>
      </nav>
    </div>
  );
};

export async function getServerSideProps(context) {
  return { props: { token: "gshghggsgyg" } };
}

export default Navbar;
