import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";




export const OperationSlice = createSlice({
    name: "note",
    initialState: {},
    reducers: {
        addOperation: (state, action) => {
            state.operationList = action.payload;
        },
        achatList: (state, action) =>{

            return state.operationList.find((operation) => operation.OperationKind==='achat')
        },
        echangeList: (state, action) =>{

            return state.operationList.find((operation) => operation.OperationKind==='echange')
        },
    },
})

export const {addOperation, achatList,echangeList } = OperationSlice.actions
export default OperationSlice.reducer