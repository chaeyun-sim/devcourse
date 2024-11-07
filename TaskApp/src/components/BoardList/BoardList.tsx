import { FC } from 'react';
import { useAuth } from '../../hooks/redux';
import SideForm from './SideForm/SideForm';
import { FiLogIn, FiPlusCircle } from 'react-icons/fi';
import {GoSignOut} from 'react-icons/go'
import * as styles from './BoardList.css';
import clsx from 'clsx';
import { IBoard } from '../../types';
import { useBoardList } from '../../hooks/useBoardList';

type TBoardListProps = {
  activeBoardId: string;
  onSetActiveBoardId: (value: string) => void;
};

const BoardList: FC<TBoardListProps> = ({ activeBoardId, onSetActiveBoardId }) => {
    const isLoggedIn = useAuth();
  const {
    boardArray,
    isActiveBoard,
    isFormOpen,
    handleOpen,
    handleClose,
    handleSetBoardId,
    handleLogin,
    handleLogout,
  } = useBoardList(activeBoardId, onSetActiveBoardId);
  
	
	const BoardItem = ({ board, index }: { board: IBoard; index: number; }) => {
		return (
			<div
        onClick={() => handleSetBoardId(board.boardId)}
        className={clsx({
          [styles.boardItemActive]: isActiveBoard(index),
          [styles.boardItem]: !isActiveBoard(index),
        })}
      >
        <div>{board.boardName}</div>
      </div>
		)
	}

	return (
    <div className={styles.container}>
      <div className={styles.title}>게시판: </div>
      {boardArray.map((board, index) => (
        <BoardItem
          key={board.boardId}
          board={board}
          index={index}
        />
      ))}
      <div className={styles.addSection}>
        {isFormOpen ? (
          <SideForm onClose={handleClose} />
        ) : (
          <FiPlusCircle
            className={styles.addButton}
            onClick={handleOpen}
          />
        )}
        {isLoggedIn ? (
          <GoSignOut
            className={styles.addButton}
            onClick={handleLogout}
          />
        ) : (
          <FiLogIn
            className={styles.addButton}
            onClick={handleLogin}
          />
        )}
      </div>
    </div>
  );
};

export default BoardList;