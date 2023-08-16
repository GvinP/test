import {createAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from '../api/api';
import {Alert} from 'react-native';
import {Driver, DriversResponce} from '../types/types';

export const getAllDrivers = createAsyncThunk<
  DriversResponce | undefined,
  number | undefined
>('root/getAllDrivers', async offset => {
  try {
    const res = await api.getAllDrivers(offset);
    return res.data.MRData;
  } catch (error) {
    Alert.alert('Loading data error', (error as Error).message);
  }
});

export const getCurrentDriver = createAsyncThunk<Driver | undefined, string>(
  'root/getCurrentDriver',
  async (name: string) => {
    try {
      const res = await api.getCurrentDriver(name);
      return res.data.MRData.DriverTable.Drivers[0];
    } catch (error) {
      Alert.alert('Loading data error', (error as Error).message);
    }
  },
);

export const clearCurrentDriver = createAction('root/clearCurrentDriver');

const rootSlice = createSlice({
  name: 'rootReducer',
  initialState: {
    allDrivers: [] as Driver[],
    currentDriver: {} as Driver,
    offset: 0,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllDrivers.fulfilled, (state, action) => {
        state.allDrivers = action.payload?.DriverTable.Drivers
          ? [...state.allDrivers, ...action.payload?.DriverTable.Drivers]
          : [];
        state.offset =
          Number(action.payload?.offset) + Number(action.payload?.limit) || 0;
      })
      .addCase(getCurrentDriver.fulfilled, (state, action) => {
        state.currentDriver = action.payload ? action.payload : ({} as Driver);
      })
      .addCase(clearCurrentDriver, state => {
        state.currentDriver = {} as Driver;
      });
  },
});

export const root = rootSlice.reducer;
