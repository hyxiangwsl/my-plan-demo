import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getThreeDecimal } from "../util/util";

interface planState {
  rateCNYByUSD: number; // ¥/$汇率
  rateRUBByUSD: number; // ₽/$汇率
  rateRUBByCNY: number; // ₽/¥汇率
  loading: boolean;
  planList: Plan[];
}

export interface Plan {
  task: string; // 任务名
  completed: boolean; // 是否完成
  id: string; // id
  priceCNY: number; // 价格
  priceRUB: number; // 价格
  priceUSD: number; // 价格
  timestamp: number; // 时间戳(更新的时间戳)
}

const defaultState: planState = {
  rateCNYByUSD: 0,
  rateRUBByUSD: 0,
  rateRUBByCNY: 0,
  loading: false,
  planList: [],
};

// 异步请求方法
export const getExChange = createAsyncThunk("user/getExChange", async (base: string) => {
  const other = ["USD", "CNY", "RUB"].filter((item) => item !== base);
  const json = await fetch(
    `https://api.exchangerate.host/latest?base=${base}&symbols=${other.join(",")}`
  );
  const data = await json.json();
  // const { rates } = data;
  return {
    rateCNYByUSD: getThreeDecimal(data.rates.CNY),
    rateRUBByUSD: getThreeDecimal(data.rates.RUB),
    rateRUBByCNY: getThreeDecimal(data.rates.RUB / data.rates.CNY),
  };
});

export const planSlice = createSlice({
  name: "plan",
  initialState: defaultState,
  reducers: {
    // 添加计划
    addPlan: (state, action) => {
      return {
        ...state,
        planList: [action.payload, ...state.planList],
      };
    },
    // 完成计划
    donePlan: (state, { payload }) => {
      return {
        ...state,
        planList: state.planList.map((item) =>
          item.id === payload.id
            ? { ...item, completed: payload.completed, timestamp: new Date().getTime() }
            : item
        ),
      };
    },
  },
  extraReducers: {
    [getExChange.pending.type]: (state) => ({
      ...state,
      loading: true,
    }),
    [getExChange.fulfilled.type]: (state, action) => {
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    },
    [getExChange.rejected.type]: (state) => ({
      ...state,
      loading: false,
    }),
  },
});
