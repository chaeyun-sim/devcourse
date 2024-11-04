import * as style from './App.css'

function App() {
  return (
    <div className={style.appContainer}>
      <div className={style.board}></div>
      <div className={style.buttons}>
        <button>이 게시판 삭제하기</button>
        <button></button>
      </div>
    </div>
  );
}

export default App
