import { useState } from 'react';
import * as style from './App.css'
import BoardList from './components/BoardList/BoardList';
import ListContainer from './components/ListContainer/ListContainer';
import { useBoard, useTypedDispatch } from './hooks/redux';
import ModalEdit from './components/ModalEdit/ModalEdit';
import LoggerModal from './components/LoggerModal/LoggerModal';
import { deleteBoard } from './store/slices/boardsSlice';
import { addLog } from './store/slices/loggerSlice';
import { v4 } from 'uuid';

function App() {
  const dispatch = useTypedDispatch();
  const { boardArray, modalActive } = useBoard();
  const [activeBoardId, setActiveBoardId] = useState('board-0')
  const [isLoggerOpen, setIsLoggerOpen] = useState(false);

  const getActiveBoard = boardArray.filter(b => b.boardId === activeBoardId)[0];

  const handleToggle = () => setIsLoggerOpen(prev => !prev)
  const handleDeleteBoard = () => {
    if (boardArray.length === 1) return alert('최소 게시판 개수는 한 개입니다.');
    if (activeBoardId === 'board-0') return alert('기본 게시판은 삭제할 수 없습니다.')

    dispatch(deleteBoard({ boardId: activeBoardId }))
    dispatch(addLog({
      logId: v4(),
      logMessage: `게시판 삭제: ${getActiveBoard.boardName}`,
      logAuthor: 'User',
      logTimestamp: String(Date.now())
    }))
    setActiveBoardId(boardArray[0].boardId)
  }

  return (
    <div className={style.appContainer}>
      {modalActive && <ModalEdit />}
      {isLoggerOpen && <LoggerModal onClose={() => setIsLoggerOpen(false)} />}
      <BoardList
        activeBoardId={activeBoardId}
        onSetActiveBoardId={setActiveBoardId}
      />
      <div className={style.board}>
        <ListContainer
          list={getActiveBoard.list}
          boardId={activeBoardId}
        />
      </div>
      <div className={style.buttons}>
        <button
          className={style.deleteBoardButton}
          onClick={handleDeleteBoard}
        >
          이 게시판 삭제
        </button>
        <button
          className={style.loggerButton}
          onClick={handleToggle}
        >
          {isLoggerOpen ? '활동 목록 숨기기' : '활동 목록 보기'}
        </button>
      </div>
    </div>
  );
}

export default App
