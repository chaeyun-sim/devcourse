import { FC } from 'react';
import { IList, ITask } from '../../types';
import { GrSubtract } from 'react-icons/gr'
import Task from '../Task/Task';
import { useTypedDispatch } from '../../hooks/redux';
import { deleteList, setModalActive } from '../../store/slices/boardsSlice';
import { addLog } from '../../store/slices/loggerSlice';
import { v4 } from 'uuid';
import { setModalData } from '../../store/slices/modalSlice';
import * as styles from './List.css'
import ActionButton from '../ActionButton/ActionButton';
import { Droppable } from 'react-beautiful-dnd';

type TListProps = {
	list: IList;
	boardId: string;
}

const List: FC<TListProps> = ({ list, boardId }) => {
	const dispatch = useTypedDispatch();
	const listId = list.listId;

	const handleListDelete = () => {
		dispatch(deleteList({ boardId, listId }));
		dispatch(addLog({
			logId: v4(),
			logMessage: `리스트 삭제: ${list.listName}`,
			logAuthor: 'User',
			logTimestamp: String(Date.now())
		}))
	}

	const handleTaskChange = (task: ITask) => {
		dispatch(setModalData({ task, listId, boardId }))
		dispatch(setModalActive(true));
	}

	return (
    <Droppable droppableId={list.listId}>
      {provided => (
        <div
          className={styles.listWrapper}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <div className={styles.header}>
            <div className={styles.name}>{list.listName}</div>
            <GrSubtract
              className={styles.deleteButton}
              onClick={handleListDelete}
            />
          </div>
          {list.tasks.map((task, index) => (
            <Task
              key={task.taskId}
              task={task}
              taskIndex={index}
              onClick={() => handleTaskChange(task)}
            />
          ))}
          {provided.placeholder}
          <ActionButton
            boardId={boardId}
            listId={listId}
          />
        </div>
      )}
    </Droppable>
  );
};

export default List;