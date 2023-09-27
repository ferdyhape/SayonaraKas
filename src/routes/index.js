import {BottomNavigator} from '../components';

const {createBottomTabNavigator} = require('@react-navigation/bottom-tabs');
const {createNativeStackNavigator} = require('@react-navigation/native-stack');
const {
  HomeScreen,
  SplashScreen,
  PemasukkanScreen,
  PengeluaranScreen,
  CreatePemasukkan,
  CreatePengeluaran,
  LoginScreen,
  SettingScreen,
  ForgotPassword,
} = require('../pages');

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator tabBar={props => <BottomNavigator {...props} />}>
      <Tab.Screen
        name="Dashboard"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Pemasukkan"
        component={PemasukkanScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Pengeluaran"
        component={PengeluaranScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="setting"
        component={SettingScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={SplashScreen}
        name="SplashScreen"
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreatePemasukkan"
        component={CreatePemasukkan}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreatePengeluaran"
        component={CreatePengeluaran}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
