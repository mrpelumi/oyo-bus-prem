import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  busSectorVal: ""
}

export const busSectorNameSlice = createSlice({
  name: 'busSectorName',
  initialState: INITIAL_STATE,
  reducers: {
    setBusSectorName(state, action){
      state.busSectorVal = action.payload;
    }
  }
})

export const {setBusSectorName} = busSectorNameSlice.actions;

export const busSectorNameReducer = busSectorNameSlice.reducer;