import * as crud from "./crud";
import { Slice } from "./slice";
const { actions } = Slice;

export const fetchReadersProgress = () => (dispatch) => {
  return crud.fetchReadersProgress()
    .then((response) => {
      const { data } = response;
      console.log(data);
      dispatch(
        actions.ReadersProgressFetched({ totalCount: data.length, entities: data })
      );
    })
    .catch((err) => {
      console.log(`There is a error fetching get all request ${err}`);
    });
};

export const fetchReadersProgressByID = (idReadersProgress) => (dispatch) => {
  return crud.fetchReadersProgressByID(idReadersProgress)
    .then((response) => {
      const { data } = response;
      console.log(data);
      dispatch(
        actions.ReadersProgressFetchedByID(idReadersProgress)
      );
    })
    .catch((err) => {
      console.log(`There is a error fetching get all request ${err} by id`);
    });
};

export const createReadersProgress = ({ story, chapter }) => (dispatch) => {
  return crud.createReadersProgress({ story, chapter })
    .then((response) => {
      const { data } = response;
      console.log(data);
      dispatch(
        actions.ReadersProgressCreated({ story, chapter })
      );
    })
    .catch((err) => {
      console.log(`There is a error creating post request ${err}`);
    });
};

export const updateReadersProgress = (queryParams) => (dispatch) => {
  return crud.updateReadersProgress(queryParams)
    .then((response) => {
      const { data } = response;
      console.log(data);
      dispatch(
        actions.ReadersProgressUpdated(queryParams)
      );
    })
    .catch((err) => {
      console.log(`There is a error updating put request ${err}`);
    });
};

export const deleteReadersProgress = () => (dispatch) => {
  return crud.deleteReadersProgress()
    .then((response) => {
      const { data } = response;
      console.log(data);
      dispatch(
        actions.ReadersProgressDeleted()
      );
    })
    .catch((err) => {
      console.log(`There is a error deleting delete request ${err}`);
    });
};

export const deleteReadersProgressByID = (queryParams) => (dispatch) => {
  return crud.deleteReadersProgressByID(queryParams)
    .then((response) => {
      const { data } = response;
      console.log(data);
      dispatch(
        actions.ReadersProgressDeletedByID({ queryParams })
      );
    })
    .catch((err) => {
      console.log(`There is a error deleting delete request ${err} by id`);
    });
};

