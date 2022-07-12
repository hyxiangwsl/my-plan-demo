import { useSelector as useReduxSelector, TypedUseSelectorHook } from "react-redux";
import { RootState, AppDispatch } from "./store";
import { useDispatch as useReduxDispatch } from "react-redux";

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

// ? 自定义useDispatch 的hooks 是本地的store的自定义版本

export const useDispatch = () => useReduxDispatch<AppDispatch>();
