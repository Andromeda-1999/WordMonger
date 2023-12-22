import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listLoading: false,
  entities: null,
  individual: null,
  totalCount: 0,
  notification: null,
  viewMode: null,
  auth: null,
  entityForEdit: undefined,
  userDeleted: false,
};

export const Slice = createSlice({
  name: "Users",
  initialState,
  reducers: {
    UsersFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.entities = entities;
      state.totalCount = totalCount;
      state.individual = null;
      state.notification = null;
      state.viewMode = null;
      state.listLoading = false;

    },
    UsersFetchedByID: (state, action) => {
      state.entityForEdit = action.payload.userForEdit;
      state.individual = null;
      state.notification = null;
      state.viewMode = null;
      state.listLoading = false;


    },
    UsersUpdated: (state, action) => {
      const { user } = action.payload;
      state.individual = null;
      state.notification = null;
      state.viewMode = null;
      state.listLoading = false;

    },
    UsersCreated: (state, action) => {
      state.entityForEdit = undefined;
      state.individual = null;
      state.notification = null;
      state.viewMode = null;
    },
    UsersDeleted: (state, action) => {
      state.userDeleted = true;
      state.individual = null;
      state.notification = null;
      state.viewMode = null;
    },
    UsersDeletedByID: (state, action) => {
      state.userDeleted = true
      state.individual = null;
      state.notification = null;
      state.viewMode = null;
    },
    UsersLoginIn: (state, action)=> {

    }
  },
});
