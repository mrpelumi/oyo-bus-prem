import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  currentUserId: null
}

export const userIdValSlice = createSlice({
  name:'userIdVal',
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentUserId(state, action) {
      state.currentUserId = action.payload;
    }
  }
})

export const {setCurrentUserId} = userIdValSlice.actions;

export const userIdValReducer = userIdValSlice.reducer;