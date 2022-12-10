import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Welcome from '../screens/Welcome';
import LogIn from '../screens/LogIn';
import SignUp from '../screens/SignUp';
import EmailVerification from '../screens/EmailVerification';
import YoutubeApi from '../screens/YoutubeApi';

const Stack = createStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen
        options={{headerTintColor: 'green'}}
        name="EmailVerification"
        component={EmailVerification}
      />
      <Stack.Screen name="YoutubeApi" component={YoutubeApi} />
    </Stack.Navigator>
  );
};
