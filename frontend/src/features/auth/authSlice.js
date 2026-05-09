import { createSlice } from '@reduxjs/toolkit';

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  userInfo: user ? user : null,
  token: user ? user.token : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      state.token = action.payload.token;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userInfo = null;
      state.token = null;
      localStorage.removeItem('user');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
