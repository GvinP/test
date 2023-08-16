import {NavigationProp, useNavigation} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';

export type RootStackParamsList = {
  Drivers: undefined;
  CurrentDriver: {
    driverId: string;
    givenName: string;
    familyName: string;
  };
};

export type CurrentDriverProps = StackScreenProps<
  RootStackParamsList,
  'CurrentDriver'
>;

export type NavigationUseType = NavigationProp<RootStackParamsList>;

export const useAppNavigation = () => useNavigation<NavigationUseType>();

export interface DriversResponce {
  limit: string;
  offset: string;
  total: string;
  DriverTable: DriverTable;
}

export interface DriverTable {
  Drivers: Driver[];
}

export interface Driver {
  driverId: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
  permanentNumber?: string;
  code?: string;
}
