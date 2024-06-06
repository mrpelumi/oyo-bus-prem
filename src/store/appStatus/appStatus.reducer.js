import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  status: ""
}

export const receiptSlice = createSlice({
  name:'appStatus',
  initialState: INITIAL_STATE,
  reducers: {
    setAppStatus: (state, action) => {
      state.status = action.payload
  }
}})

export const {setAppStatus} = receiptSlice.actions;

export const appStatusReducer = receiptSlice.reducer;