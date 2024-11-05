import { FC } from 'react';
import { ITask } from '../../types';
import * as styles from './Task.css'

type tTaskProps = {
	boardId: string;
	taskIndex: number;
	task: ITask;
}

const Task: FC<tTaskProps> = ({ boardId, taskIndex, task }) => {
	return (
		<div className={styles.container}>
			<div className={styles.title}>{task.taskName}</div>
			<div className={styles.desc}>{task.taskDescription}</div>
		</div>
	);
};

export default Task;