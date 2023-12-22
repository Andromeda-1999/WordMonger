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
  story_genreDeleted: false,
};

export const Slice = createSlice({
  name: "Story_Genres",
  initialState,
  reducers: {
    Story_GenresFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.entities = entities;
      state.totalCount = totalCount;
      state.individual = null;
      state.notification = null;
      state.viewMode = null;
      state.listLoading = false;

    },
    Story_GenresFetchedByID: (state, action) => {
      state.entityForEdit = action.payload.story_genreForEdit;
      state.individual = null;
      state.notification = null;
      state.viewMode = null;
      state.listLoading = false;


    },
    Story_GenresUpdated: (state, action) => {
      const { story_genre } = action.payload;
      state.individual = null;
      state.notification = null;
      state.viewMode = null;
      state.listLoading = false;

    },
    Story_GenresCreated: (state, action) => {
      state.entityForEdit = undefined;
      state.individual = null;
      state.notification = null;
      state.viewMode = null;
    },
    Story_GenresDeleted: (state, action) => {
      state.story_genreDeleted = true;
      state.individual = null;
      state.notification = null;
      state.viewMode = null;
    },
    Story_GenresDeletedByID: (state, action) => {
      state.story_genreDeleted = true
      state.individual = null;
      state.notification = null;
      state.viewMode = null;
    }
  },
});
