import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IlogItem } from "../../types";

type loggerState = {
  logArray: IlogItem[];
};

const initialState: loggerState = {
  logArray: [],
};

const loggerSlice = createSlice({
  name: "logger",
  initialState,
  reducers: {
    addLog: (state, { payload }: PayloadAction<IlogItem>) => {
      state.logArray.push(payload);
    },
  },
});

export const { addLog } = loggerSlice.actions;
export const loggerReducer = loggerSlice.reducer;
