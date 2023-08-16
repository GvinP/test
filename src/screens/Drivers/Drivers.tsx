import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useEffect} from 'react';

import {useAppDispatch, useAppSelector} from '../../store/store';
import {Driver, useAppNavigation} from '../../types/types';
import {getAllDrivers} from '../../store/rootReducer';

const Drivers = () => {
  const drivers = useAppSelector(state => state.root.allDrivers);
  const offset = useAppSelector(state => state.root.offset);
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();
  useEffect(() => {
    dispatch(getAllDrivers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem: ListRenderItem<Driver> = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.button}
        onPress={() =>
          navigation.navigate('CurrentDriver', {
            driverId: item.driverId,
            familyName: item.familyName,
            givenName: item.givenName,
          })
        }>
        <Text style={styles.driverName}>
          {item.givenName} {item.familyName}
        </Text>
      </TouchableOpacity>
    );
  };
  const keyExtractor = (item: Driver, index: number) =>
    `${item.driverId} ${index}`;

  const fetchMoreDrivers = () => {
    dispatch(getAllDrivers(offset));
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={drivers}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        style={styles.container}
        onEndReachedThreshold={0.5}
        onEndReached={fetchMoreDrivers}
      />
    </View>
  );
};

export default Drivers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  button: {
    marginHorizontal: 16,
    marginTop: 8,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEEEEE',
    borderRadius: 14,
  },
  driverName: {
    fontSize: 18,
    fontWeight: '500',
  },
});
