import {createSlice} from '@reduxjs/toolkit';

const initialState = [];

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state = action.payload;
      console.log('Action from toolkit slice--->', action);
      console.log('State from toolkit slice--->', state);
      return state;
    },
    removeUser: (state, action) => {
      state = [];
      return state;
    },
  },
});

export const {setUser, removeUser} = userSlice.actions;
export default userSlice.reducer;
