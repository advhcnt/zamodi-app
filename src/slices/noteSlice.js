import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const allNote = createAsyncThunk('post/list', async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
        const resultat = await axios.get('https://jsonplaceholder.typicode.com/posts')
        return resultat.data;
    } catch (error) {
        return error?.response
    }

})






export const NoteSlice = createSlice({
    name: "note",
    initialState: {},
    extraReducers: {
        [allNote.pending]: (state, action) => {
            state.loading = true;
        },
        [allNote.fulfilled]:(state, action)=>{
            state.posteListe = action.payload;
            state.loading =false;
        },
        [allNote.rejected]: (state, action) => {
            state.error= action.payload;
            state.loading =false;
        }
    }
})

// export default PosteSlice.reducer