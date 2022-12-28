import { createSlice } from "@reduxjs/toolkit";


export const ticketSlice = createSlice({
    name: 'ticket',
    initialState: [{}],
    reducers: {
        addTicket: (state, action) => {
            state.ticketList = action.payload;
        },
        addTicket: (state, action) => {
            state.ticketList = action.payload;
        },

    }
})