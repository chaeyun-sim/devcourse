import { FC, useCallback, useState } from 'react';
import { useBoard } from '../../hooks/redux';
import SideForm from './SideForm/SideForm';
import { FiPlusCircle } from 'react-icons/fi';
import * as styles from './BoardList.css';
import clsx from 'clsx';
import { IBoard } from '../../types';

type TBoardListProps = {
  activeBoardId: string;
  onSetActiveBoardId: (value: string) => void;
};

const BoardList: FC<TBoardListProps> = ({ activeBoardId, onSetActiveBoardId }) => {
	const { boardArray } = useBoard();
	const [isFormOpen, setIsFormOpen] = useState(false)

	const handleOpen = useCallback(() => setIsFormOpen(true), []);
  const handleClose = useCallback(() => setIsFormOpen(false), []);
	const handleSetBoardId = (boardId: string) => onSetActiveBoardId(boardId);

	const isActiveBoard = (index: number) =>
		boardArray.findIndex(b => b.boardId === activeBoardId) === index;
	
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
          <button
            className={styles.addButton}
            onClick={handleOpen}
          >
            <FiPlusCircle />
          </button>
        )}
      </div>
    </div>
  );
};

export default BoardList;