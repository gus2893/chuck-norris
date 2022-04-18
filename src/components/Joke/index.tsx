import React, { useEffect } from "react";
import { useAppSelector } from "../../redux/hooks";
import { useLazyGetRandomJokeQuery } from "../../redux/api/apiSlice";
import { selectJoke, updateJoke } from "../../redux/reducers/jokeSlice";
import { useAppDispatch } from "../../redux/hooks";

export const Joke = () => {
  const [trigger, result] = useLazyGetRandomJokeQuery();
  const dispatch = useAppDispatch();
  const jokes = useAppSelector(selectJoke);

  useEffect(() => {
    trigger();
  }, []);

  useEffect(() => {
    if (result.isSuccess) dispatch(updateJoke(result.data.value));
  }, [result.isSuccess]);

  return (
    <div>
      <h3>Did you know...</h3>
      <p>{jokes}</p>
    </div>
  );
};
