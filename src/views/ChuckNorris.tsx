import React from "react";
import { Joke, Search, CategoryPicker } from "../components";

export const ChuckNorris = () => {
  return (
    <>
      <CategoryPicker />
      <Joke />
      <Search />
    </>
  );
};
