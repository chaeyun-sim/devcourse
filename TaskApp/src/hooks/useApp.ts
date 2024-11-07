import { useState } from 'react';
import { useBoard, useTypedDispatch } from './redux';
import { addLog } from '../store/slices/loggerSlice';
import { deleteBoard, sort } from '../store/slices/boardsSlice';
import { v4 } from 'uuid';
import { DropResult } from 'react-beautiful-dnd';

export const useApp = (activeBoardId: string, setActiveBoardId: (value: string) => void) => {
	  const dispatch = useTypedDispatch();
    const { boardArray, modalActive } = useBoard();
    const [isLoggerOpen, setIsLoggerOpen] = useState(false);

    const getActiveBoard = boardArray.filter(b => b.boardId === activeBoardId)[0];
    const lists = getActiveBoard.list;

    const handleToggle = () => setIsLoggerOpen(prev => !prev);

    const handleDeleteBoard = () => {
      if (boardArray.length === 1) return alert('최소 게시판 개수는 한 개입니다.');
      if (activeBoardId === 'board-0') return alert('기본 게시판은 삭제할 수 없습니다.');

      dispatch(deleteBoard({ boardId: activeBoardId }));
      dispatch(
        addLog({
          logId: v4(),
          logMessage: `게시판 삭제: ${getActiveBoard.boardName}`,
          logAuthor: 'User',
          logTimestamp: String(Date.now()),
        })
      );
      setActiveBoardId(boardArray[0].boardId);
    };

    const handleDragEnd = (result: DropResult) => {
      const { destination, source, draggableId } = result;

      const sourceList = lists.filter(list => list.listId === source.droppableId)[0];

      dispatch(
        sort({
          boardIndex: boardArray.findIndex(b => b.boardId === activeBoardId),
          droppableIdStart: source.droppableId,
          droppableIdEnd: destination?.droppableId || source.droppableId,
          droppableIndexStart: source.index,
          droppableIndexEnd: destination?.index || source.index,
          draggableId,
        })
      );

      dispatch(
        addLog({
          logId: v4(),
          logMessage: `리스트 "${sourceList.listName}"에서 리스트 "${
            lists.filter(l => l.listId === destination?.droppableId)[0].listName
          }"으로 ${sourceList.tasks.filter(t => t.taskId === draggableId)[0].taskName}을 옮김`,
          logAuthor: 'User',
          logTimestamp: String(Date.now()),
        })
      );
		};
	
	const handleLoggerModalClose = () => setIsLoggerOpen(false);
	
  return {
    lists,
    modalActive,
    isLoggerOpen,
    handleToggle,
    handleDeleteBoard,
    handleDragEnd,
    handleLoggerModalClose,
  };
}