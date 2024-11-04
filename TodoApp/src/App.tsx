import './App.css';
import Clock from './Clock';
import MyWeather from './MyWeather';
import TodoList from './TodoList';

function App() {
  return (
    <div className='container'>
      <TodoList />
      <Clock />
      <MyWeather weather='맑음'>일기예보</MyWeather>
    </div>
  );
}

export default App;
