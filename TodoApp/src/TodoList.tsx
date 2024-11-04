import React, { useState } from 'react';
import './App.css';
import TodoModal from './TodoModal';

export type Todo = {
	id: number;
	text: string;
	isChecked: boolean;
}

const TodoList: React.FC = () => {
	const title = '오늘 할 일';
	const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1,
      text: '공부하기',
      isChecked: true,
    },
    {
      id: 2,
      text: '잠자기',
      isChecked: false,
    },
    {
      id: 3,
      text: '미팅하기',
      isChecked: false,
    },
	]);
	const [todo, setTodo] = useState('')
	const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null)
	
	const handleChange = (id: number) => {
		const newTodos = todos.map(t => (t.id === id ? { ...t, isChecked: !t.isChecked } : t));
		setTodos(newTodos);
	}

	const handleAddTodo = () => {
		if (todo.trim() !== '') {
			const newTodo = {
        id: todos.length + 1,
        text: todo,
        isChecked: false,
      };
      setTodos([...todos, newTodo]);
		} else {
			alert('투두를 작성해 주세요.')
		}
	}

	const handleDeleteTodo = (id: number) => {
		setTodos(todos.filter(todo => todo.id !== id))
	}

	const handleTodoClick = (todo: Todo) => setSelectedTodo(todo);

	return (
    <div style={{ width: '100%' }}>
      <h1 style={{ textAlign: 'center' }}>{title}</h1>
      <div className='container'>
        <div>
          <input
            placeholder='할 일 추가하기'
            style={{ marginRight: '10px', writingMode: 'horizontal-tb' }}
            value={todo}
            onChange={e => setTodo(e.target.value)}
          />
          <button onClick={handleAddTodo}>추가</button>
        </div>
        <br />
        <div className='board'>
          <ul>
            {todos.map((todo) => (
              <li
                key={todo.id}
                onClick={() => handleTodoClick(todo)}
              >
                <input
                  type='checkbox'
                  checked={todo.isChecked}
                  onChange={() => handleChange(todo.id)}
                />
                <span>{todo.isChecked ? <del>{todo.text}</del> : <span>{todo.text}</span>}</span>
                <button
                  className='delbutton'
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <TodoModal
        show={!!selectedTodo}
        todo={selectedTodo!}
        onHide={() => setSelectedTodo(null)}
      ></TodoModal>
    </div>
  );
};

export default TodoList;