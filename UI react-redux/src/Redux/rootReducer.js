import { combineReducers } from "redux";
import { Slice as StoriesSlice } from './stories/slice';
import { Slice as UsersSlice } from './users/slice';
import { Slice as ChaptersSlice } from './chapters/slice';
import { Slice as RatingsSlice } from './ratings/slice';
import { Slice as GenresSlice } from './genres/slice';
import { Slice as ReadersProgressSlice } from './ReadersProgress/slice';
import { Slice as StoryGenreSlice } from './storygenre/slice';


export const rootReducer = combineReducers({
    stories: StoriesSlice.reducer,
    Users: UsersSlice.reducer,
    chapters: ChaptersSlice.reducer,
    ratings: RatingsSlice.reducer,
    genres: GenresSlice.reducer,
    storygenre: StoryGenreSlice.reducer,
    ReadersProgress: ReadersProgressSlice.reducer
})