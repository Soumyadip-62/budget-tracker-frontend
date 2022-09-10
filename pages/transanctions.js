/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import DataTable, { createTheme } from "react-data-table-component";
import Table from "../components/themes/Table";
import UseApi from "../Hooks/UseApi";
import { Edit2, Trash, Trash2 } from "react-feather";
import Loading from "../components/common/Loading";
import Head from "next/head";
import Modal from "../components/Modal/Modal";
import { toast } from "react-toastify";
import { categories } from "../utils/ListOfcategory";
import { paymentType } from "../utils/ListOfpaymentTypes";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const transanctions = () => {
  const router = useRouter();
  const query = router.query;
 
  const {useGet,usePost,usePut}= UseApi()
  const [records, setrecords] = useState([])
  const [isLoading, setisLoading] = useState(true)
  const [accounts, setaccounts] = useState([])
  const [showAdd, setshowAdd] = useState(
    query.showadd == "open" ? true : false
  );
  const [deleteModal, setdeleteModal] = useState(false)
  const [editModal, seteditModal] = useState(false)
  const [deleteRec, setdeleteRec] = useState('')

  const [newRecord, setnewRecord] = useState({
    account: "",
    rType: "minus",
    amount: '',
    desc: "",
    note:"",
    paymentType: "",
    date: ""
  });
  const [recordEdit, setrecordEdit] = useState({
    id:'',
    rType: "",
    amount: '',
    desc: "",
    note:"",
    paymentType: "",
    date: "",
  });
  async function getUserData() {
    const { data, status } = await useGet("rec/get/user");
    const account = await useGet("acc/get");
    if (account.status ===200) {
      
      setaccounts(account.data.accounts)
    }
    console.log(data,status);
    if (status === 200) {
      setrecords(data.records);
      setisLoading(false);
    } else if (status === 403) {
      setisLoading(false);
      setrecords([]);
      toast.warn("You Are Unauthorized, Please Login Again! ");
    }
  }
   useEffect(() => {
    let token = Cookies.get("tkn");
    if (!token) {
      router.replace("/auth/login");
    }
     getUserData();
   }, []);
// !fucntions related to add 

function handleChange(e) {
  console.log(newRecord);
  setnewRecord({
    ...newRecord,
    [e.target.id] : e.target.value
  })
  
}

function handleRecordType(type) {
  setnewRecord({
    ...newRecord,
    rType:type
  })
}

async function handleSubmit() {

  let Id= newRecord.account
  let req = {
    rType: newRecord.rType,
    amount: newRecord.amount,
    desc: newRecord.desc,
    note:newRecord.note,
    paymentType: newRecord.paymentType,
    date: newRecord.date,
  };

  const {data, status} = await usePost('rec/'+Id+'/add', req)
  if (status === 201) {
    getUserData();
    closeAddModal();
    toast.success("Transaction Added Successfully");
  } else {
    toast.error("Something Went Wrong!");
  }
  
}
function openAddModal() {
  setshowAdd(true)
  
}

function closeAddModal() {
  setshowAdd(false)
  setnewRecord({
    account: "",
    rType: "minus",
    amount: "",
    desc: "",
    note: "",
    paymentType: "",
    date: "",
  });
  
}

  //!  fucntions related to edit 

function handleChangeEdit(e) {
  setrecordEdit({
    ...recordEdit,
    [e.target.id]:e.target.value
  })
}

function  handleRecordTypeforEDIT(type) {
  setrecordEdit({
    ...recordEdit,
    rType: type,
  });
}

  function onOpenModal(rec) {
    let Amount;
    if (rec.rType === "minus") {
      Amount = rec.amount.toString().slice(1);
      console.log(Amount);
    }
    else{
      Amount = rec.amount
    }
    seteditModal(true)
    setrecordEdit({
      id:rec._id,
      rType:rec.rType,
      amount:Amount,
      desc:rec.desc,
      note:rec.note,
      paymentType:rec.paymentType,
      date:rec.date
    })
  }

  function onCloseEditModal() {
    seteditModal(false)
    setrecordEdit({
      id:"",
      rType: "",
      amount: 0,
      desc: "",
      note:"",
      paymentType: "",
      date: "",
    });
  }

 async function handleEdit() {
  // console.log();
  let id = recordEdit.id
  let req = {
    rType: recordEdit.rType,
    amount: recordEdit.amount,
    desc: recordEdit.desc,
    note:recordEdit.note,
    paymentType: recordEdit.paymentType,
    date: recordEdit.date,
  };
    const {data,status} = await usePut('rec/'+id+'/edit', req )

    if (status === 200) {
      getUserData();
      onCloseEditModal();
      toast.success("Transaction Edited Successfully");
    } else {
      toast.error("Something Went Wrong!");
    }
  }


  // !fucntions related to delete
  function openDeleteModal(rec) {
    setdeleteModal(true);
    setdeleteRec(rec._id);
  }
  function closeDeleteModal() {
    setdeleteModal(false);
    setdeleteRec("");
  }

  async function handleDelete() {
    const {data,status} = await useGet('rec/del/' + deleteRec)
    if (status === 200) {
      getUserData()
      closeDeleteModal()
      toast.success('Transaction Deleted Successfully')
    } else{
      toast.error("Something Went wrong!")
    }
  }
  return (
    <div>
      <Head>
        <title>Transanctions</title>
      </Head>
      <div className="grid grid-cols-1 p-4 m-4 rounded-md bg-background w-10/12 md:w-96 md:p-4 md:m-4">
        <span className="text-3xl p-3">Transanctions</span>
        <button
          className="rounded-md bg-gray-600  p-2 ml-1.5  w-auto text-white font-bold"
          onClick={() => openAddModal()}
        >
          Add Transaction +
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
                  {isLoading ? (
                    <tr>
                      <td>
                        <Loading />
                      </td>
                    </tr>
                  ) : records.length <= 0 ? (
                    <tr>
                      <td className="text-black font-semibold text-2xl">
                        No Transanctions Found
                      </td>
                    </tr>
                  ) : (
                    records.map((rec, id) => (
                      <tr
                        className={
                          rec.rType === "plus"
                            ? "my-6 border shadow-md p-2 hover:bg-green-300"
                            : "my-6  border shadow-md p-2 hover:bg-red-300"
                        }
                        key={id}
                      >
                        <td className="text-sm text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                          {rec.account.accName.toUpperCase()}
                        </td>
                        <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                          {rec.desc}
                        </td>
                        <td className="text-sm text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                          {rec.note}
                        </td>
                        <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                          {rec.rType === "minus" ? (
                            <p className="text-red-600">{rec.amount}</p>
                          ) : (
                            <p className="text-green-600">₹{rec.amount}</p>
                          )}
                        </td>
                        <td className="text-sm text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                          {rec.paymentType}
                        </td>
                        <td className="text-sm text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
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
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={editModal}
        onClose={onCloseEditModal}
        SubmitFunction={() => handleEdit()}
      >
        <div
          className={
            recordEdit.rType === "minus" ? "p-2 bg-red-300" : "p-2 bg-green-300"
          }
        >
          <div className="flex justify-center">
            <button
              className="p-2 rounded-lg border m-2 font-semibold border-gray-400 text-xl focus:bg-red-700 focus:text-white"
              onClick={() => handleRecordTypeforEDIT("minus")}
            >
              Expense
            </button>
            <button
              className="p-2 rounded-lg border m-2 font-semibold border-gray-400 text-xl focus:bg-green-800 focus:text-white"
              onClick={() => handleRecordTypeforEDIT("plus")}
            >
              Income
            </button>
          </div>
          <form className=" shadow-lg rounded px-8 pt-6 pb-8 ">
            <div className="md:flex md:gap-3 flex gap-2 justify-evenly">
              <div>
                {" "}
                <div className="mb-2">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    Category
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="desc"
                    type="text"
                    name="accType"
                    value={recordEdit.desc}
                    onChange={(e) => handleChangeEdit(e)}
                  >
                    {" "}
                    <option>Choose</option>
                    {categories.map((cat, id) => (
                      <option key={id} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-2">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    Amount
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="amount"
                    type="text"
                    value={recordEdit.amount}
                    onChange={(e) => handleChangeEdit(e)}
                  />
                </div>
              </div>
              <div>
                {" "}
                <div className="mb-2">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    Note
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="note"
                    type="text"
                    maxLength="50"
                    value={recordEdit.note}
                    placeholder="Note"
                    onChange={(e) => handleChangeEdit(e)}
                  />
                </div>
                <div className="mb-2">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    Date
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="date"
                    type="date"
                    value={recordEdit.date}
                    onChange={(e) => handleChangeEdit(e)}
                  />
                </div>
              </div>
            </div>{" "}
            <div className="mb-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Payment Type
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="paymentType"
                type="text"
                name="accType"
                value={recordEdit.paymentType}
                onChange={(e) => handleChangeEdit(e)}
              >
                {" "}
                <option>Choose</option>
                {paymentType.map((cat, id) => (
                  <option key={id} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </div>
      </Modal>

      {/* Add Modal */}
      <Modal
        open={showAdd}
        onClose={closeAddModal}
        SubmitFunction={() => handleSubmit()}
      >
        <div
          className={
            newRecord.rType === "minus" ? "p-2 bg-red-300" : "p-2 bg-green-300"
          }
        >
          <div className="flex justify-center">
            <button
              className="p-2 rounded-lg border m-2 font-semibold border-gray-400 text-xl focus:bg-red-700 focus:text-white"
              onClick={() => handleRecordType("minus")}
            >
              Expense
            </button>
            <button
              className="p-2 rounded-lg border m-2 font-semibold border-gray-400 text-xl focus:bg-green-800 focus:text-white"
              onClick={() => handleRecordType("plus")}
            >
              Income
            </button>
          </div>
          <form className=" shadow-lg rounded px-8 pt-6 pb-8 flex gap-2 md:flex md:gap-3 justify-evenly ">
            <div>
              {" "}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Account
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="account"
                  type="text"
                  name="accType"
                  value={newRecord.account}
                  onChange={(e) => handleChange(e)}
                >
                  {" "}
                  <option>Account</option>
                  {accounts.map((acc, id) => (
                    <option key={id} value={acc._id}>
                      {acc.accName} ({acc.accType})
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Category
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="desc"
                  type="text"
                  name="accType"
                  value={newRecord.desc}
                  onChange={(e) => handleChange(e)}
                >
                  {" "}
                  <option>Choose</option>
                  {categories.map((cat, id) => (
                    <option key={id} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Amount
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="amount"
                  type="text"
                  value={newRecord.amount}
                  placeholder="Amount"
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
            <div>
              {" "}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Note
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="note"
                  type="text"
                  maxLength="50"
                  value={newRecord.note}
                  placeholder="Note"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Payment Type
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="paymentType"
                  type="text"
                  name="accType"
                  value={newRecord.paymentType}
                  onChange={(e) => handleChange(e)}
                >
                  {" "}
                  <option>Choose</option>
                  {paymentType.map((cat, id) => (
                    <option key={id} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Date
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="date"
                  type="date"
                  value={newRecord.date}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
          </form>
        </div>
      </Modal>
      {/* DElete modal */}
      <Modal
        open={deleteModal}
        onClose={closeDeleteModal}
        text="Yes"
        SubmitFunction={handleDelete}
      >
        <div className="p-4 bg-background">
          {" "}
          <h2 className="text-3xl mb-3 text-red-600">Delete!</h2>
          <p>Are you sure you want to delete this Record?</p>
        </div>
      </Modal>
    </div>
  );
};

transanctions.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default transanctions;
