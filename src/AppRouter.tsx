import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import userContext from './common/userContext';

import { Login, Signup, Profile } from './screens';


const Stack = createNativeStackNavigator();

function App() {
  const { user } = useContext(userContext);

  return <NavigationContainer>
    <StatusBar hidden={true} />
    <Stack.Navigator initialRouteName='Login'>
      {!user
        ? <>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={Login}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Signup"
            component={Signup}
          />
        </>
        : null
      }
      {user
        ? <>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Profile"
            component={Profile}
          />
        </>
        : null
      }
    </Stack.Navigator>
  </NavigationContainer>
}

export default App;
