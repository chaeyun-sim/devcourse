import './App.css';

{/*
  작성자: 1ch
  작성일: 2024.5.30
  내용: 기능에 대한 내용
*/}

function App() {
  const name = '리액트'; 
  const style = {
    backgroundColor: 'black',
    color: 'white',
    fontSize: '48px',
    fontWeight: 'bold',
    padding: '20px'
  }

  return (
    <div style={style}>
      <h1 className='test'>Hello, {name === '리액트' ? <h1>YES</h1> : null}!</h1>
      <p>반갑습니다.</p>
      
    </div>
  );
}

export default App;
