/* eslint-disable react-hooks/rules-of-hooks */
import Link from "next/link";
import React, { useEffect, useState } from "react";
import UseApi from "../../Hooks/UseApi";
import { useRouter } from "next/router";
const Accounts = () => {
  const [accounts, setaccounts] = useState([]);
  const { useGet, usePost, usePut } = UseApi();
  const [isLoading, setisLoading] = useState(true);

  const router = useRouter();

  //* getuserdata fucntion
  async function getUserData() {
    const { data, status } = await useGet("acc/get");
    console.log(data, status);
    if (status === 200) {
      setaccounts(data.accounts);
      //   let total = data.accounts.reduce((tot, acc) => tot + acc.balance, 0);
      //   console.log(total);
      //   settotal(total);

      setisLoading(false);
    } else if (status === 403) {
      setisLoading(false);
      setaccounts([]);
      toast.warn("You Are Unauthorized, Please Login Again! ");
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <div className="p-3 m-3 rounded-xl bg-background shadow-md  text-white">
        <h2 className="text-3xl p-2 my-1 text-hover font-semibold">
          Your Accounts{" "}
          <Link href="/accounts">
            <a className="text-sm font-thin text-black">See All</a>
          </Link>
        </h2>
        <div className="sm:flex md:flex justify-start gap-3">
          {" "}
          {accounts.slice(0, 4).map((acc, id) => (
            <div
              key={id}
              className={
                acc.accType === "Personal"
                  ? "p-3 m-2 rounded-md bg-personal w-auto md:w-auto md:p-4 md:m-4"
                  : acc.accType === "Enterprice"
                  ? "p-3 m-2 rounded-md bg-enterprice w-auto md:w-auto md:p-4 md:m-4"
                  : "p-3 m-2 rounded-md bg-official w-auto md:w-auto md:p-4 md:m-4"
              }
            >
              <span className="text-xl p-2">{acc.accName.toUpperCase()}</span>
              <h3 className="rounded-md text-3xl px-2 py-1 ">
                <Link href={`/accountdetails/${acc._id}`}>
                  {`₹${acc.balance}`}
                </Link>
              </h3>
            </div>
          ))}
          <div className="p-3 m-2 rounded-md bg-gray-600 w-auto md:w-auto md:p-4 md:m-4">
            <h3 className="rounded-md text-4xl px-2 py-1  font-bold">
              <button
                onClick={() =>
                  router.push({
                    pathname: "/accounts",
                    query: { showadd: "open" },
                  })
                }
              >
                +
              </button>
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Accounts;
