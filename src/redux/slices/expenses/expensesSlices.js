import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

export const createExpenseAction = createAsyncThunk(
  "expenses/create",
  async (expenseData, { rejectWithValue, getState }) => {
    try {
      const { userAuth } = getState().user; // Get user from state
      const token = userAuth?.token; // Assuming token is stored in userAuth

      const response = await axios.post(
        `${baseURL}/expenses`,
        expenseData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);


// Example Slice to manage expenses
const expensesSlice = createSlice({
  name: "expenses", // Name of the slice
  initialState: {
    expenses: [], // Store list of expenses
    expenseLoading: false, // Loading state
    expenseError: null,
    expenseCreated: false,  // Error state
  },
  reducers: {
    resetSuccess: (state) => {
      state.expenseCreated = false; // ✅ Reset success message
    },
  },
  extraReducers: (builder) => {
    // Handle pending state (loading)
    builder.addCase(createExpenseAction.pending, (state) => {
      state.expenseLoading = true;
      state.expenseError = null; // Reset error on new request
      state.expenseCreated = false;
    });
    
    // Handle fulfilled state (success)
    builder.addCase(createExpenseAction.fulfilled, (state, action) => {
      state.expenses.push(action.payload);  // Add the new expense to the list
      state.expenseLoading = false;  // Reset loading state
      state.expenseCreated = true; // ✅ Set success to true
    });
    // Handle rejected state (error)
    builder.addCase(createExpenseAction.rejected, (state, action) => {
      state.expenseLoading = false;  // Reset loading state
      state.expenseError = action.payload;  // Store the error message
      state.expenseCreated = false; // Ensure success is false on error
    });
  },
});

// Export the reducer
export const { resetSuccess } = expensesSlice.actions;
export default expensesSlice.reducer;
