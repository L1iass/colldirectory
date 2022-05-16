import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createColl = createAsyncThunk(
  "coll/createColl",
  async ({ updatedCollData, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createColl(updatedCollData);
      toast.success("Collection Added Successfully");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getColls = createAsyncThunk(
  "coll/getColls",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getColls();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getColl = createAsyncThunk(
  "coll/getColl",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getColl(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getCollsByUser = createAsyncThunk(
  "coll/getCollsByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getCollsByUser(userId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteColl = createAsyncThunk(
  "coll/deleteColl",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deleteColl(id);
      toast.success("Collection Deleted Succesfully");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateColl = createAsyncThunk(
  "coll/updateColl",
  async ({ id, updatedCollData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.updateColl(updatedCollData, id);
      toast.success("Collection Updated Succesfully");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const searchColls = createAsyncThunk(
  "coll/searchColls",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await api.searchColls(searchQuery);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const likeColl = createAsyncThunk(
  "coll/likeColl",
  async ({ _id }, { rejectWithValue }) => {
    try {
      const response = await api.likeColl(_id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const collSlice = createSlice({
  name: "coll",
  initialState: {
    coll: {},
    colls: [],
    userColls: [],
    tagColls: [],
    error: "",
    loading: false,
  },
  extraReducers: {
    [createColl.pending]: (state, action) => {
      state.loading = true;
    },
    [createColl.fulfilled]: (state, action) => {
      state.loading = false;
      state.colls = [action.payload];
    },
    [createColl.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getColls.pending]: (state, action) => {
      state.loading = true;
    },
    [getColls.fulfilled]: (state, action) => {
      state.loading = false;
      state.colls = action.payload;
    },
    [getColls.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getColl.pending]: (state, action) => {
      state.loading = true;
    },
    [getColl.fulfilled]: (state, action) => {
      state.loading = false;
      state.coll = action.payload;
    },
    [getColl.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getCollsByUser.pending]: (state, action) => {
      state.loading = true;
    },
    [getCollsByUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.userColls = action.payload;
    },
    [getCollsByUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteColl.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteColl.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userColls = state.userColls.filter((item) => item._id !== id);
        state.colls = state.colls.filter((item) => item._id !== id);
      }
    },
    [deleteColl.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateColl.pending]: (state, action) => {
      state.loading = true;
    },
    [updateColl.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userColls = state.userColls.map((item) =>
          item._id === id ? action.payload : item
        );
        state.colls = state.colls.map((item) =>
          item._id === id ? action.payload : item
        );
      }
    },
    [updateColl.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [searchColls.pending]: (state, action) => {
      state.loading = true;
    },
    [searchColls.fulfilled]: (state, action) => {
      state.loading = false;
      state.tours = action.payload;
    },
    [searchColls.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [likeColl.pending]: (state, action) => {},
    [likeColl.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { _id },
      } = action.meta;
      if (_id) {
        state.tours = state.tours.map((item) =>
          item._id === _id ? action.payload : item
        );
      }
    },
    [likeColl.rejected]: (state, action) => {
      state.error = action.payload.message;
    },
  },
});

export default collSlice.reducer;
