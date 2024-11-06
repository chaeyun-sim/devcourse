import { FC } from 'react';
import { ITask } from '../../types';
import * as styles from './Task.css'

type tTaskProps = {
	task: ITask;
}

const Task: FC<tTaskProps> = ({ task }) => {
	return (
		<div className={styles.container}>
			<div className={styles.title}>{task.taskName}</div>
			{task.taskDescription && <div className={styles.desc}>{task.taskDescription}</div>}
		</div>
	);
};

export default Task;