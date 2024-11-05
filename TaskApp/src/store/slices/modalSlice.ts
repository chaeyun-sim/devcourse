import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITask } from '../../types';

type TState = {
  boardId: string;
  listId: string;
  task: ITask;
};

const initialState: TState = {
  boardId: 'board-0',
  listId: 'list-0',
  task: {
    taskId: 'task-0',
    taskName: 'task 0',
    taskDescription: 'task description',
    taskOwner: 'John',
  },
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalData: (state, { payload }: PayloadAction<TState>) => {
      state.boardId = payload.boardId;
      state.listId = payload.listId;
      state.task = payload.task;
    },
  },
});

export const { setModalData } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;