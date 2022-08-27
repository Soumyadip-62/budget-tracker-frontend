/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import Table from "../components/themes/Table";
import UseApi from "../Hooks/UseApi";
import Layout from "../layout/Layout";
import {toast} from 'react-toastify'
import { Edit, Edit2, Edit3, Delete, Minimize, Trash, Trash2 } from "react-feather";
const accounts = () => {
  const { useGet, usePost } = UseApi();
  const [accounts, setaccounts] = useState([]);
  const [showAdd, setshowAdd] = useState(false);

  const [newAccount, setnewAccount] = useState({
    accName:"",
    accType:"",
    balance:0,
    currency:"INR"
  })


   const handleChange = (e) => {
     setnewAccount({
       ...newAccount,
       [e.target.id]: e.target.value,
     });
   };
function validate(next) {
  (!newAccount.accType && toast.warn("Enter Account Type"));
  !newAccount.accName && toast.warn("Enter Account Name");

  const valid = newAccount.accName && newAccount.accType;
  // console.log(valid);
  if (valid) {
    next();
  }
}

async function handleSubmit() {
  const {data,status} = await usePost('acc/add', newAccount)
  console.log(data,status);

  if (status === 200) {
    setshowAdd(false)
    setnewAccount({
      accName: "",
      accType: "",
      balance: 0,
      currency: "INR",
    });
    getUserData()
    toast.success("Account Added Successfully")
  }
}
  //* getuserdata fucntion
  async function getUserData() {
    const { data, status } = await useGet("acc/get");
    // console.log(data,status);
    if (status === 200) {
      setaccounts(data.accounts);
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div>
      {" "}
      <div className="p-4 m-4 rounded-md bg-background w-full max-w-xs">
        <span className="text-3xl p-3">Accounts</span>
        <button
          className="rounded-full px-2 py-1 bg-hover text-white"
          onClick={() => setshowAdd(true)}
        >
          Add +
        </button>
      </div>
      <div className="flex flex-col p-6 my-4">
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
                  {showAdd && (
                    <tr className="my-6 border shadow-md p-2 hover:bg-background">
                      <td className="text-sm text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                        <input
                          className=" border  rounded-lg w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                          id="accType"
                          type="text"
                          // value={user.password}
                          onChange={(e) => handleChange(e)}
                          placeholder="Account Type"
                        />
                      </td>
                      <td className="text-sm text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                        <input
                          className=" border  rounded-lg w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                          id="accName"
                          type="text"
                          // value={user.password}
                          onChange={(e) => handleChange(e)}
                          placeholder="Account Name"
                        />
                      </td>
                      <td className="text-sm text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                        <input
                          className=" border  rounded-lg w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                          id="balance"
                          type="text"
                          // value={user.password}
                          onChange={(e) => handleChange(e)}
                          placeholder="Initial Balance"
                        />
                      </td>
                      <td className="text-sm text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                        <button
                          className="bg-hover duration-300 w-full text-white font-bold py-3 px-3 mb-3 rounded focus:outline-none focus:shadow-outline"
                          type="button"
                          onClick={() => validate(handleSubmit)}
                        >
                          Submit
                        </button>
                      </td>
                      <td className="text-sm text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                        <button onClick={()=>setshowAdd(false)}>
                          <Trash color="green" />
                        </button>
                      </td>
                    </tr>
                  )}
                  {accounts.map((acc, id) => (
                    <tr
                      className="my-6 border shadow-md p-2 hover:bg-background"
                      key={id}
                    >
                      <td className="text-sm text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                        {acc.accType}
                      </td>
                      <td className="text-sm text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                        {acc.accName}
                      </td>

                      <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                        ₹{acc.balance}
                      </td>
                      {/* <td className="text-sm text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                        {acc.currency}
                      </td> */}
                      <td className="text-sm text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                        <button>
                          {" "}
                          <Edit2 color="green" />
                        </button>
                      </td>
                      <td className="text-sm text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                        <button>
                          {" "}
                          <Trash2 color="green" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

accounts.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default accounts;
