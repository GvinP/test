import axios from 'axios';
import {DriversResponce} from '../types/types';

const BASE_URL = 'http://ergast.com/api/';

export const instance = axios.create({
  baseURL: BASE_URL,
});

const LIMIT = 30;

export const api = {
  getAllDrivers(offset?: number) {
    return instance.get<{MRData: DriversResponce}>(
      `f1/drivers.json?limit=${LIMIT}&offset=${offset}`,
    );
  },
  getCurrentDriver(name: string) {
    return instance.get<{MRData: DriversResponce}>(`f1/drivers/${name}.json`);
  },
};
