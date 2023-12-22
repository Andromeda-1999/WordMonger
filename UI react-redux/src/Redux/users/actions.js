import * as crud from "./crud";
import { Slice } from "./slice";
const { actions } = Slice;

export const fetchUsers = () => (dispatch) => {
  return crud.fetchUsers()
    .then((response) => {
      const { data } = response;
      console.log(data);
      dispatch(
        actions.UsersFetched({ totalCount: data.length, entities: data })
      );
    })
    .catch((err) => {
      console.log(`There is a error fetching get all request ${err}`);
    });
};

export const fetchUsersByID = (idUser) => (dispatch) => {
  return crud.fetchUsersByID(idUser)
    .then((response) => {
      const { data } = response;
      console.log(data);
      dispatch(
        actions.UsersFetchedByID(idUser)
      );
    })
    .catch((err) => {
      console.log(`There is a error fetching get all request ${err} by id`);
    });
};
export const createUsers = (user) => (dispatch) => {
  console.log('here')
  return crud.createUsers({ user })
    .then((response) => {
      const { data } = response;
      console.log(response);
      dispatch(
        actions.UsersCreated({ user })
      );
      return response;
    })
    .catch((err) => {
      console.log(`There is a error creating post request ${err}`);
    });
};

export const updateUsers = (queryParams) => (dispatch) => {
  return crud.updateUsers(queryParams)
    .then((response) => {
      const { data } = response;
      console.log(data);
      dispatch(
        actions.UsersUpdated(queryParams)
      );
    })
    .catch((err) => {
      console.log(`There is a error updating put request ${err}`);
    });
};

export const deleteUsers = () => (dispatch) => {
  return crud.deleteUsers()
    .then((response) => {
      const { data } = response;
      console.log(data);
      dispatch(
        actions.UsersDeleted()
      );
    })
    .catch((err) => {
      console.log(`There is a error deleting delete request ${err}`);
    });
};

export const deleteUsersByID = (queryParams) => (dispatch) => {
  return crud.deleteUsersByID(queryParams)
    .then((response) => {
      const { data } = response;
      console.log(data);
      dispatch(
        actions.UsersDeletedByID({ queryParams })
      );
    })
    .catch((err) => {
      console.log(`There is a error deleting delete request ${err} by id`);
    });
};


export const loginUser = (user) => (dispatch) => {
  return crud.loginUser({ user })
    .then((response) => {
      const { data } = response;
      console.log(data);
      dispatch(
        actions.UsersLoginIn({ user })
      );
      return response;
    })
    .catch((err) => {
      console.log(`There is a error creating post request ${err}`);
    });
};
