import React from 'react'
import Table from '../components/themes/Table';
import Layout from '../layout/Layout';
const accounts = () => {
  const data = [
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
    },
  ];

  const headers = ["Title", "Year"];
  const fields = ["title", "year"];
  return (
    <div> <div className="p-4 m-4 rounded-md bg-background w-full max-w-xs">
        <span className="text-3xl p-3">Accounts</span>
        <button className="rounded-full px-2 py-1 bg-hover text-white">Add +</button>
      </div><Table data={data} headers={headers} fields={fields} /></div>
  )
}

accounts.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export default accounts