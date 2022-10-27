import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL + '/api/classes';

const api = axios.create({baseURL});

export const createClass = (data: { hostId: string }) =>
  api.post('', data).then(res => res.data);

export const getClassById = (data: { classId: string }) =>
  api.get(`/${data.classId}`).then(res => res.data);

export const getUsersByClassId = (data: { classId: string }) =>
  api.get(`/${data.classId}/users`).then(res => res.data)

export const updateStatus = (data: { classId: string, status: string }) => {
  const {classId, ...rest} = data;
  return api.put(`/${classId || ''}/status`, rest).then(res => res.data);
}

export const joinClass = (data: { classId: string, userId: string }) => {
  const {classId, ...rest} = data;

  return api.put(`/${classId || ''}/users`, rest).then(res => res.data);
}
