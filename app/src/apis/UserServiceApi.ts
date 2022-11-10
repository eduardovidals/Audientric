import axios from "axios";
import {useAxios} from "apis/hooks/useAxios";

const baseURL = process.env.REACT_APP_API_URL + '/api/users';

const api = axios.create({baseURL})

export const getUsers = () =>
  api.get('').then(res => res.data);

export const useGetUsersGET = () =>
  useAxios(baseURL, {
    method: "GET"
  });

export const createUser = (data: { fullName: string }) =>
  api.post('', data).then(res => res.data);

export const deleteUser = (data: { userId: string }) =>
  api.delete(`/${data.userId}`).then(res => res.data)

export const updateIssues = (data: { userId: string, issue: string }) => {
  const {userId, ...rest} = data;

  return api.put(`/${userId}/issues`, rest).then(res => res.data);
}

export const updateAnswers = (data: { userId: string, answer: string }) => {
  const {userId, ...rest} = data;

  return api.put(`/${userId}/answers`, rest).then(res => res.data);
}

export const updateStatus = (data: { userId: string, status: string }) => {
  const {userId, ...rest} = data;

  return api.put(`${userId}/status`, rest).then(res => res.data);
}
