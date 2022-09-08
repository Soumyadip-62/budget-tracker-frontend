/* eslint-disable react-hooks/rules-of-hooks */
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Edit2, Trash2 } from "react-feather";
import { toast } from "react-toastify";
import UseApi from "../../Hooks/UseApi";
import Loading from "../common/Loading";

const Transanctions = () => {
  const { useGet, usePost, usePut } = UseApi();
  const [records, setrecords] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const router = useRouter();

  async function getUserData() {
    const { data, status } = await useGet("rec/get/user");

    console.log(data, status);
    if (status === 200) {
      setrecords(data.records.slice(0, 10));
      setisLoading(false);
    } else if (status === 403) {
      setisLoading(false);
      setrecords([]);
      toast.warn("You Are Unauthorized, Please Login Again! ");
    }
  }
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div>
      {" "}
      <div className="p-3 m-3 rounded-xl bg-background shadow-md  text-white">
        <h2 className="text-3xl p-2 my-1 text-hover font-semibold">
          Recent Transanctions{" "}
          <Link href="/transanctions">
            <a className="text-sm font-thin text-black">See All</a>
          </Link>
        </h2>

        <button
          className="rounded-md bg-gray-600  p-2 ml-1.5  w-auto  font-bold"
          onClick={() =>
            router.push({
              pathname: "/transanctions",
              query: { showadd: "open" },
            })
          }
        >
          Add Transanction +
        </button>

        <div className="flex flex-col p-3 my-4">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-center rounded-lg">
                  {/* <thead className="bg-background">
                  <tr>
                   
                      <th
                        scope="col"
                        className="text-sm font-bold text-gray-900 px-6 py-4"
                     
                      >
                        
                      </th>
                   
                  </tr>
                </thead> */}
                  <tbody className="">
                    {isLoading ? (
                      <tr>
                        <td>
                          <Loading />
                        </td>
                      </tr>
                    ) : records.length <= 0 ? (
                      <tr>
                        <td>No Records Found</td>
                      </tr>
                    ) : (
                      records.map((rec, id) => (
                        <tr
                          className={
                            rec.rType === "plus"
                              ? "my-3 border shadow-md p-2 md:hover:bg-green-300"
                              : "my-3  border shadow-md p-2 md:hover:bg-red-300"
                          }
                          key={id}
                        >
                          <td
                            className={
                              rec.account.accType === "Personal"
                                ? "p-2 m-2 rounded-md font-bold text-personal w-auto md:w-auto md:p-4 md:m-4"
                                : rec.account.accType === "Enterprice"
                                ? "p-2 m-2 rounded-md font-bold text-enterprice w-auto md:w-auto md:p-4 md:m-4"
                                : "p-2 m-2 rounded-md font-bold text-official w-auto md:w-auto md:p-4 md:m-4"
                            }
                          >
                            <Link href={`/accountdetails/${rec.account._id}`}>
                              {rec.account.accName}
                            </Link>
                          </td>

                          {/* <td className="text-sm text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                          {rec.note}
                        </td> */}
                          <td className="text-sm text-gray-900 font-bold px-2 py-4 whitespace-nowrap">
                            {rec.rType === "minus" ? (
                              <p className="text-red-600">{rec.amount}</p>
                            ) : (
                              <p className="text-green-600">₹{rec.amount}</p>
                            )}
                          </td>
                          <td className="text-sm text-gray-900 font-semibold px-2 py-4 whitespace-nowrap">
                            {rec.desc}
                          </td>
                          {/* <td className="text-sm text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                          {rec.paymentType}
                        </td> */}
                          {/* <td className="text-sm text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                          <button onClick={() => onOpenModal(rec)}>
                            {" "}
                            <Edit2 color="green" />
                          </button>
                        </td>
                        <td className="text-sm text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                          <button onClick={() => openDeleteModal(rec)}>
                            {" "}
                            <Trash2 color="green" />
                          </button>
                        </td> */}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transanctions;
