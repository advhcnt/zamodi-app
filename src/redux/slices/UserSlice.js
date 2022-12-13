import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const allPoste = createAsyncThunk('post/list', async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
        const resultat = await axios.get('https://jsonplaceholder.typicode.com/posts')
        return resultat.data;
    } catch (error) {
        return error?.response
    }

})




export const UserSlice = createSlice({
    name: "poste",
    initialState: {},
    extraReducers: {
        [allPoste.pending]: (state, action) => {
            state.loading = true;
        },
        [allPoste.fulfilled]:(state, action)=>{
            state.posteListe = action.payload;
            state.loading =false;
        },
        [allPoste.rejected]: (state, action) => {
            state.error= action.payload;
            state.loading =false;
        }
    }
})

export default UserSlice.reducer