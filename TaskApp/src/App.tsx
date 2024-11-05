import { useState } from 'react';
import * as style from './App.css'
import BoardList from './components/BoardList/BoardList';
import ListContainer from './components/ListContainer/ListContainer';
import { useBoard } from './hooks/redux';

function App() {
  const { boardArray } = useBoard();
  const [activeBoardId, setActiveBoardId] = useState('board-0')

  const getActiveBoard = boardArray.filter(b => b.boardId === activeBoardId)[0];

  return (
    <div className={style.appContainer}>
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
        <button>이 게시판 삭제하기</button>
        <button></button>
      </div>
    </div>
  );
}

export default App
