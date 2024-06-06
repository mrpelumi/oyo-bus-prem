import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  receiptVal: {}
}

export const receiptSlice = createSlice({
  name:'receipt',
  initialState: INITIAL_STATE,
  reducers: {
    setNewReceipt: (state, action) => {
      state.receiptVal = {...state.receiptVal, ...action.payload}
  }
}})

export const {setNewReceipt} = receiptSlice.actions;

export const receiptReducer = receiptSlice.reducer;