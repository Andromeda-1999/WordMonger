import * as crud from "./crud";
import { Slice } from "./slice";
const { actions } = Slice;

export const fetchChapters = (storyId) => (dispatch) => {
  console.log(storyId)
  return crud.fetchChapters(storyId)
    .then((response) => {
      const { data } = response;
      console.log(data);
      dispatch(
        actions.ChaptersFetched({ totalCount: data.length, entities: data })
      );
    })
    .catch((err) => {
      console.log(`There is a error fetching get all request ${err}`);
    });
};

export const fetchChaptersByID = (idChapter) => (dispatch) => {
  return crud.fetchChaptersByID(idChapter)
    .then((response) => {
      const { data } = response;
      console.log(data);
      dispatch(
        actions.ChaptersFetchedByID(idChapter)
      );
    })
    .catch((err) => {
      console.log(`There is a error fetching get all request ${err} by id`);
    });
};

export const createChapters = ({ chapter }) => (dispatch) => {
  return crud.createChapters({ chapter })
    .then((response) => {
      const { data } = response;
      console.log(data);
      dispatch(
        actions.ChaptersCreated({ chapter })
      );
      return response;
    })
    .catch((err) => {
      console.log(`There is a error creating post request ${err}`);
    });
};

export const updateChapters = (queryParams) => (dispatch) => {
  return crud.updateChapters(queryParams)
    .then((response) => {
      const { data } = response;
      console.log(data);
      dispatch(
        actions.ChaptersUpdated(queryParams)
      );
    })
    .catch((err) => {
      console.log(`There is a error updating put request ${err}`);
    });
};

export const deleteChapters = () => (dispatch) => {
  return crud.deleteChapters()
    .then((response) => {
      const { data } = response;
      console.log(data);
      dispatch(
        actions.ChaptersDeleted()
      );
    })
    .catch((err) => {
      console.log(`There is a error deleting delete request ${err}`);
    });
};

export const deleteChaptersByID = (queryParams) => (dispatch) => {
  return crud.deleteChaptersByID(queryParams)
    .then((response) => {
      const { data } = response;
      console.log(data);
      dispatch(
        actions.ChaptersDeletedByID({ queryParams })
      );
      return response;
    })
    .catch((err) => {
      console.log(`There is a error deleting delete request ${err} by id`);
    });
};

