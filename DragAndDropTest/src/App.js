import { useState } from 'react';
import './App.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const finalSpaceCharacters = [
  {
    id: 'gary',
    name: 'Gary Goodspeed',
    thumb: '/images/gary.webp',
  },
  {
    id: 'cato',
    name: 'Little Cato',
    thumb: '/images/cato.webp',
  },
  {
    id: 'kvn',
    name: 'KVN',
    thumb: '/images/kvn.webp',
  },
  {
    id: 'mooncake',
    name: 'Mooncake',
    thumb: '/images/mooncake.webp',
  },
  {
    id: 'quinn',
    name: 'Quinn Ergon',
    thumb: '/images/quinn.webp',
  },
];

function App() {
  const [characters, setCharacters] = useState(finalSpaceCharacters);

  const handleOnDragEnd = result => {
    if (result.destination === null) return;

    const items = [...characters];
    const [draggedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, draggedItem);

    setCharacters(items);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Final Space Characters</h1>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId='characters'>
            {provided => (
              <ul
                className='characters'
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {characters.map(({ id, name, thumb }, index) => {
                  return (
                    <Draggable
                      key={id}
                      draggableId={id}
                      index={index}
                    >
                      {provided => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div className='characters-thumb'>
                            <img
                              src={thumb}
                              alt={`${name} Thumb`}
                            />
                          </div>
                          <p>{name}</p>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </header>
      <p>
        Images from{' '}
        <a href='https://final-space.fandom.com/wiki/Final_Space_Wiki'>Final Space Wiki</a>
      </p>
    </div>
  );
}

export default App;
