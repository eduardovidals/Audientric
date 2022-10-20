import axios from "axios";
import {useAxios} from "apis/hooks/useAxios";

const baseURL = process.env.REACT_APP_API_URL + '/api/users';

const api = axios.create({baseURL})

export const getUsers = () =>
  api.get("/").then(res => res.data);

export const useGetUsersGET = () =>
  useAxios(baseURL, {
    method: "GET"
  });


export const createUser = (data: { fullName: string }) => {
  const {fullName} = data;

  return api.post("/", {fullName}).then(res => res.data);
}
