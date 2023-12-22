import * as crud from "./crud";
import { Slice } from "./slice";
const { actions } = Slice;

export const fetchStory_Genres = () => (dispatch) => {
  return crud.fetchStory_Genres()
    .then((response) => {
      const { data } = response;
      console.log(data);
      dispatch(
        actions.Story_GenresFetched({ totalCount: data.length, entities: data })
      );
    })
    .catch((err) => {
      console.log(`There is a error fetching get all request ${err}`);
    });
};

export const fetchStory_GenreByID = (idStory_Genre) => (dispatch) => {
  return crud.fetchStory_GenreByID(idStory_Genre)
    .then((response) => {
      const { data } = response;
      console.log(data);
      dispatch(
        actions.Story_GenresFetchedByID(idStory_Genre)
      );
    })
    .catch((err) => {
      console.log(`There is a error fetching get all request ${err} by id`);
    });
};
export const createStory_Genre = (story_genre) => (dispatch) => {
  return crud.createStory_Genre(story_genre)
    .then((response) => {
      const { data } = response;
      console.log(data);
      dispatch(
        actions.Story_GenresCreated({ story_genre })
      );
    })
    .catch((err) => {
      console.log(`There is a error creating post request ${err}`);
    });
};

export const updateStory_Genre = (queryParams) => (dispatch) => {
  return crud.updateStory_Genre(queryParams)
    .then((response) => {
      const { data } = response;
      console.log(data);
      dispatch(
        actions.Story_GenresUpdated(queryParams)
      );
    })
    .catch((err) => {
      console.log(`There is a error updating put request ${err}`);
    });
};

export const deleteStory_Genre = () => (dispatch) => {
  return crud.deleteStory_Genre()
    .then((response) => {
      const { data } = response;
      console.log(data);
      dispatch(
        actions.Story_GenresDeleted()
      );
    })
    .catch((err) => {
      console.log(`There is a error deleting delete request ${err}`);
    });
};

export const deleteStory_GenreByID = (queryParams) => (dispatch) => {
  return crud.deleteStory_GenreByID(queryParams)
    .then((response) => {
      const { data } = response;
      console.log(data);
      dispatch(
        actions.Story_GenresDeletedByID({ queryParams })
      );
    })
    .catch((err) => {
      console.log(`There is a error deleting delete request ${err} by id`);
    });
};

export const updateAllStoryGenres = (queryParams) => (dispatch) => {
  return crud.updateAllStoryGenres(queryParams)
    .then((response) => {
      const { data } = response;
      console.log(data);
      dispatch(
        actions.Story_GenresUpdated(queryParams)
      );
    })
    .catch((err) => {
      console.log(`There is a error updating put request ${err}`);
    });
};


