import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { planSlice } from "./planReducer";
const rootReducer = combineReducers({
  plan: planSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default { store };
