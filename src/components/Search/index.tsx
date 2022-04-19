import React, { useState, useEffect } from "react";
import { updateJoke } from "../../redux/reducers/jokeSlice";
import { useAppDispatch } from "../../redux/hooks";
import { useLazySearchJokeQuery } from "../../redux/api/apiSlice";

export const Search = () => {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [trigger, result] = useLazySearchJokeQuery();
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    value.length > 10
      ? setError("Only Chuck Norris can exceed 10 characters in this search")
      : setError("");
  }, [value]);

  useEffect(() => {
    if (result.isSuccess && result.data?.value)
      dispatch(updateJoke(result.data.value));
    else if (result.isSuccess)
      setError("No results found... probably hiding from Chuck Norris");
  }, [result, dispatch]);

  const handleSearch = async () => {
    trigger(value);
  };

  return (
    <div className="search">
      <h2>Search for Facts</h2>
      <input type="text" onChange={handleChange} className="searchBar"></input>
      <button className="btn" disabled={error !== ""} onClick={handleSearch}>
        Search
      </button>
      <p>{error}</p>
    </div>
  );
};
