import { FC } from 'react';
import { IList } from '../../types';
import List from '../List/List';
import ActionButton from '../ActionButton/ActionButton';
import * as styles from './ListContainer.css'

type TListContainerProps = {
  list: IList[];
  boardId: string;
};

const ListContainer: FC<TListContainerProps> = ({ list, boardId }) => {
	return (
    <div className={styles.listContainer}>
      {list.map(item => (
        <List
          key={item.listId}
          list={item}
          boardId={boardId}
        />
      ))}
      <ActionButton boardId={boardId} listId={''} list />
    </div>
  );
};

export default ListContainer;