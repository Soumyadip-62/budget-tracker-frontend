/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import UseApi from "../../Hooks/UseApi";
import Chart from "chart.js/auto";
import { Bar, Doughnut } from "react-chartjs-2";
import { months } from "../../utils/ListOfMonths";
import Loading from "../common/Loading";
const ByAccount = () => {
  const { useGet } = UseApi();
  const [data, setdata] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [backgroundColor, setbackgroundColor] = useState([
   
  ]);
  const [dominantColor, setdominantColor] = useState("");

  async function getUserData() {
    const { data, status } = await useGet("chart/byaccount");
    console.log(data, status);
    if (status === 200) {
      setdata(data.accounts);

    } else if (status === 403) {
      setisLoading(false);
      setdata([]);
      // toast.warn("You Are Unauthorized, Please Login Again! ");
    }
  }
 async function sortBackground() {
    let background = [];
   await data.forEach((data) => {
      if (data.type === "Personal") {
        background.push("#F581C5");
      } else if (data.type === "Official") {
        background.push("#FAC241");
      } else {
        background.push("#91A13A");
      }
    });
    
    setbackgroundColor(background);
     

    console.log(backgroundColor);
  }
  useEffect(() => {
    getUserData()
      .then(() => sortBackground())
      .then(() => setisLoading(false));
  }, []);
  return (
    <div className={`p-3 m-3 rounded-xl bg-pink-100  shadow-md`}>
      <h2 className="text-2xl p-2 my-1  font-semibold">Your Accounts</h2>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="h-64">
          <Doughnut
            data={{
              labels: data.map((data) => {
                return data.name;
              }),
              datasets: [
                {
                  label: "Expenses",
                  data: data.map((data) => data.balance),
                  backgroundColor: backgroundColor.length > 0
                    ? backgroundColor
                    : ["#F581C5", "#FAC241", "#91A13A"], 
                  borderWidth: 1,
                },
              ],
            }}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>
      )}
    </div>
  );
};

export default ByAccount;
