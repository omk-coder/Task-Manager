import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTask",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token; 
      const { data } = await axios.get("/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data.tasks;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch tasks" }
      );
    }
  }
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (taskData, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const { data } = await axios.post("/api/tasks", taskData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data.task;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to create task" }
      );
    }
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, taskData }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const { data } = await axios.put(`/api/tasks/${id}`, taskData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data.task;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to update task" }
      );
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      await axios.delete(`/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to delete task" }
      );
    }
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.unshift(action.payload);
        state.loading = false;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.map((task) =>
          task._id === action.payload ? action.payload : task
        );
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      })
     
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      );
  },
});

export default taskSlice.reducer;
