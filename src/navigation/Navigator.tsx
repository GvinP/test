import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamsList} from '../types/types';
import Drivers from '../screens/Drivers/Drivers';
import CurrentDriver from '../screens/CurrentDriver/CurrentDriver';

const Stack = createStackNavigator<RootStackParamsList>();

export function Navigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={'Drivers'} component={Drivers} />
      <Stack.Screen
        name={'CurrentDriver'}
        component={CurrentDriver}
        options={({route}) => ({
          title: `${route.params.givenName} ${route.params.familyName}`,
        })}
      />
    </Stack.Navigator>
  );
}
