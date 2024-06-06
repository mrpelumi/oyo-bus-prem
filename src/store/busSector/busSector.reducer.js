import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  busSectorList: []
}

export const busSectorSlice = createSlice({
  name: 'busSector',
  initialState: INITIAL_STATE,
  reducers: {
    setBusSector(state, action){
      state.busSectorList = {...state.busSectorList, ...action.payload};
    }
  }
})

export const {setBusSector} = busSectorSlice.actions;

export const busSectorReducer = busSectorSlice.reducer;