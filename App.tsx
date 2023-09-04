import * as React from 'react';
import {NavigationContainer, NavigationProp} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './components/LoginScreen';
import {PaperProvider} from 'react-native-paper';
import {StoreProvider} from 'easy-peasy';
import {store, useStoreActions, useStoreState} from './store';
import HomeScreen from './components/HomeScreen';
import GetTicket from './components/GetTicket';
import ScanTicketCode from "./components/ScanTicketCode";
import VerifyTicketScreen from "./components/VerifyTicketScreen";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="同济院线经理端" component={HomeScreen} />
            <Stack.Screen name="登录" component={LoginScreen} />
            <Stack.Screen name="客户取票" component={GetTicket} />
            <Stack.Screen name="扫码界面" component={ScanTicketCode} />
            <Stack.Screen name="验票界面" component={VerifyTicketScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </StoreProvider>
  );
}

export default App;
