import { ChangeEvent, useState } from 'react';
import { useTypedDispatch } from './redux';
import { addBoard } from '../store/slices/boardsSlice';
import { addLog } from '../store/slices/loggerSlice';
import { v4 } from 'uuid';

export const useSideForm = (onClose: () => void) => {
		const dispatch = useTypedDispatch();
    const [inputText, setInputText] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      setInputText(e.target.value);
    };

    const handleSubmit = () => {
      if (!inputText) return;
      dispatch(
        addBoard({
          board: {
            boardId: v4(),
            boardName: inputText,
            list: [],
          },
        })
      );
      dispatch(
        addLog({
          logId: v4(),
          logMessage: `게시판 등록: ${inputText}`,
          logAuthor: 'User',
          logTimestamp: String(Date.now()),
        })
      );
      onClose();
		};
	
	return { inputText, handleChange, handleSubmit };
}