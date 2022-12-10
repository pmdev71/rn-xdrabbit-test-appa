import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';
import {Formik, Field} from 'formik';
import * as yup from 'yup';
import CustomInput from '../components/common/components/CustomInput';
import AsyncStorage from '@react-native-async-storage/async-storage';

const blogValidationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  post: yup
    .string()
    .min(20, ({min, value}) => `${min - value.length} characters to go`)
    .required('Blog post is required'),
});

const Spalash = ({navigation}) => {
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
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Text>Spalash Screen </Text>
          {isSignedIn ? null : (
            <Button
              title="Log In"
              onPress={() => navigation.navigate('LogIn')}
            />
          )}

          {/* <Formik
            validationSchema={blogValidationSchema}
            initialValues={{
              title: '',
              post: '',
            }}
            onSubmit={values => console.log(values)}>
            {({handleSubmit, isValid, values}) => (
              <>
                <Field
                  component={CustomInput}
                  name="title"
                  placeholder="Title"
                />
                <Field
                  component={CustomInput}
                  name="post"
                  placeholder="Write post..."
                  multiline
                  numberOfLines={3}
                />
                <Button
                  onPress={handleSubmit}
                  title="POST"
                  disabled={!isValid}
                />
              </>
            )}
          </Formik> */}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeContainer: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    elevation: 10,
    backgroundColor: '#e6e6e6',
  },
});
export default Spalash;
