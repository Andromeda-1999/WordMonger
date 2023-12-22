import { toast } from 'react-toastify';
import * as crud from "./crud";
import { Slice } from "./slice";
const { actions } = Slice;

export const fetchStories = (params) => (dispatch) => {
  return crud.fetchStories(params)
    .then((response) => {
      const { data } = response;
      console.log(data);
      dispatch(
        actions.StoriesFetched({ totalCount: data.length, entities: data })
      );
    })
    .catch((err) => {
      console.log(`There is a error fetching get all request ${err}`);
    });
};

export const fetchStoriesByID = (idStory) => (dispatch) => {
  return crud.fetchStoriesByID(idStory)
    .then((response) => {
      const { data } = response;
      console.log(data);
      dispatch(
        actions.StoriesFetchedByID(data)
      );
    })
    .catch((err) => {
      toast.error(`There is a error fetching get all request ${err} by id`);
    });
};

export const createStories = ({ story }) => (dispatch) => {
  return crud.createStories({ story })
    .then((response) => {
      const { data } = response;
      console.log(data);
      dispatch(
        actions.StoriesCreated({ story: data })
      );
    })
    .catch((err) => {
      console.log(`There is a error creating post request ${err}`);
    });
};

export const updateStories = ({ story }) => (dispatch) => {
  return crud.updateStories({ story })
    .then((response) => {
      const { data } = response;
      console.log(data);
      dispatch(
        actions.StoriesUpdated({ story })
      );
    })
    .catch((err) => {
      console.log(`There is a error creating post request ${err}`);
    });
};

export const deleteStories = () => (dispatch) => {
  return crud.deleteStories()
    .then((response) => {
      const { data } = response;
      console.log(data);
      dispatch(
        actions.StoriesDeleted()
      );
    })
    .catch((err) => {
      console.log(`There is a error deleting delete request ${err}`);
    });
};

export const deleteStoriesByID = (queryParams) => (dispatch) => {
  return crud.deleteStoriesByID(queryParams)
    .then((response) => {
      const { data } = response;
      console.log(data);
      dispatch(
        actions.StoriesDeletedByID({ queryParams })
      );
    })
    .catch((err) => {
      console.log(`There is a error deleting delete request ${err} by id`);
    });
};


