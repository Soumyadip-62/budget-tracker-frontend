import React from "react";

function Table({headers, data, fields}) {
 

  
  return (
 
  
    <div className="flex flex-col p-6 my-4">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-center rounded-lg">
              <thead className="bg-background">
                <tr>
                  {headers.map((data, id) => (
                    <th
                      scope="col"
                      className="text-sm font-bold text-gray-900 px-6 py-4" key={id}
                    >
                      {data}
                    </th>
                  ))}
                 
                </tr>
              </thead>
              <tbody className="">
                {data.map((ar, id) => (
                  <tr
                    className="my-6 border shadow-md p-2 hover:bg-background"
                    key={id}
                  >
                    {fields.map((field, id) => (
                      <td
                        className="text-sm text-gray-900 font-semibold px-6 py-4 whitespace-nowrap"
                        key={id}
                      >
                        {ar[field]}
                      </td>
                    ))}
                 
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;
