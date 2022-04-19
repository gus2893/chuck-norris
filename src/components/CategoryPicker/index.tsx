import React, { useState, useEffect } from "react";
import {
  useLazyGetJokeByCategoryQuery,
  useGetCategoriesQuery,
} from "../../redux/api/apiSlice";
import { useAppDispatch } from "../../redux/hooks";
import { updateJoke } from "../../redux/reducers/jokeSlice";
import { capitalizeFirstLetter, categoryImages } from "./utils";

export const CategoryPicker = () => {
  const [value, setValue] = useState<string>("");
  const { data: categories, isSuccess } = useGetCategoriesQuery();
  const [trigger, result] = useLazyGetJokeByCategoryQuery();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (result.isSuccess) dispatch(updateJoke(result.data.value));
  }, [result, dispatch]);

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
    <div className="category-picker">
      <div>
        <img
          src={categoryImages[value]}
          alt="chuck norris the GOAT"
          width="250"
          height="250"
        />
        <h1>Chuck Norris</h1>
        <h3>Random Facts</h3>
        <select onChange={handleChange} value={value}>
          <option value="">Select Category</option>
          {renderCategories()}
        </select>
      </div>
    </div>
  );
};
