// features/user/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Define initial state
const initialState = {
  isAuthenticated:false,
  user:null,
  userId:null
};

// Create userSlice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
        state.isAuthenticated=true;
      state.user = action.payload.user;
      state.userId=action.payload.userId;
      localStorage.setItem('auth', JSON.stringify({ user: action.payload.user, userId: action.payload.userId }));
    },
    logout: (state, action) => {
        state.isAuthenticated=false;
        state.user = null;
        state.userId=null;
        localStorage.removeItem('auth');
    },
    
  },
});

// Export actions generated from the slice
export const { login,logout } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
