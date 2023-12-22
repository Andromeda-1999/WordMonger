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
  readersprogressDeleted: false,
};

export const Slice = createSlice({
  name: "ReadersProgress",
  initialState,
  reducers: {
    ReadersProgressFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.entities = entities;
      state.totalCount = totalCount;
      state.individual = null;
      state.notification = null;
      state.viewMode = null;
      state.listLoading = false;

    },
    ReadersProgressFetchedByID: (state, action) => {
      state.entityForEdit = action.payload.readersprogressForEdit;
      state.individual = null;
      state.notification = null;
      state.viewMode = null;
      state.listLoading = false;


    },
    ReadersProgressUpdated: (state, action) => {
      const { readersprogress } = action.payload;
      state.individual = null;
      state.notification = null;
      state.viewMode = null;
      state.listLoading = false;

    },
    ReadersProgressCreated: (state, action) => {
      state.entityForEdit = undefined;
      state.individual = null;
      state.notification = null;
      state.viewMode = null;
    },
    ReadersProgressDeleted: (state, action) => {
      state.readersprogressDeleted = true;
      state.individual = null;
      state.notification = null;
      state.viewMode = null;
    },
    ReadersProgressDeletedByID: (state, action) => {
      state.readersprogressDeleted = true
      state.individual = null;
      state.notification = null;
      state.viewMode = null;
    }
  },
});
