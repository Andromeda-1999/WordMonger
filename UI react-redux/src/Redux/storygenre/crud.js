import axios from 'axios';

export const Story_Genre_URL = "http://localhost:3006/story_genre";
export function fetchStory_Genres() {
  return axios.get(Story_Genre_URL);
}

export function fetchStory_GenreByID({ idStory_Genre }) {
  return axios.get(`${Story_Genre_URL}/${idStory_Genre}`);
}
export function createStory_Genre(story_genre) {
  return axios.post(Story_Genre_URL, story_genre);
}
export function updateStory_Genre({ story_genre, idStory_Genre }) {
  return axios.put(`${Story_Genre_URL}/${story_genre.idStory_Genre}`, { ...story_genre });
}
export function deleteStory_Genre() {
  return axios.delete(Story_Genre_URL);
}
export function deleteStory_GenreByID({ idStory_Genre }) {
  return axios.delete(`${Story_Genre_URL}/${idStory_Genre}`);
}
export function updateAllStoryGenres(params) {
  return axios.put(`${Story_Genre_URL}/${params.story_id}/BulkUpdate`, params);
}
