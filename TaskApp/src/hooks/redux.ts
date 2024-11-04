import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { useDispatch } from 'react-redux';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useTypedDispatch = () => useDispatch<AppDispatch>();

export const useLogger = () => useTypedSelector((state: RootState) => state.logger);
export const useBoard = () => useTypedSelector((state: RootState) => state.boards);
export const useModal = () => useTypedSelector((state: RootState) => state.modal);