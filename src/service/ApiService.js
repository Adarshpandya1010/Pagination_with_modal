// improt axios
import axios from "axios";

//function for hit get request
export const GET_API = async (url) => {
  return await axios.get(url);
};
