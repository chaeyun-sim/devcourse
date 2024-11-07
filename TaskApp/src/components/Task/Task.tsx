import { FC } from 'react';
import { ITask } from '../../types';
import * as styles from './Task.css'
import { Draggable } from 'react-beautiful-dnd';

type tTaskProps = {
  task: ITask;
  taskIndex: number;
  onClick?: (task: ITask) => void;
};

const Task: FC<tTaskProps> = ({ task, taskIndex, onClick }) => {
  return (
    <Draggable
      draggableId={task.taskId}
      index={taskIndex}
    >
      {provided => (
        <div
          className={styles.container}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          onClick={() => onClick?.(task)}
        >
          <div className={styles.title}>{task.taskName}</div>
          {task.taskDescription && <div className={styles.desc}>{task.taskDescription}</div>}
        </div>
      )}
    </Draggable>
  );
};

export default Task;