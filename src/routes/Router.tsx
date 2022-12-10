import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {AppStack} from './AppStack';
import {AuthStack} from './AuthStack';
import {useAuth} from '../contexts/Auth';
import {Loading} from '../components/Loading';

//redux toolkit
import {useDispatch} from 'react-redux';
import {setUser} from '../reduxtoolkit/UserSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Router = () => {
  const dispatch = useDispatch();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const checkUser = async () => {
      try {
        const value = await AsyncStorage.getItem('pmAsyncStoreData');
        console.log('AsyncStorage Value--->', value);
        dispatch(setUser(JSON.parse(value)));
        if (value !== null) {
          console.log('AsyncStorage Value--->', value);
          setIsSignedIn(true);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkUser();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <NavigationContainer>
      {isSignedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
