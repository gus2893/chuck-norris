import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface JokeState {
  value: string;
  status: "idle" | "loading" | "failed";
}

const initialState: JokeState = {
  value: "",
  status: "idle",
};

export const jokeSlice = createSlice({
  name: "Joke",
  initialState,
  reducers: {
    updateJoke: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { updateJoke } = jokeSlice.actions;
export const selectJoke = (state: RootState) => state.joke.value;
export default jokeSlice.reducer;
