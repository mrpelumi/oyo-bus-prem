import { combineReducers } from "@reduxjs/toolkit";

import { busSectorReducer } from "./busSector/busSector.reducer";
import { userReducer } from "./user/user.reducer";
import { receiptReducer } from "./receipt/receipt.reducer";
import { appStatusReducer } from "./appStatus/appStatus.reducer";
import { busSectorNameReducer } from "./busSectorSingle/busSectorSingle.reducer";

import {userIdValReducer} from "./userId/userId.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  userIdVal: userIdValReducer,
  busSector: busSectorReducer,
  receipt: receiptReducer,
  appStatus: appStatusReducer,
  busSectorName: busSectorNameReducer
})