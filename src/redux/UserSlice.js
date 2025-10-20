// store/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunks
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("https://ezrent-backend.vercel.app/users");
      if (!response.ok) throw new Error("Failed to fetch users");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserRole = createAsyncThunk(
  "users/updateRole",
  async ({ id, role }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `https://ezrent-backend.vercel.app/users/role/${id}`,
        { role }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to update role");
      }

      const data = await response.json();
      return { id, role: role.toLowerCase(), data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `https://ezrent-backend.vercel.app/users/${id}`
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to delete user");
      }

      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    filter: "all",
    loading: false,
    error: null,
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update user role
      .addCase(updateUserRole.fulfilled, (state, action) => {
        const { id, role } = action.payload;
        const user = state.users.find((u) => u._id === id);
        if (user) {
          user.role = role;
        }
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Delete user
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u._id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setFilter, clearError } = userSlice.actions;
export default userSlice.reducer;
