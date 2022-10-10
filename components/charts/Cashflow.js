/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import UseApi from "../../Hooks/UseApi";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { months } from "../../utils/ListOfMonths";

const Cashflow = () => {
  const { useGet } = UseApi();
//   const [data, setdata] = useState([]);
  const [month, setmonth] = useState("");
  const [totolIncome, settotolIncome] = useState(0)
  const [totalExpense, settotalExpense] = useState(0)
  const [isLoading, setisLoading] = useState(true);

  async function getUserData() {
    const { data, status } = await useGet("chart/cashflow");
    console.log(data, status);
    if (status === 200) {
     settotolIncome(data.total_income);
     settotalExpense(data.total_expense);
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
    <div className="p-3 m-3 rounded-xl bg-green-100 shadow-md ">
      <h2 className="text-2xl p-2 my-1 font-semibold">
        Cashflow In {months[month]}
      </h2>
      <div className="md:h-64 h-24">
        <Bar
          data={{
            labels: ["Income", "Expense"],
            datasets: [
              {
                label: "Cashflow",
                data: [totolIncome, totalExpense.toString().slice(1)],
                backgroundColor: [
                  "rgba(84, 143, 93, 0.8)",
                  "rgba(232, 107, 107, 0.8)",
                ],
                borderWidth: 1,
              },
            ],
          }}
          options={{
            indexAxis: "y",
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </div>
    </div>
  );
};

export default Cashflow;
