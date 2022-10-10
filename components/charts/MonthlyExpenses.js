/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import UseApi from "../../Hooks/UseApi";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { months } from "../../utils/ListOfMonths";
const MonthlyExpenses = () => {
  const { useGet } = UseApi();
  const [data, setdata] = useState([]);
  const [month, setmonth] = useState("");
  const [isLoading, setisLoading] = useState(true);

  async function getUserData() {
    const { data, status } = await useGet("chart/monthly/expense");
    console.log(data, status);
    if (status === 200) {
      setdata(data.records);
      setmonth(data.month);

      setisLoading(false);
    } else if (status === 403) {
      setisLoading(false);
      setdata([]);
      // toast.warn("You Are Unauthorized, Please Login Again! ");
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="p-3 m-3 rounded-xl bg-red-100 shadow-md ">
      <h2 className="text-2xl p-2 my-1  font-semibold">
        Your Expenses In {months[month]}
      </h2>
      <div>
        <Bar
          data={{
            labels: data.map((data) => {
              return new Date(data.date).toDateString();
            }),
            datasets: [
              {
                label: "Expenses",
                data: data.map((data) => data.amount.toString().slice(1)),
                backgroundColor: ["rgba(232, 107, 107, 0.8)"],
                borderWidth: 1,
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default MonthlyExpenses;
