import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IJoke } from "../../interfaces";

const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const apiSlice = createApi({
  reducerPath: "chuckNorrisapi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.chucknorris.io/jokes" }),
  tagTypes: ["Joke", "Categories"],
  endpoints: (builder) => ({
    getRandomJoke: builder.query<IJoke, void>({
      query: () => "/random",
      providesTags: ["Joke"],
    }),
    getCategories: builder.query<string[], void>({
      query: () => "/categories",
      providesTags: ["Categories"],
    }),
    getJokeByCategory: builder.query<IJoke, string>({
      query: (category: string) => `/random?category=${category}`,
    }),
    searchJoke: builder.query<IJoke, string>({
      query: (searchQuery: string) => `/search?query=${searchQuery}`,
      providesTags: ["Joke"],
      transformResponse: (resp: any) => {
        return resp.result[randomIntFromInterval(0, resp.total - 1)];
      },
    }),
  }),
});

export const {
  useLazyGetRandomJokeQuery,
  useGetCategoriesQuery,
  useLazySearchJokeQuery,
  useLazyGetJokeByCategoryQuery,
} = apiSlice;
