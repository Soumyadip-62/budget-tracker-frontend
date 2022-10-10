/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import UseApi from "../../Hooks/UseApi";
import Chart from "chart.js/auto";
import { Bar, Pie  } from "react-chartjs-2";
import { months } from "../../utils/ListOfMonths";

const ByCategory = () => {
  const { useGet } = UseApi();
  const [data, setdata] = useState([]);
  const [month, setmonth] = useState("");
  const [isLoading, setisLoading] = useState(true);

  async function getUserData() {
    const { data, status } = await useGet("chart/bycategory");
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
    <div className="p-3 m-3 rounded-xl bg-green-100 shadow-md ">
      <h2 className="text-2xl p-2 my-1 font-semibold">
        Where your money went In {months[month]}
      </h2>
      <div className="md:h-96">
        <Bar
          data={{
            labels: data.map((data) => {
              data.category_name;
            }),
            datasets: [
              {
                label: "Incomes",
                data: data.map((data) => data.total),
                backgroundColor: ["rgba(84, 143, 93, 0.8)"],
                borderWidth: 1,
              },
            ],
          }}
          options={{ responsive: true, maintainAspectRatio: false }}
        />
      </div>
    </div>
  );
};

export default ByCategory;
