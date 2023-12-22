import axios from 'axios';

export const Genres_URL = "http://localhost:3006/genre";
export function fetchGenres() {
  return axios.get(Genres_URL);
}

export function fetchGenresByID({ idGenre }) {
  return axios.get(`${Genres_URL}/${idGenre}`);
}
export function createGenres({ genre }) {
  return axios.post(Genres_URL, { ...genre });
}
export function updateGenres({ genre, idGenre }) {
  return axios.put(`${Genres_URL}/${genre.idGenre}`, { ...genre });
}
export function deleteGenres() {
  return axios.delete(Genres_URL);
}
export function deleteGenresByID({ idGenre }) {
  return axios.delete(`${Genres_URL}/${idGenre}`);
}
