import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LogIn from '../screens/LogIn';
import SignUp from '../screens/SignUp';
import Welcome from '../screens/Welcome';
import {Router} from './Router';
import {AppStack} from './AppStack';
import EmailVerification from '../screens/EmailVerification';
import YoutubeApi from '../screens/YoutubeApi';

const Stack = createStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Welcome" component={Welcome} />
      {/* <Stack.Screen name="Router" component={Router} /> */}
      <Stack.Screen name="AppStack" component={AppStack} />
      <Stack.Screen
        options={{headerTintColor: 'green'}}
        name="EmailVerification"
        component={EmailVerification}
      />
      <Stack.Screen name="YoutubeApi" component={YoutubeApi} />
    </Stack.Navigator>
  );
};
