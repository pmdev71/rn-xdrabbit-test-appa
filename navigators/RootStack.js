import React, {useEffect, useState} from 'react';

//React navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//Screens
import LogIn from '../src/screens/LogIn';
import SignUp from '../src/screens/SignUp';
import Welcome from '../src/screens/Welcome';
import EmailVerification from '../src/screens/EmailVerification';

//redux toolkit
import {useDispatch} from 'react-redux';
import {setUser} from '../src/reduxtoolkit/UserSlice';
import YoutubeApi from '../src/screens/YoutubeApi';
import Spalash from '../src/screens/Spalash';

const Stack = createStackNavigator();

const RootStack = () => {
  const dispatch = useDispatch();
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const value = await AsyncStorage.getItem('pmAsyncStoreData');
        console.log('AsyncStorage Value--->', value);
        dispatch(setUser(JSON.parse(value)));
        if (value !== null) {
          console.log('AsyncStorage Value--->', value);
          setIsSignedIn(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkUser();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTintColor: 'transparent',
          headerTransparent: true,
          headerTitle: '',
          headerLeftContainerStyle: {
            paddingLeft: 5,
          },
        }}
        // initialRouteName={isSignedIn ? 'Welcome' : 'LogIn'}
      >
        {console.log('isSignedIn--->', isSignedIn)}
        {isSignedIn ? (
          <>
            <Stack.Screen
              // options={{headerTintColor: 'green'}}
              name="Welcome"
              component={Welcome}
            />
            {/* <Stack.Screen name="LogIn" component={LogIn} /> */}
            <Stack.Screen name="YoutubeApi" component={YoutubeApi} />
          </>
        ) : (
          <>
            {/* <Stack.Screen name="Spalash" component={Spalash} /> */}
            <Stack.Screen name="LogIn" component={LogIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen
              // options={{headerTintColor: 'green'}}
              name="Welcome"
              component={Welcome}
            />

            <Stack.Screen
              options={{headerTintColor: 'green'}}
              name="EmailVerification"
              component={EmailVerification}
            />
            <Stack.Screen name="YoutubeApi" component={YoutubeApi} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
