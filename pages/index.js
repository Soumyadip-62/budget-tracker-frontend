import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import history from "next/router";
import MonthlyExpenses from "../components/charts/MonthlyExpenses";
import { useEffect, useLayoutEffect, useState } from "react";
import Layout from "../layout/Layout";
import Accounts from "../components/Dashboard/Accounts";
import Transanctions from "../components/Dashboard/Transanctions";
import Cookies from "js-cookie";
import Loading from "../components/common/Loading";
import MonthlyIncome from "../components/charts/MonthlyIncome";
import LastMonth from "../components/charts/LastMonth";
import ByAccount from "../components/charts/ByAccount";
import Cashflow from "../components/charts/Cashflow";
import ByCategory from "../components/charts/ByCategory";

export default function Home() {
  const [token, settoken] = useState("");
  useLayoutEffect(() => {
    let token = Cookies.get("tkn");
    if (!token) {
      history.replace("/auth/login");
    } else {
      settoken(token);
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {token ? (
        <>
          <div className="md:grid md:grid-cols-2 ">
            <Accounts /> <ByAccount />
          </div>
          <Transanctions />
          <div className="md:grid md:grid-cols-2 ">
            <MonthlyExpenses />
            <MonthlyIncome />
          </div>
          <LastMonth />
          <Cashflow/>
          <ByCategory/>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
