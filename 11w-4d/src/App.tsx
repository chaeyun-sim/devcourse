import './App.css';
import Clock from './Clock';
import TodoList from './TodoList';

function App() {
  return (
    <div className='container'>
      <TodoList />
      <Clock />
    </div>
  );
}

export default App;
