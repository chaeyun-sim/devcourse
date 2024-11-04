import { createSlice } from '@reduxjs/toolkit';
import { ILogItem } from '../../types';

type TState = {
  logArray: ILogItem[];
};

const initialState: TState = {
  logArray: [],
};

const loggerState = createSlice({
	name: 'logger',
	initialState,
	reducers: {}
})

export const loggerReducer = loggerState.reducer;