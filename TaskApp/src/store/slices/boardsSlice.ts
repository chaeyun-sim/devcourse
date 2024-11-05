import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBoard, IList, ITask } from '../../types';

type TProps = {
  modalActive: boolean;
  boardArray: IBoard[];
};

type TAddBoardAction = {
  board: IBoard;
}

type TDeleteListAction = {
  boardId: string;
  listId: string;
}

type TAddListAction = {
  boardId: string;
  list: IList;
}

type TAddTaskAction = {
  boardId: string;
  listId: string;
  task: ITask;
}

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
  reducers: {
    addBoard: (state, { payload }: PayloadAction<TAddBoardAction>) => {
      state.boardArray.push(payload.board);
    },
    deleteList: (state, { payload }: PayloadAction<TDeleteListAction>) => {
      state.boardArray = state.boardArray.map(b =>
        b.boardId === payload.boardId
          ? { ...b, list: b.list.filter(l => l.listId !== payload.listId) }
          : b
      );
    },
    setModalActive: (state, { payload }: PayloadAction<boolean>) => {
      state.modalActive = payload
    },
    addList: (state, { payload }: PayloadAction<TAddListAction>) => {
      state.boardArray = state.boardArray.map(b =>
        b.boardId === payload.boardId
          ? { ...b, list: [...b.list, payload.list] }
          : b
      );
    },
    addTask: (state, { payload }: PayloadAction<TAddTaskAction>) => {
      state.boardArray = state.boardArray.map(b =>
        b.boardId === payload.boardId
          ? {
              ...b,
            list: b.list.map(item => (
              item.listId === payload.listId
                ? { ...item, tasks: [...item.tasks, payload.task] }
                : item
            )),
            }
          : b
      );
    }
  },
});

export const { addBoard, deleteList, setModalActive, addList, addTask } = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;