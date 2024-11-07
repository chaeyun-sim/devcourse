import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBoard, IList, ITask } from '../../types';

type TProps = {
  modalActive: boolean;
  boardArray: IBoard[];
};

type TAddBoardAction = {
  board: IBoard;
}

type TDeleteBoardAction = {
  boardId: string;
}

type TDeleteListAction = {
  boardId: string;
  listId: string;
}

type TAddListAction = {
  boardId: string;
  list: IList;
}

type TTaskAction = {
  boardId: string;
  listId: string;
  task: ITask;
}

type TDeleteTaskAction = {
  boardId: string;
  listId: string;
  taskId: string;
}

type TSortAction = {
  boardIndex: number;
  droppableIdStart: string;
  droppableIdEnd: string;
  droppableIndexStart: number;
  droppableIndexEnd: number;
  draggableId: string;
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
    deleteBoard: (state, { payload }: PayloadAction<TDeleteBoardAction>) => {
      state.boardArray = state.boardArray.filter(b => b.boardId !== payload.boardId);
    },
    setModalActive: (state, { payload }: PayloadAction<boolean>) => {
      state.modalActive = payload;
    },
    addList: (state, { payload }: PayloadAction<TAddListAction>) => {
      const targetBoard = state.boardArray.find(b => b.boardId === payload.boardId)!;
      targetBoard.list.push(payload.list);
    },
    deleteList: (state, { payload }: PayloadAction<TDeleteListAction>) => {
      const targetBoard = state.boardArray.find(b => b.boardId === payload.boardId)!;
      targetBoard.list = targetBoard.list.filter(l => l.listId !== payload.listId);
    },
    addTask: (state, { payload }: PayloadAction<TTaskAction>) => {
      const targetBoard = state.boardArray.find(b => b.boardId === payload.boardId)!;
      const targetList = targetBoard.list.find(l => l.listId === payload.listId)!;
      targetList.tasks.push(payload.task);
    },
    updateTask: (state, { payload }: PayloadAction<TTaskAction>) => {
      const targetBoard = state.boardArray.find(b => b.boardId === payload.boardId)!;
      const targetList = targetBoard.list.find(l => l.listId === payload.listId)!;
      const taskIndex = targetList.tasks.findIndex(t => t.taskId === payload.task.taskId);
      targetList.tasks[taskIndex] = payload.task;
    },
    deleteTask: (state, { payload }: PayloadAction<TDeleteTaskAction>) => {
      const targetBoard = state.boardArray.find(b => b.boardId === payload.boardId)!;
      const targetList = targetBoard.list.find(l => l.listId === payload.listId)!;
      targetList.tasks = targetList.tasks.filter(task => task.taskId !== payload.taskId);
    },
    sort: (state, { payload }: PayloadAction<TSortAction>) => {
      const { boardArray } = state;

      const list = boardArray[payload.boardIndex].list.find(
        list => list.listId === payload.droppableIdStart
      );
      const card = list?.tasks.splice(payload.droppableIndexStart, 1);
      
      if (payload.droppableIdStart === payload.droppableIdEnd) {
        list?.tasks.splice(payload.droppableIndexEnd, 0, ...card!);
      } else {
        const listEnd = boardArray[payload.boardIndex].list.find(
          list => list.listId === payload.droppableIdEnd
        );
        listEnd?.tasks.splice(payload.droppableIndexEnd, 0, ...card!);
      }
    },
  },
});

export const {
  addBoard,
  deleteBoard,
  deleteList,
  setModalActive,
  addList,
  addTask,
  updateTask,
  deleteTask,
  sort
} = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;