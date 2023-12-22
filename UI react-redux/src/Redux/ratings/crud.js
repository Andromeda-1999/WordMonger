import axios from 'axios';

export const Ratings_URL = "http://localhost:3006/rating";
export function fetchRatings() {
  return axios.get(Ratings_URL);
}

export function fetchRatingsByID({ idRating }) {
  return axios.get(`${Ratings_URL}/${idRating}`);
}
export function createRatings({ rating }) {
  return axios.post(Ratings_URL, { ...rating });
}
export function updateRatings({ rating, idRating }) {
  return axios.put(`${Ratings_URL}/${rating.idRating}`, { ...rating });
}
export function deleteRatings() {
  return axios.delete(Ratings_URL);
}
export function deleteRatingsByID({ idRating }) {
  return axios.delete(`${Ratings_URL}/${idRating}`);
}
