import { configureStore } from "@reduxjs/toolkit";
import jokeReducer from "./reducers/jokeSlice";
import { apiSlice } from "./api/apiSlice";

export const store = configureStore({
  reducer: {
    joke: jokeReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
