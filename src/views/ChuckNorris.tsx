import React from "react";
import { Joke, Search, CategoryPicker, Footer } from "../components";

export const ChuckNorris = () => {
  return (
    <div className="chuck-norris">
      <CategoryPicker />
      <div className="joke">
        <Joke />
        <Search />
      </div>
      <Footer />
    </div>
  );
};
