import axios from 'axios';

export const Users_URL = "http://localhost:3006/user";

export const Login_URL = "http://localhost:3006/login";
export function fetchUsers() {
  return axios.get(Users_URL);
}

export function fetchUsersByID({ idUser }) {
  return axios.get(`${Users_URL}/${idUser}`);
}
export function createUsers({ user }) {
  return axios.post(Users_URL, { ...user });
}
export function updateUsers({ user, idUser }) {
  return axios.put(`${Users_URL}/${user.idUser}`, { ...user });
}
export function deleteUsers() {
  return axios.delete(Users_URL);
}
export function deleteUsersByID({ idUser }) {
  return axios.delete(`${Users_URL}/${idUser}`);
}
export function loginUser({ user }) {
  return axios.post(`${Login_URL}`, {...user});
}
