import axios from 'axios';

export const Chapters_URL = "http://localhost:3006/chapter";
export function fetchChapters(storyId) {
  return axios.get(`${Chapters_URL}?storyId=${storyId}`);
}

export function fetchChaptersByID({ idChapter }) {
  return axios.get(`${Chapters_URL}/${idChapter}`);
}
export function createChapters({ chapter }) {
  return axios.post(Chapters_URL, { ...chapter });
}
export function updateChapters({ chapter, idChapter }) {
  return axios.put(`${Chapters_URL}/${chapter.idChapter}`, { ...chapter });
}
export function deleteChapters() {
  return axios.delete(Chapters_URL);
}
export function deleteChaptersByID({ idChapter }) {
  return axios.delete(`${Chapters_URL}/${idChapter}`);
}
