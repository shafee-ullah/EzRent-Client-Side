
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchExperiences, createExperience, rateExperience, deleteExperience } from "../api/experiencesApi";

export const loadExperiences = createAsyncThunk("experience/load", async (_, thunkAPI) => {
  const res = await fetchExperiences();
  return res;
});

export const addExperience = createAsyncThunk("experience/add", async (payload, thunkAPI) => {
  const res = await createExperience(payload);
  return res;
});

export const submitRating = createAsyncThunk("experience/rate", async ({ id, payload }, thunkAPI) => {
  const res = await rateExperience(id, payload);
  return res;
});

export const removeExperience = createAsyncThunk("experience/remove", async ({ id, payload }, thunkAPI) => {
  const res = await deleteExperience(id, payload);
  return { id, res };
});

const experienceSlice = createSlice({
  name: "experience",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    prependExperience(state, action) {
      state.items.unshift(action.payload);
    },
    updateExperience(state, action) {
      const idx = state.items.findIndex(i => String(i._id) === String(action.payload._id));
      if (idx >= 0) state.items[idx] = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loadExperiences.pending, (s) => { s.loading = true; })
      .addCase(loadExperiences.fulfilled, (s, a) => { s.loading = false; s.items = a.payload; })
      .addCase(loadExperiences.rejected, (s, a) => { s.loading = false; s.error = a.error.message; })

      .addCase(addExperience.fulfilled, (s, a) => {
        s.items.unshift(a.payload);
      })

      .addCase(submitRating.fulfilled, (s, a) => {
        const updated = a.payload;
        const idx = s.items.findIndex(i => String(i._id) === String(updated._id));
        if (idx >= 0) s.items[idx] = updated;
      })

      .addCase(removeExperience.fulfilled, (s, a) => {
        s.items = s.items.filter(i => String(i._id) !== String(a.payload.id));
      });
  }
});

export const { prependExperience, updateExperience } = experienceSlice.actions;
export default experienceSlice.reducer;
