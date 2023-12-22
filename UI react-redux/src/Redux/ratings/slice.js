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
  ratingDeleted: false,
};

export const Slice = createSlice({
  name: "Ratings",
  initialState,
  reducers: {
    RatingsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.entities = entities;
      state.totalCount = totalCount;
      state.individual = null;
      state.notification = null;
      state.viewMode = null;
      state.listLoading = false;

    },
    RatingsFetchedByID: (state, action) => {
      state.entityForEdit = action.payload.ratingForEdit;
      state.individual = null;
      state.notification = null;
      state.viewMode = null;
      state.listLoading = false;


    },
    RatingsUpdated: (state, action) => {
      const { rating } = action.payload;
      state.individual = null;
      state.notification = null;
      state.viewMode = null;
      state.listLoading = false;

    },
    RatingsCreated: (state, action) => {
      state.entityForEdit = undefined;
      state.individual = null;
      state.notification = null;
      state.viewMode = null;
    },
    RatingsDeleted: (state, action) => {
      state.ratingDeleted = true;
      state.individual = null;
      state.notification = null;
      state.viewMode = null;
    },
    RatingsDeletedByID: (state, action) => {
      state.ratingDeleted = true
      state.individual = null;
      state.notification = null;
      state.viewMode = null;
    }
  },
});
