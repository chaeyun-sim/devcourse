import { ChangeEvent, useState } from 'react';
import { useTypedDispatch } from './redux';
import { addList, addTask } from '../store/slices/boardsSlice';
import { addLog } from '../store/slices/loggerSlice';
import { v4 } from 'uuid';

export const useDropdownForm = (list: boolean, boardId: string, listId: string, onClose: () => void) => {
  const dispatch = useTypedDispatch();
  const [text, setText] = useState('');

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setText(e.target.value);
  };

  const handleButtonClick = () => {
    if (!text) return;
    if (list) {
      dispatch(
        addList({
          boardId,
          list: {
            listId: v4(),
            listName: text,
            tasks: [],
          },
        })
      );
    } else {
      dispatch(
        addTask({
          boardId,
          listId,
          task: {
            taskId: v4(),
            taskName: text,
            taskOwner: '',
            taskDescription: '',
          },
        })
      );
    }
    dispatch(
      addLog({
        logId: v4(),
        logMessage: `${list ? '리스트' : '할 일'} 생성: ${text}`,
        logAuthor: 'User',
        logTimestamp: String(Date.now()),
      })
    );
    onClose();
  };

  return { text, handleButtonClick, handleChange };
};