import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

// Create Expense action
export const createExpenseAction = createAsyncThunk(
  "expense/create",
  async (payload, { rejectWithValue, getState }) => {
    try {
      // Get user token from Redux state
      const userToken = getState()?.user?.userAuth?.token;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };

      const { data } = await axios.post(`${baseURL}/expenses`, payload, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || "Something went wrong");
    }
  }
);

// Fetch all expenses action
export const fetchAllExpenseAction = createAsyncThunk(
  "expense/fetch",
  async (page, { rejectWithValue, getState }) => {
    try {
      // Get user token from Redux state
      const userToken = getState()?.user?.userAuth?.token; // Ensure correct state path

      if (!userToken) {
        throw new Error("Unauthorized. No token found.");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      const { data } = await axios.get(`${baseURL}/expenses?page=${page}`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || "Something went wrong");
    }
  }
);

const expensesSlice = createSlice({
  name: "expenses",
  initialState: {
    loading: false,
    expenseCreated: null,
    expensesList: [], // Initialize this to avoid "undefined" errors
    appErr: null,
    serverErr: null,
  },
  extraReducers: (builder) => {
    builder
      // Create expense
      .addCase(createExpenseAction.pending, (state) => {
        state.loading = true;
        state.appErr = null;
        state.serverErr = null;
      })
      .addCase(createExpenseAction.fulfilled, (state, action) => {
        state.loading = false;
        state.expenseCreated = action.payload;
      })
      .addCase(createExpenseAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action.payload;
        state.serverErr = action.error?.message;
      })
      // Fetch all expenses
      .addCase(fetchAllExpenseAction.pending, (state) => {
        state.loading = true;
        state.appErr = null;
        state.serverErr = null;
      })
      .addCase(fetchAllExpenseAction.fulfilled, (state, action) => {
        state.loading = false;
        state.expensesList = action.payload.data || []; // Ensure it defaults to an empty array
      })
      .addCase(fetchAllExpenseAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action.payload;
        state.serverErr = action.error?.message;
      });
  },
});

export default expensesSlice.reducer;