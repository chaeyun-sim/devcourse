import { FC } from 'react';
import { useLogger } from '../../hooks/redux';
import { FiX } from 'react-icons/fi';
import LogItem from './LogItem/LogItem';
import * as styles from './LoggerModal.css'

type TLoggerModal = {
	onClose: () => void;
}

const LoggerModal: FC<TLoggerModal> = ({ onClose }) => {
	const { logArray } = useLogger();
	console.log(logArray)

	return (
		<div className={styles.wrapper}>
			<div className={styles.modalWindow}>
				<div className={styles.header}>
					<div className={styles.title}>활동 기록</div>
					<FiX className={styles.closeButton} onClick={onClose} />
				</div>
				<div className={styles.body}>
					{logArray.map(log => (
						<LogItem key={log.logId} log={log} />
					))}
				</div>
			</div>
		</div>
	);
};

export default LoggerModal;