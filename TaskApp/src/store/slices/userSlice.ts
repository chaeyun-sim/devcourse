import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TState = {
	email: string;
	id: string;
}

const initialState: TState = {
	email: '',
	id: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
		setUser: (state, {payload}: PayloadAction<TState>) => {
			state.email = payload.email;
			state.id = payload.id;
		},
		removeUser: (state) => {
			state.email = '';
			state.id = '';
		}
  },
});

export const { setUser, removeUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
