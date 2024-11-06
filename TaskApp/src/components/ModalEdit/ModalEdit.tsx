import { FiX } from 'react-icons/fi';
import { useModal, useTypedDispatch } from '../../hooks/redux';
import { ChangeEvent, useState } from 'react';
import { deleteTask, setModalActive, updateTask } from '../../store/slices/boardsSlice';
import { addLog } from '../../store/slices/loggerSlice';
import { v4 } from 'uuid';
import * as styles from './ModalEdit.css'

const ModalEdit = () => {
	const modal = useModal();
	const dispatch = useTypedDispatch();
	const [data, setData] = useState(modal)

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setData({...data, task: {...data.task, [name]: value}})
	}

	const handleLog = (type: 'update' | 'delete') => {
		dispatch(
      addLog({
        logId: v4(),
        logMessage: `할 일 ${type === 'update' ? '수정' : '삭제'}: ${data.task.taskName}`,
        logAuthor: 'User',
        logTimestamp: String(Date.now()),
      })
    );
	}

	const handleUpdate = () => {
		dispatch(updateTask(data));
		handleLog('update')
		handleClose();
	}

	const handleDelete = () => {
		dispatch(deleteTask({
			boardId: data.boardId,
			listId: data.listId,
			taskId: data.task.taskId
		}));
		handleLog('delete');
		handleClose()
	}

	const handleClose = () => dispatch(setModalActive(false));

	return (
    <div className={styles.wrapper}>
      <div className={styles.modalWindow}>
        <div className={styles.header}>
          <div className={styles.title}>{modal.task.taskName}</div>
          <FiX
            className={styles.closeButton}
            onClick={handleClose}
          />
        </div>
        <div className={styles.title}>제목</div>
        <input
          className={styles.input}
          name='taskName'
          value={data.task.taskName}
          onChange={handleChange}
        />
        <div className={styles.title}>설명</div>
        <input
          className={styles.input}
          name='taskDescription'
          value={data.task.taskDescription}
          onChange={handleChange}
        />
        <div className={styles.title}>생성한 사람</div>
        <input
          className={styles.input}
          name='taskOwner'
          value={data.task.taskOwner}
          onChange={handleChange}
        />
        <div className={styles.buttonGroup}>
          <button
            className={styles.updateButton}
            onClick={handleUpdate}
          >
            할 일 수정
          </button>
          <button
            className={styles.deleteButton}
            onClick={handleDelete}
          >
            할 일 삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEdit;