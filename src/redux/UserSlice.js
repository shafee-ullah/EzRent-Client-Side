// src/redux/slices/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const API_URL = "http://localhost:5000/users";

// Fetch all users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch users");
  return await res.json();
});

// Update user role
export const updateUserRole = createAsyncThunk(
  "users/updateRole",
  async ({ id, role }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/role/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message);
      toast.success(`✅ Role updated to ${role}`);
      return { id, role };
    } catch (error) {
      toast.error("⚠️ Error updating role");
      return rejectWithValue(error.message);
    }
  }
);

// Delete user
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message);
      toast.success("User deleted successfully 🗑️", {
        style: {
          borderRadius: "8px",
          background: "#10B981",
          color: "#fff",
        },
      });
      return id;
    } catch (error) {
      toast.error("⚠️ Error deleting user");
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Update role
      .addCase(updateUserRole.fulfilled, (state, action) => {
        const { id, role } = action.payload;
        state.list = state.list.map((u) => (u._id === id ? { ...u, role } : u));
      })

      // Delete user
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.list = state.list.filter((u) => u._id !== action.payload);
      });
  },
});

export default userSlice.reducer;
