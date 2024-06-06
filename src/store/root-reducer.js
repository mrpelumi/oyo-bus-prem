import { combineReducers } from "@reduxjs/toolkit";

import { busSectorReducer } from "./busSector/busSector.reducer";
import { userReducer } from "./user/user.reducer";
import { receiptReducer } from "./receipt/receipt.reducer";
import { appStatusReducer } from "./appStatus/appStatus.reducer";
import { busSectorNameReducer } from "./busSectorSingle/busSectorSingle.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  busSector: busSectorReducer,
  receipt: receiptReducer,
  appStatus: appStatusReducer,
  busSectorName: busSectorNameReducer
})