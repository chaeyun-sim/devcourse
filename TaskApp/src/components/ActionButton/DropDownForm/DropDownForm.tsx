import { ChangeEvent, FC, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { useTypedDispatch } from '../../../hooks/redux';
import { addList, addTask } from '../../../store/slices/boardsSlice';
import { v4 } from 'uuid';
import { addLog } from '../../../store/slices/loggerSlice';
import * as styles from './DropDownForm.css'

type TDropdownForm = {
	list?: boolean;
	boardId: string;
	listId: string;
	onClose: () => void;
}

const DropDownForm: FC<TDropdownForm> = ({ list, boardId, listId, onClose }) => {
	const dispatch = useTypedDispatch();
  const [text, setText] = useState('');
	const formPlaceholder = list ? '리스트의 제목을 입력하세요.' : '할 일의 제목을 입력하세요.';
	const buttonTitle = list ? '리스트 추가' : '할 일 추가'

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
						tasks: []
					},
        })
			);
		} else {
			dispatch(addTask({
				boardId,
				listId,
				task: {
					taskId: v4(),
					taskName: text,
					taskOwner: '',
					taskDescription: ''
				}
			}))
		}
		dispatch(
      addLog({
        logId: v4(),
        logMessage: `${list ? '리스트' : '할 일'} 생성: ${text}`,
        logAuthor: 'User',
        logTimestamp: String(Date.now()),
      })
    );
		onClose()
	}

  return (
    <div className={list ? styles.listForm : styles.taskForm}>
      <textarea
        autoFocus
        className={styles.input}
        value={text}
        onChange={handleChange}
        placeholder={formPlaceholder}
      />
      <div className={styles.buttonGroup}>
        <button
          className={styles.button}
          onClick={handleButtonClick}
        >
          {buttonTitle}
        </button>
        <FiX
          className={styles.close}
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default DropDownForm;