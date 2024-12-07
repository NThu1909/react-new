import axios from "axios";
import { API_URL } from "../components/Constant/Constant";

export const doFetch = (url, method, body, jwt) => {
  const fullUrl = `${API_URL}/${url}`;

  const options = {
    url: fullUrl,
    method: method,
  };

  if (body) {
    options.data = body;
  }

  if (jwt) {
    const token = localStorage.getItem("token");
    options.headers = { Authorization: `Bearer ${token.replaceAll(`"`, "")}` };
  }
  return axios(options).catch((err) => console.log(err));
};
