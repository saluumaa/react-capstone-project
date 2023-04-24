import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchData = createAsyncThunk('covid/fetchCovidData', async () => {
  const response = await fetch('https://disease.sh/v3/covid-19/countries');
  const data = await response.json();
  return data;
});

export const getAllData = createAsyncThunk('covid/getAllData', async () => {
  const response = await fetch('https://disease.sh/v3/covid-19/all');
  const data = await response.json();
  return data;
});

const initialState = {
  data: [],
  allData: [],
  loading: false,
  error: null,
  fetched: false,
};

const covidSlice = createSlice({
  name: 'covid',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        if (!state.fetched) {
          state.data = action.payload;
          state.loading = false;
        }
      })
      .addCase(getAllData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllData.fulfilled, (state, action) => {
        state.allData = action.payload;
        state.loading = false;
      });
  },
});

export const { searchCovidData } = covidSlice.actions;

export default covidSlice.reducer;
