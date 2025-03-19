import { configureStore } from "@reduxjs/toolkit";
import usersReducer from '../slices/users/userSlices'; // Corrected import statement
import expensesReducer from '../slices/expenses/expensesSlices'; // Import expensesReducer from expensesSlice
const store = configureStore({
  reducer: {
    user: usersReducer, // Corrected reducer name
    expenses: expensesReducer, // Add expensesReducer to the store
  },
});

export default store;