import React, { useState, useEffect } from "react";
import {
  useLazyGetJokeByCategoryQuery,
  useGetCategoriesQuery,
} from "../../redux/api/apiSlice";
import { useAppDispatch } from "../../redux/hooks";
import { updateJoke } from "../../redux/reducers/jokeSlice";
import { categoryImages } from "./utils";

export const CategoryPicker = () => {
  const [value, setValue] = useState<string>("");
  const { data: categories, isSuccess } = useGetCategoriesQuery();
  const [trigger, result] = useLazyGetJokeByCategoryQuery();

  const dispatch = useAppDispatch();

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  useEffect(() => {
    if (result.isSuccess) dispatch(updateJoke(result.data.value));
  }, [result]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    trigger(e.target.value);
  };

  const renderCategories = () =>
    isSuccess &&
    categories?.map((c: string, indx: number) => (
      <option key={`category-${c}-${indx}`} value={c}>
        {capitalizeFirstLetter(c)}
      </option>
    ));

  return (
    <div>
      <select onChange={handleChange} value={value}>
        <option value="">Select Category</option>
        {renderCategories()}
      </select>
      <div>
        <img
          src={categoryImages[value]}
          alt="chuck norris the GOAT"
          width="250"
          height="250"
        />
        <h2>Chuck Norris</h2>
        <h3>Random Facts</h3>
      </div>
    </div>
  );
};
