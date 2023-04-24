import { configureStore } from '@reduxjs/toolkit';
import covidSlice from './covid/covidSlice';

const store = configureStore({
  reducer: {
    covid: covidSlice,
  },
});

export default store;
