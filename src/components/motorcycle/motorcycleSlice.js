import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMotorcycle = createAsyncThunk('get/ferchMortcycle', async () => {
  try {
    const motorcycleData = await fetch('http://localhost:3000/api/v1/motorcycle');
    const dataJson = motorcycleData.json();
    return dataJson;
  } catch (error) {
    return error;
  }
});

export const fetchSpecificMotorcycle = createAsyncThunk('get/fetchSpecificMotorcycle', async (id) => {
  try {
    const motorcycleData = await fetch(`http://localhost:3000/api/v1/motorcycle/${id}`);
    const dataJson = motorcycleData.json();
    return dataJson;
  } catch (error) {
    return error;
  }
});

const motorcycleSlice = createSlice({
  name: 'motorcycle',
  initialState: {
    motorcycle: {},
    status: false,
    specificMotorcycle: {
      motorcycle: {},
      status: false,
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMotorcycle.pending, (state) => {
        state.status = false;
      })
      .addCase(fetchMotorcycle.fulfilled, (state, action) => {
        state.status = true;
        state.motorcycle = action.payload;
      })
      .addCase(fetchSpecificMotorcycle.pending, (state) => {
        state.specificMotorcycle.status = false;
      })
      .addCase(fetchSpecificMotorcycle.fulfilled, (state, action) => {
        state.specificMotorcycle.status = true;
        state.specificMotorcycle.motorcycle = action.payload;
      });
  },
});

export default motorcycleSlice.reducer;
