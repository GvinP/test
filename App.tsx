import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';

import {persistor, store} from './src/store/store';
import {Navigator} from './src/navigation/Navigator';
import {PersistGate} from 'redux-persist/integration/react';
import {ActivityIndicator} from 'react-native';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
