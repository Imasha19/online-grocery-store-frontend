import { configureStore } from "@reduxjs/toolkit";
import usersReducer from '../slices/users/userSlices'; // Corrected import statement

const store = configureStore({
  reducer: {
    user: usersReducer, // Corrected reducer name
  },
});

export default store;