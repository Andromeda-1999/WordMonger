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
  storyDeleted: false,
};

export const Slice = createSlice({
  name: "Stories",
  initialState,
  reducers: {
    StoriesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.entities = entities;
      state.totalCount = totalCount;
      state.individual = null;
      state.notification = null;
      state.viewMode = null;
      state.listLoading = false;
      state.entityForEdit = null;


    },
    StoriesFetchedByID: (state, action) => {
      state.entityForEdit = action.payload;
      state.individual = null;
      state.notification = null;
      state.viewMode = null;
      state.listLoading = false;


    },
    StoriesUpdated: (state, action) => {
      const { story } = action.payload;
      state.individual = story;
      state.notification = null;
      state.viewMode = null;
      state.listLoading = false;

    },
    StoriesCreated: (state, action) => {
      const { story } = action.payload;
      state.entityForEdit = undefined;
      state.individual = story;
      state.notification = null;
      state.viewMode = null;
    },
    StoriesDeleted: (state, action) => {
      state.storyDeleted = true;
      state.individual = null;
      state.notification = null;
      state.viewMode = null;
    },
    StoriesDeletedByID: (state, action) => {
      state.storyDeleted = true
      state.individual = null;
      state.notification = null;
      state.viewMode = null;
    }
  },
});
