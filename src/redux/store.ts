import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { planSlice } from "./planSlice";
import { saveState } from "../util/util";

const rootReducer = combineReducers({
  plan: planSlice.reducer,
});

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    } else {
      return JSON.parse(serializedState);
    }
  } catch (err) {
    // ... 错误处理
    return undefined;
  }
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadState(),
});

store.subscribe(() => {
  const state = store.getState();
  saveState(state);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default { store };
