import axios from 'axios';

export const Stories_URL = "http://localhost:3006/story";
export function fetchStories(params) {
  if(params) {
    return axios.get(`${Stories_URL}/filters?title=${params.name}&chapter=${params.name}`);
  } else {
    return axios.get(Stories_URL);
  }
}

export function fetchStoriesByID(idStory) {
  return axios.get(`${Stories_URL}/${idStory}`);
}
export function createStories({ story }) {
  return axios.post(Stories_URL, story);
}
export function updateStories({ story }) {
  return axios.put(`${Stories_URL}/${story.idStory}`, story);
}
export function deleteStories() {
  return axios.delete(Stories_URL);
}
export function deleteStoriesByID({ idStory }) {
  return axios.delete(`${Stories_URL}/${idStory}`);
}
