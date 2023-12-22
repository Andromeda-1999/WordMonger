import * as crud from "./crud";
import { Slice } from "./slice";
const { actions } = Slice;

export const fetchRatings = () => (dispatch) => {
  return crud.fetchRatings()
    .then((response) => {
      const { data } = response;
      console.log(data);
      dispatch(
        actions.RatingsFetched({ totalCount: data.length, entities: data })
      );
    })
    .catch((err) => {
      console.log(`There is a error fetching get all request ${err}`);
    });
};

export const fetchRatingsByID = (idRating) => (dispatch) => {
  return crud.fetchRatingsByID(idRating)
    .then((response) => {
      const { data } = response;
      console.log(data);
      dispatch(
        actions.RatingsFetchedByID(idRating)
      );
    })
    .catch((err) => {
      console.log(`There is a error fetching get all request ${err} by id`);
    });
};
export const createRatings = (rating) => (dispatch) => {
  return crud.createRatings({ rating })
    .then((response) => {
      const { data } = response;
      console.log(data);
      dispatch(
        actions.RatingsCreated({ rating })
      );
    })
    .catch((err) => {
      console.log(`There is a error creating post request ${err}`);
    });
};

export const updateRatings = (queryParams) => (dispatch) => {
  return crud.updateRatings(queryParams)
    .then((response) => {
      const { data } = response;
      console.log(data);
      dispatch(
        actions.RatingsUpdated(queryParams)
      );
    })
    .catch((err) => {
      console.log(`There is a error updating put request ${err}`);
    });
};

export const deleteRatings = () => (dispatch) => {
  return crud.deleteRatings()
    .then((response) => {
      const { data } = response;
      console.log(data);
      dispatch(
        actions.RatingsDeleted()
      );
    })
    .catch((err) => {
      console.log(`There is a error deleting delete request ${err}`);
    });
};

export const deleteRatingsByID = (queryParams) => (dispatch) => {
  return crud.deleteRatingsByID(queryParams)
    .then((response) => {
      const { data } = response;
      console.log(data);
      dispatch(
        actions.RatingsDeletedByID({ queryParams })
      );
    })
    .catch((err) => {
      console.log(`There is a error deleting delete request ${err} by id`);
    });
};

