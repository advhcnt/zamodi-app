import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

export const allPoste = createAsyncThunk(
  "post/list",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const resultat = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      return resultat.data;
    } catch (error) {
      return error?.response;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    
  },
});

export default userSlice.reducer;
