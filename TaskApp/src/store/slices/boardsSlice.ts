import { createSlice } from '@reduxjs/toolkit';
import { IBoard } from '../../types';

type TProps = {
  modalActive: boolean;
  boardArray: IBoard[];
};

const initialState: TProps = {
  modalActive: false,
  boardArray: [
    {
      boardId: 'board-0',
      boardName: '첫번째 게시물',
      list: [
        {
          listId: 'list-0',
          listName: 'List 1',
          tasks: [
            {
              taskId: 'task-0',
              taskName: 'Task 1',
              taskDescription: 'Description',
              taskOwner: 'John',
            },
            {
              taskId: 'task-1',
              taskName: 'Task 2',
              taskDescription: 'Description',
              taskOwner: 'John',
            },
          ],
        },
        {
          listId: 'list-1',
          listName: 'List 2',
          tasks: [
            {
              taskId: 'task-2',
              taskName: 'Task 3',
              taskDescription: 'Description',
              taskOwner: 'John',
            },
          ],
        },
      ],
    },
  ],
};

const boardsSlice = createSlice({
	name: 'board',
	initialState,
	reducers: {}
})

export const boardsReducer = boardsSlice.reducer;