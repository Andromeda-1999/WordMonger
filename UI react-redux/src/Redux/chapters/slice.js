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
  chapterDeleted: false,
};

export const Slice = createSlice({
  name: "Chapters",
  initialState,
  reducers: {
    ChaptersFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.entities = entities;
      state.totalCount = totalCount;
      state.individual = null;
      state.notification = null;
      state.viewMode = null;
      state.listLoading = false;

    },
    ChaptersFetchedByID: (state, action) => {
      state.entityForEdit = action.payload;
      state.individual = null;
      state.notification = null;
      state.viewMode = null;
      state.listLoading = false;


    },
    ChaptersUpdated: (state, action) => {
      const { chapter } = action.payload;
      state.individual = chapter;
      state.notification = null;
      state.viewMode = null;
      state.listLoading = false;

    },
    ChaptersCreated: (state, action) => {
      state.entityForEdit = undefined;
      state.individual = null;
      state.notification = null;
      state.viewMode = null;
    },
    ChaptersDeleted: (state, action) => {
      state.chapterDeleted = true;
      state.individual = null;
      state.notification = null;
      state.viewMode = null;
    },
    ChaptersDeletedByID: (state, action) => {
      state.chapterDeleted = true
      state.individual = null;
      state.notification = null;
      state.viewMode = null;
    }
  },
});
