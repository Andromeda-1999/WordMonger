import * as crud from "./crud";
import { Slice } from "./slice";
const { actions } = Slice;

export const fetchGenres = () => (dispatch) => {
  return crud.fetchGenres()
    .then((response) => {
      const { data } = response;
      console.log(data);
      dispatch(
        actions.GenresFetched({ totalCount: data.length, entities: data })
      );
    })
    .catch((err) => {
      console.log(`There is a error fetching get all request ${err}`);
    });
};

export const fetchGenresByID = (idGenre) => (dispatch) => {
  return crud.fetchGenresByID(idGenre)
    .then((response) => {
      const { data } = response;
      console.log(data);
      dispatch(
        actions.GenresFetchedByID(idGenre)
      );
    })
    .catch((err) => {
      console.log(`There is a error fetching get all request ${err} by id`);
    });
};
export const createGenres = ({ genre }) => (dispatch) => {
  return crud.createGenres({ genre })
    .then((response) => {
      const { data } = response;
      console.log(data);
      dispatch(
        actions.GenresCreated({ genre })
      );
    })
    .catch((err) => {
      console.log(`There is a error creating post request ${err}`);
    });
};

export const updateGenres = (queryParams) => (dispatch) => {
  return crud.updateGenres(queryParams)
    .then((response) => {
      const { data } = response;
      console.log(data);
      dispatch(
        actions.GenresUpdated(queryParams)
      );
    })
    .catch((err) => {
      console.log(`There is a error updating put request ${err}`);
    });
};

export const deleteGenres = () => (dispatch) => {
  return crud.deleteGenres()
    .then((response) => {
      const { data } = response;
      console.log(data);
      dispatch(
        actions.GenresDeleted()
      );
    })
    .catch((err) => {
      console.log(`There is a error deleting delete request ${err}`);
    });
};

export const deleteGenresByID = (queryParams) => (dispatch) => {
  return crud.deleteGenresByID(queryParams)
    .then((response) => {
      const { data } = response;
      console.log(data);
      dispatch(
        actions.GenresDeletedByID({ queryParams })
      );
    })
    .catch((err) => {
      console.log(`There is a error deleting delete request ${err} by id`);
    });
};

