import { useCallback, useState } from 'react';
import { useBoard, useTypedDispatch } from './redux';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { app } from '../firebase/firebase';
import { removeUser, setUser } from '../store/slices/userSlice';

export const useBoardList = (activeBoardId: string, onSetActiveBoardId: (value: string) => void) => {
	  const dispatch = useTypedDispatch();
    const { boardArray } = useBoard();
    const [isFormOpen, setIsFormOpen] = useState(false);

    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const handleOpen = useCallback(() => setIsFormOpen(true), []);
    const handleClose = useCallback(() => setIsFormOpen(false), []);
    const handleSetBoardId = (boardId: string) => onSetActiveBoardId(boardId);
    const handleLogin = () =>
      signInWithPopup(auth, provider).then(userCredential => {
        dispatch(
          setUser({
            email: userCredential.user.email!,
            id: userCredential.user.uid!,
          })
        );
      });
    const handleLogout = () => signOut(auth).then(() => dispatch(removeUser()));

    const isActiveBoard = (index: number) =>
			boardArray.findIndex(b => b.boardId === activeBoardId) === index;
	
	return {
		boardArray,
    isActiveBoard,
    isFormOpen,
    handleOpen,
    handleClose,
    handleSetBoardId,
    handleLogin,
    handleLogout,
  };
}