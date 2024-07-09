import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Itask } from "../../types";

type TSetModalDataAction = {
  boardId: string;
  listId: string;
  task: Itask;
};

type TModalState = {
  boardId: string;
  listId: string;
  task: Itask;
};

const initialState: TModalState = {
  boardId: "board-0",
  listId: "list-0",
  task: {
    taskId: "task-0",
    taskName: "task 0",
    taskDescription: "tast description",
    taskOwner: "Terry",
  },
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalData: (state, { payload }: PayloadAction<TSetModalDataAction>) => {
      state.boardId = payload.boardId;
      state.listId = payload.listId;
      state.task = payload.task;
    },
  },
});

export const { setModalData } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
