/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import Table from "../components/themes/Table";
import UseApi from "../Hooks/UseApi";
import Layout from "../layout/Layout";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import {
  Edit,
  Edit2,
  Edit3,
  Delete,
  Minimize,
  Trash,
  Trash2,
} from "react-feather";
import Head from "next/head";
import Loading from "../components/common/Loading";
// import { Modal } from "react-responsive-modal";
import Modal from "../components/Modal/Modal";
import Link from "next/link";

const accounts = () => {
  const router = useRouter();
  const query = router.query;
 if (query){
  console.log(query.showadd);
 };

  const { useGet, usePost, usePut } = UseApi();
  const [accounts, setaccounts] = useState([]);
  const [showAdd, setshowAdd] = useState(query.showadd == 'open'? true: false);
  const [isLoading, setisLoading] = useState(true);
  const [editModal, seteditModal] = useState(false);
  const [deletedAccId, setdeletedAccId] = useState("");
  const [deleteModal, setdeleteModal] = useState(false)
  const [total, settotal] = useState(0)
  const [newAccount, setnewAccount] = useState({
    id: "",
    accName: "",
    accType: "",
    balance: 0,
    currency: "INR",
  });

  const [editedAcc, seteditedAcc] = useState({
    accName: "",
    accType: "",
    balance: 0,
    currency: "INR",
  });

  

  function openDeleteModal(acc) {
    setdeleteModal(true)
    setdeletedAccId(acc._id)
  }
  function closeDeleteModal() {
    setdeleteModal(false);
    setdeletedAccId('');
  }

 async function handleDelete() {
    const {data,status} = await useGet('acc/delete/' + deletedAccId)
    if (status === 200) {
      getUserData()
      closeDeleteModal()
      toast.success('Account Deleted Successfully')
    } else{
      toast.error("Something Went wrong!")
    }
    
  }


  const onOpenModal = (acc) => {
    seteditedAcc({
      id: acc._id,
      accName: acc.accName,
      accType: acc.accType,
      balance: acc.balance,
      currency: "INR",
    });
    seteditModal(true);
  };
  const onCloseModal = () => {
    seteditModal(false);
    seteditedAcc({
      id: "",
      accName: "",
      accType: "",
      balance: 0,
      currency: "INR",
    });
  };

  const handleChangeEdit = (e) => {
    seteditedAcc({
      ...editedAcc,
      [e.target.id]: e.target.value,
    });
  };

  const handleChange = (e) => {
    setnewAccount({
      ...newAccount,
      [e.target.id]: e.target.value,
    });
  };
  function validate(next) {
    !newAccount.accType && toast.warn("Enter Account Type");
    !newAccount.accName && toast.warn("Enter Account Name");

    const valid = newAccount.accName && newAccount.accType;
    // console.log(valid);
    if (valid) {
      next();
    }
  }

  async function handleSubmit() {
    const { data, status } = await usePost("acc/add", newAccount);
    console.log(data, status);

    if (status === 200) {
      setshowAdd(false);
      setnewAccount({
        accName: "",
        accType: "",
        balance: 0,
        currency: "INR",
      });
      getUserData();
      toast.success("Account Added Successfully");
    }
  }
  //* getuserdata fucntion
  async function getUserData() {
    const { data, status } = await useGet("acc/get");
    // console.log(data,status);
    if (status === 200) {
      setaccounts(data.accounts);
      let total = data.accounts.reduce((tot, acc) => tot + acc.balance, 0);
      console.log(total);
      settotal(total);
      
      setisLoading(false);
    } else if (status ===403) {
      setisLoading(false)
      setaccounts([])
      toast.warn('You Are Unauthorized, Please Login Again! ')
    }

  }

  const handleEdit = async () => {
    let req = {
      accName: editedAcc.accName,
      accType: editedAcc.accType,
      balance: editedAcc.balance,
      currency: editedAcc.currency,
    };
    const { data, status } = await usePut("acc/edit/" + editedAcc.id, req);

    if (status === 200) {
      getUserData();
      onCloseModal();
      toast.success("Account Edited Successfully");
    } else {
      toast.error("Something Went Wrong!");
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div>
      <Head>
        <title>Accounts</title>
      </Head>{" "}
      <div className="grid grid-cols-1 p-2 m-3  rounded-md bg-background w-11/12 md:w-96 md:p-4 md:m-4 ">
        <span className="text-3xl p-3">Total Balance : ₹{total}</span>
        <button
          className="rounded-md px-2 py-1 bg-hover text-white"
          onClick={() => setshowAdd(true)}
        >
          Add Account +
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
                        <select
                          className=" border  rounded-lg w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                          id="accType"
                          type="text"
                          onChange={(e) => handleChange(e)}
                        >
                          <option>Select Account Type</option>
                          <option className="text-personal " value="Personal">
                            Personal
                          </option>
                          <option className="text-official " value="Official">
                            Official
                          </option>
                          <option
                            className="text-enterprice "
                            value="Enterprice"
                          >
                            Enterprice
                          </option>
                        </select>
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
                        <button onClick={() => setshowAdd(false)}>
                          <Trash color="green" />
                        </button>
                      </td>
                    </tr>
                  )}
                  {isLoading ? (
                    <tr>
                      <td>
                        <Loading />
                      </td>
                    </tr>
                  ) : accounts.length <= 0 ? (
                    <tr>
                      <td>No Accounts Found</td>
                    </tr>
                  ) : (
                    accounts.map((acc, id) => (
                      <tr
                        className={
                          acc.accType === "Personal"
                            ? "my-6 border shadow-md p-2 hover:bg-personal"
                            : acc.accType === "Enterprice"
                            ? "my-6 border shadow-md p-2  hover:bg-enterprice"
                            : "my-6 border shadow-md p-2  hover:bg-official"
                        }
                        key={id}
                      >
                        <td className="text-sm text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                          {acc.accType}
                        </td>
                        <td className="text-sm text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                          <Link href={`/accountdetails/${acc._id}`}>
                            {acc.accName}
                          </Link>
                        </td>

                        <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                          ₹{acc.balance}
                        </td>
                        {/* <td className="text-sm text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                        {acc.currency}
                      </td> */}
                        <td className="text-sm text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                          <button onClick={() => onOpenModal(acc)}>
                            {" "}
                            <Edit2 color="green" />
                          </button>
                        </td>
                        <td className="text-sm text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                          <button onClick={() => openDeleteModal(acc)}>
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
        onClose={onCloseModal}
        SubmitFunction={() => handleEdit()}
      >
        <form className=" shadow-lg rounded px-8 pt-6 pb-8  bg-background">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Account Type
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="accType"
              type="text"
              name="accType"
              value={editedAcc.accType}
              onChange={(e) => handleChangeEdit(e)}
            >
              {" "}
              <option>Select Account Type</option>
              <option className="text-personal " value="Personal">
                Personal
              </option>
              <option className="text-official " value="Official">
                Official
              </option>
              <option className="text-enterprice " value="Enterprice">
                Enterprice
              </option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Account Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="accName"
              type="text"
              value={editedAcc.accName}
              onChange={(e) => handleChangeEdit(e)}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Balance
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="balance"
              type="text"
              value={editedAcc.balance}
              onChange={(e) => handleChangeEdit(e)}
            />
          </div>
        </form>
      </Modal>
      {/* <Modal open={editModal} onClose={onCloseModal}>()
            
          </Modal> */}
      <Modal
        open={deleteModal}
        onClose={closeDeleteModal}
        text="Yes"
        SubmitFunction={handleDelete}
      >
        <div className="p-4 bg-background">
          {" "}
          <h2 className="text-3xl mb-3 text-red-600">Delete!</h2>
          <p>Are you sure you want to delete this Account?</p>
        </div>
      </Modal>
    </div>
  );
};

accounts.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default accounts;
