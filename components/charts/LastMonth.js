/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import UseApi from "../../Hooks/UseApi";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { months } from "../../utils/ListOfMonths";
import Loading from "../common/Loading";

const LastMonth = () => {
     const { useGet } = UseApi();
     const [data, setdata] = useState([]);
    const [incomes, setincomes] = useState([])
    const [expenses, setexpenses] = useState([])
     const [month, setmonth] = useState("");
     const [labales, setlabales] = useState([])
     const [isLoading, setisLoading] = useState(true);
     const [backgroundColor, setbackgroundColor] = useState([])

     async function getUserData(callback) {
       const { data, status } = await useGet("chart/lastmonth/expense");
       console.log(data, status);
       if (status === 200) {
        setdata(data.records)
        // setincomes(data.incomes)
        // setexpenses(data.expenses)
         setmonth(data.month);
         setlabales(data.labels)

       } else if (status === 403) {
         setisLoading(false);
         setdata([]);
         // toast.warn("You Are Unauthorized, Please Login Again! ");
       }
     }

    async function sortBackground() {
      let background = [];

        data.forEach(data=> {
            if (data.rType === "plus") {
              background.push("rgba(84, 143, 93, 0.8)");
              
            }else{
                background.push("rgba(232, 107, 107, 0.8)");
               
            }
            console.log(backgroundColor); 
            console.log(background);
        })
        setbackgroundColor(background);
        setisLoading(false);
         

     }
     useEffect(() => {
       getUserData().then(()=> sortBackground()) //.finally(()=> );
     }, []);

  return (
    <div className="p-3 m-3 rounded-xl bg-yellow-100 shadow-md ">
      <h2 className="text-2xl p-2 my-1  font-semibold">
        Your Transanctions In {months[month]}
      </h2>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="md:h-96">
          <Bar
            data={{
              // labels: data.map((data) => {
              //   return new Date(data.date).toDateString();
              // }),
              labels: labales,
              datasets: [
                {
                  label: "Transanctions",
                  data: data.map((data) => data.amount),
                  backgroundColor:
                    backgroundColor.length > 0
                      ? backgroundColor
                      : ["rgba(214, 137, 107, 0.8)"],
                  borderWidth: 1,
                },
                //   {
                //     label: "Incomes",
                //     data: incomes.map((data) => data.amount),
                //     backgroundColor: ["rgba(84, 143, 93, 0.8)"],
                //     borderWidth: 1,
                //   },
              ],
            }}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>
      )}
    </div>
  );
}

export default LastMonth