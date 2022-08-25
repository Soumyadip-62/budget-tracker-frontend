
// import { useContext } from "react";
// import { ContextProvider } from "../Context/ContextApi";
export default function UseApi() {
  // ?useful variables
  // const context = useContext(ContextProvider);
  const url =" http://localhost:1337/";
  const token ="" //JSON.parse(localStorage.getItem("user"));

  //!function for GET -----
  const useGet = async (route) => {
    const headers = {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "access-control-allow-origin": "*",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        // Authorization: "Bearer " + token.data.token,
      },
    };
    let status;
    let response;
    await fetch(url + route, headers)
      .then((response) => {
        status = response.status;
        return response.json();
      })
      .then((res) => {
        response = res;
      });
    const res = { "status": status, "data": response };
    return res
  };
  //!Function for POST -----
  const usePost = async (route, data) => {
    const header = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "access-control-allow-origin": "*",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        // Authorization: "Bearer " + token.data.token,
      },
    };
    let status;
    let response;
    await fetch(url + route, header)
      .then((response) => {
        status = response.status;
        return response.json();
      })
      .then((res) => {
        response = res;
      });
    const res = { "status": status, "data": response };
    return res
  };

  //!function for PUT
  const usePut = async (route, data) => {
    const header = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "access-control-allow-origin": "*",
        "Access-Control-Allow-Origin": "http://127.0.0.1:3000",
        Authorization: "Bearer " + token.data.token,
      },
    };
    let status;
    let response;
    await fetch(url + route, header)
      .then((response) => {
        status = response.status;
        return response.json();
      })
      .then((res) => {
        response = res.data;
      });
    const res = { "status": status, "data": response };
    return res
  };
  //! return statement
  return { useGet, usePost, usePut };
}
