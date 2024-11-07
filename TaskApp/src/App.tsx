import * as style from './App.css'
import BoardList from './components/BoardList/BoardList';
import ListContainer from './components/ListContainer/ListContainer';
import ModalEdit from './components/ModalEdit/ModalEdit';
import LoggerModal from './components/LoggerModal/LoggerModal';
import { DragDropContext } from 'react-beautiful-dnd';
import { useApp } from './hooks/useApp';
import { useState } from 'react';

function App() {
  const [activeBoardId, setActiveBoardId] = useState('board-0');
  const {
    lists,
    modalActive,
    isLoggerOpen,
    handleDragEnd,
    handleDeleteBoard,
    handleToggle,
    handleLoggerModalClose,
  } = useApp(activeBoardId, setActiveBoardId);

  return (
    <div className={style.appContainer}>
      {modalActive && <ModalEdit />}
      {isLoggerOpen && <LoggerModal onClose={handleLoggerModalClose} />}
      <BoardList
        activeBoardId={activeBoardId}
        onSetActiveBoardId={setActiveBoardId}
      />
      <div className={style.board}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <ListContainer
            list={lists}
            boardId={activeBoardId}
          />
        </DragDropContext>
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
