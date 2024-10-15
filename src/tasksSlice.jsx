import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://crudapi.co.uk/api/v1/todos";
const API_KEY = "5H6KCRj6ASZBhzACq1gkMxnqzyGf4hZIaTQ3PZCf3p_11avQGQ";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  return response.data.results;
});

export const addTask = createAsyncThunk("tasks/addTask", async (task) => {
  const response = await axios.post(API_URL, task, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  return response.data;
});

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, updatedTask }) => {
    const response = await axios.patch(`${API_URL}/${id}`, updatedTask, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    });
    return response.data;
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState: { items: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "succeeded";
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export default tasksSlice.reducer;
