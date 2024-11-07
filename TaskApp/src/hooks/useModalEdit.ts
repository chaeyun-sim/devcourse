import { ChangeEvent, useState } from 'react';
import { useModal, useTypedDispatch } from './redux';
import { addLog } from '../store/slices/loggerSlice';
import { deleteTask, setModalActive, updateTask } from '../store/slices/boardsSlice';
import { v4 } from 'uuid';

export const useModalEdit = () => {
		const modal = useModal();
    const dispatch = useTypedDispatch();
    const [data, setData] = useState(modal);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setData({ ...data, task: { ...data.task, [name]: value } });
    };

    const handleLog = (type: 'update' | 'delete') => {
      dispatch(
        addLog({
          logId: v4(),
          logMessage: `할 일 ${type === 'update' ? '수정' : '삭제'}: ${data.task.taskName}`,
          logAuthor: 'User',
          logTimestamp: String(Date.now()),
        })
      );
    };

    const handleUpdate = () => {
      dispatch(updateTask(data));
      handleLog('update');
      handleClose();
    };

    const handleDelete = () => {
      dispatch(
        deleteTask({
          boardId: data.boardId,
          listId: data.listId,
          taskId: data.task.taskId,
        })
      );
      handleLog('delete');
      handleClose();
    };

	const handleClose = () => dispatch(setModalActive(false));
	
	return {
    taskName: modal.task.taskName,
		task: data.task,
		handleChange,
    handleClose,
    handleDelete,
    handleUpdate,
  };
}