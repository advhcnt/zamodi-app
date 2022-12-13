import { configureStore } from "@reduxjs/toolkit";
import  CounterSlice  from "./redux/compteur";
import PosteSlice from './redux/poste';

const store = configureStore({
    reducer:{
        monCompteur:CounterSlice,
        mesPoste : PosteSlice
    }
})

export default store;