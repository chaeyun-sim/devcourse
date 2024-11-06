import { FC } from 'react';
import { ILogItem } from '../../../types';
import { BsFillPersonFill } from 'react-icons/bs';
import * as styles from './LogItem.css'

type TLogItem = {
	log: ILogItem;
}

const LogItem: FC<TLogItem> = ({ log }) => {
	const timeOffset = new Date(Date.now() - Number(log.logTimestamp))

	const showOffsetTime = () => {
		const minute = timeOffset.getMinutes() ? timeOffset.getMinutes() + '분' : '';
		const second = timeOffset.getSeconds() ? timeOffset.getSeconds() + '초 전' : '';
		return timeOffset.getSeconds() ? `${minute} ${second}` : '방금 전'
	}

	return (
    <div className={styles.logItemWrap}>
      <div className={styles.author}>
        <BsFillPersonFill />
        {log.logAuthor}
      </div>
      <div className={styles.message}>{log.logMessage}</div>
      <div className={styles.date}>{showOffsetTime()}</div>
    </div>
  );
};

export default LogItem;