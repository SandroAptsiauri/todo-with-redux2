import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasksSlice";
import themeReducer from "./themeSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    theme: themeReducer,
  },
});
