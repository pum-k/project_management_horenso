import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import userApi from 'api/userApi';

const initialState = {
  id: '',
  isLogin: false,
  loadding: false,
  error: '',
};

export const userLogin = createAsyncThunk(
  'user/login',
  async (params, thunkAPI) => {
    const currentUser = await userApi.login(params);
    return currentUser;
  }
);

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: {
    [userLogin.pending]: (state) => {
      state.loadding = true;
    },
    [userLogin.rejected]: (state) => {
      state.loadding = false;
      state.error = 'Login failed';
    },
    [userLogin.fulfilled]: (state, action) => {
      state.loadding = false;
      state.isLogin = action.payload.isLogin;
      state.id = action.payload.id;
      localStorage.setItem('access_token', action.payload.id);
      alert('Logged in successfully!');
      document.location.href = '/';
    },
  },
});

export const { auth } = loginSlice.actions;
export default loginSlice.reducer;
