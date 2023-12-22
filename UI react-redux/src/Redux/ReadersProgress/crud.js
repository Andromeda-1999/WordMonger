import axios from 'axios';

export const ReadersProgress_URL = "http://localhost:3006/readersprogress";
export function fetchReadersProgress() {
  return axios.get(ReadersProgress_URL);
}

export function fetchReadersProgressByID({ idReadersProgress }) {
  return axios.get(`${ReadersProgress_URL}/${idReadersProgress}`);
}
export function createReadersProgress({ story, chapter }) {
  return axios.post(ReadersProgress_URL, { chapter, user: 8 });
}
export function updateReadersProgress({ readersprogress, idReadersProgress }) {
  return axios.put(`${ReadersProgress_URL}/${readersprogress.idReadersProgress}`, { ...readersprogress });
}
export function deleteReadersProgress() {
  return axios.delete(ReadersProgress_URL);
}
export function deleteReadersProgressByID({ idReadersProgress }) {
  return axios.delete(`${ReadersProgress_URL}/${idReadersProgress}`);
}
