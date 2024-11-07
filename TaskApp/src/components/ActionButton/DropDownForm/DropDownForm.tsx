import { FC } from 'react';
import { FiX } from 'react-icons/fi';
import * as styles from './DropDownForm.css'
import { useDropdownForm } from '../../../hooks/useDropdownForm';

type TDropdownForm = {
	list?: boolean;
	boardId: string;
	listId: string;
	onClose: () => void;
}

const DropDownForm: FC<TDropdownForm> = ({ list, boardId, listId, onClose }) => {
  const { text, handleButtonClick, handleChange } = useDropdownForm(list!, boardId, listId, onClose);
	const formPlaceholder = list ? '리스트의 제목을 입력하세요.' : '할 일의 제목을 입력하세요.';
  const buttonTitle = list ? '리스트 추가' : '할 일 추가';

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