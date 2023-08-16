import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {useAppDispatch, useAppSelector} from '../../store/store';
import {clearCurrentDriver, getCurrentDriver} from '../../store/rootReducer';
import {useEffect} from 'react';
import {CurrentDriverProps} from '../../types/types';

const CurrentDriver = ({route}: CurrentDriverProps) => {
  const currentDriver = useAppSelector(state => state.root.currentDriver);
  const dispatch = useAppDispatch();
  const driverId = route.params.driverId;

  useEffect(() => {
    dispatch(getCurrentDriver(driverId));
    return () => {
      dispatch(clearCurrentDriver());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePress = () => Linking.openURL(currentDriver.url);

  return (
    <View style={styles.container}>
      <Text style={styles.driverName}>
        {currentDriver.givenName} {currentDriver.familyName}
      </Text>
      <Text style={styles.nationality}>{currentDriver.nationality}</Text>
      <Text style={styles.date}>{currentDriver.dateOfBirth}</Text>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Biography</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CurrentDriver;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingTop: 20,
  },
  driverName: {
    fontSize: 22,
    fontWeight: '600',
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 1,
    paddingBottom: 8,
  },
  nationality: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 8,
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 1,
    paddingBottom: 8,
  },
  date: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 8,
  },
  button: {
    marginHorizontal: 16,
    marginTop: 32,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4A29C7',
    borderRadius: 14,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
  },
});
