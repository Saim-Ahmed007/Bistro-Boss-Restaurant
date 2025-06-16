import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://bistro-boss-backend-xx5a.onrender.com",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
