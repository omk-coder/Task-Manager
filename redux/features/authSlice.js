
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const loginUser = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/login", formData);
      return data;  //returning the entire response along with token
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Login failed" }
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/signup",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/signup", formData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Signup failed" }
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
    token: null, 
    loading: false,
    error: null,
  },
  reducers: {
    signOutUser: (state) => {
      state.currentUser = null;
      state.token = null; 
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        try {
          const token = action.payload.token; // Extract the token from the response
          const tokenPayload = JSON.parse(atob(token.split(".")[1]));

          state.currentUser = tokenPayload;
          state.token = token; 
          state.loading = false;
          state.error = null;
          console.log("Token stored in Redux:", token); 
        } catch (error) {
          console.log("error", error);
          state.loading = false;
          state.error = { message: "Login failed: Invalid token" };
          state.token = null;

        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.token = null; 

      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        if (action.payload && action.payload.token) {
          const token = action.payload.token;
          try {
            const tokenPayload = JSON.parse(atob(token.split(".")[1]));
            state.currentUser = tokenPayload; // Set currentUser based on token payload
            state.token = token;
            state.loading = false;
            state.error = null;
            console.log("User registered and logged in:", state.currentUser);
          } catch (error) {
            console.error("Error parsing token after registration:", error);
            state.loading = false;
            state.error = { message: "Failed to parse token after registration" };
          }
        } else if (action.payload.user) { // Ensure user details are available
          state.currentUser = action.payload.user; // Set currentUser directly if user details are returned
          state.loading = false;
          state.error = null;
        } else {
          console.warn("No token or user received after registration");
          state.loading = false;
          state.error = { message: "No user data received" };
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.token = null; 
      })
  },
});

export const { signOutUser } = authSlice.actions;
export default authSlice.reducer;
