import { ChangeEvent, FC, useState } from 'react';
import * as styles from './SideForm.css'
import { FiCheck } from 'react-icons/fi';
import { useTypedDispatch } from '../../../hooks/redux';
import { addBoard } from '../../../store/slices/boardsSlice';
import { v4 as uuidv4 } from 'uuid';
import { addLog } from '../../../store/slices/loggerSlice';

type TSideFormProps = {
	onClose: () => void;
}

const SideForm: FC<TSideFormProps> = ({ onClose }) => {
	const dispatch = useTypedDispatch();
	const [inputText, setInputText] = useState('');

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setInputText(e.target.value);
	}

	const handleSubmit = () => {
		if (!inputText) return;
		dispatch(
      addBoard({
        board: {
          boardId: uuidv4(),
          boardName: inputText,
          list: [],
        },
      })
		);
		dispatch(
      addLog({
				logId: uuidv4(),
				logMessage: `게시판 등록: ${inputText}`,
				logAuthor: 'User',
				logTimestamp: String(Date.now())
      })
    );
		onClose();
	}

	return (
    <div className={styles.sideForm}>
      <input
        autoFocus
        className={styles.input}
        placeholder='새로운 게시판 등록하기'
        value={inputText}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>
        <FiCheck className={styles.icon} />
      </button>
    </div>
  );
};

export default SideForm;