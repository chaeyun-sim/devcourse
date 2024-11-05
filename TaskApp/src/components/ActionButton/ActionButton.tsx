import { FC, useState } from 'react';
import DropDownForm from './DropDownForm/DropDownForm';
import { IoIosAdd } from 'react-icons/io';
import * as styles from './ActionButton.css'

type TActionButtonProps = {
	boardId: string;
	listId: string;
	list?: boolean;
}

const ActionButton: FC<TActionButtonProps> = ({ boardId, listId, list = false }) => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const buttonText = list ? '새로운 리스트 등록' : '새로운 일 등록'

	const handleOpen = () => setIsFormOpen(true)
	const handleClose = () => setIsFormOpen(false)

	return (
    <>
      {isFormOpen ? (
        <DropDownForm
          list={list}
          boardId={boardId}
          listId={listId}
          onClose={handleClose}
        />
      ) : (
        <button
          className={list ? styles.listButton : styles.taskButton}
          onClick={handleOpen}
        >
          <IoIosAdd />
          <p>{buttonText}</p>
        </button>
      )}
    </>
  );
};

export default ActionButton;