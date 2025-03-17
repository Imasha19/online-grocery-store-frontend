import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Login action
export const loginUserAction = createAsyncThunk(
  'user/login',
  async (payload, { rejectWithValue }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const { data } = await axios.post("http://localhost:8081/api/users/login", payload, config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

const usersSlice = createSlice({
  name: 'user',
  initialState: {
    userAuth: null,
    userLoading: false,
    userAppErr: null,
    userServerErr: null,
    isLogin: false,
  },
  extraReducers: (builder) => {
    builder.addCase(loginUserAction.pending, (state) => {
      state.userLoading = true;
      state.userAppErr = undefined;
      state.userServerErr = undefined;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.userAuth = action?.payload;
      state.userLoading = false;
      state.userAppErr = undefined;
      state.userServerErr = undefined;
      state.isLogin = true;
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.userLoading = false;
      state.userAppErr = action?.payload?.message || "Invalid email or password";
      state.userServerErr = action.error.message;
    });
  },
});

export default usersSlice.reducer;