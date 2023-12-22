import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
//import createSagaMiddleware from "redux-saga";
import {rootReducer} from "./rootReducer";

//const sagaMiddleware = createSagaMiddleware();

const middleware = [
    ...getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
      thunk: true
    }),
    //sagaMiddleware
  ];

const store = configureStore({
    reducer: rootReducer,
  middleware,
})
//sagaMiddleware.run(rootSaga);
export default store;