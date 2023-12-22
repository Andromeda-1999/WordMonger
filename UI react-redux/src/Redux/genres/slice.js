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
  genreDeleted: false,
};

export const Slice = createSlice({
  name: "Genres",
  initialState,
  reducers: {
    GenresFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.entities = entities;
      state.totalCount = totalCount;
      state.individual = null;
      state.notification = null;
      state.viewMode = null;
      state.listLoading = false;

    },
    GenresFetchedByID: (state, action) => {
      state.entityForEdit = action.payload.genreForEdit;
      state.individual = null;
      state.notification = null;
      state.viewMode = null;
      state.listLoading = false;


    },
    GenresUpdated: (state, action) => {
      const { genre } = action.payload;
      state.individual = null;
      state.notification = null;
      state.viewMode = null;
      state.listLoading = false;

    },
    GenresCreated: (state, action) => {
      state.entityForEdit = undefined;
      state.individual = null;
      state.notification = null;
      state.viewMode = null;
    },
    GenresDeleted: (state, action) => {
      state.genreDeleted = true;
      state.individual = null;
      state.notification = null;
      state.viewMode = null;
    },
    GenresDeletedByID: (state, action) => {
      state.genreDeleted = true
      state.individual = null;
      state.notification = null;
      state.viewMode = null;
    }
  },
});
