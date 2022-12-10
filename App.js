/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/reduxtoolkit/UserStore';
import RootStack from './navigators/RootStack';
import {Router} from './src/routes/Router';
// import {Formik} from 'formik';
// import * as yup from 'yup';

// const loginValidationSchema = yup.object().shape({
//   email: yup
//     .string()
//     .email('Please enter valid email')
//     .required('Email Address is Required'),
//   password: yup
//     .string()
//     .min(8, ({min}) => `Password must be at least ${min} characters`)
//     .required('Password is required'),
// });

const App = () => {
  return (
    <>
      <Provider store={store}>
        {/* <RootStack /> */}
        <Router />
      </Provider>
    </>
    // <View style={styles.loginContainer}>
    //   <Text>Login Screen</Text>
    //   <Formik
    //     validationSchema={loginValidationSchema}
    //     initialValues={{email: '', password: ''}}
    //     onSubmit={values => console.log(values)}>
    //     {({
    //       handleChange,
    //       handleBlur,
    //       handleSubmit,
    //       values,
    //       errors,
    //       isValid,
    //       touched,
    //     }) => (
    //       <>
    //         <TextInput
    //           name="email"
    //           placeholder="Email Address"
    //           style={styles.textInput}
    //           onChangeText={handleChange('email')}
    //           onBlur={handleBlur('email')}
    //           value={values.email}
    //           keyboardType="email-address"
    //         />
    //         {errors.email && touched.email && (
    //           <Text style={{fontSize: 10, color: 'red'}}>{errors.email}</Text>
    //         )}
    //         <TextInput
    //           name="password"
    //           placeholder="Password"
    //           style={styles.textInput}
    //           onChangeText={handleChange('password')}
    //           onBlur={handleBlur('password')}
    //           value={values.password}
    //           secureTextEntry
    //         />
    //         {errors.password && touched.password && (
    //           <Text style={{fontSize: 10, color: 'red'}}>
    //             {errors.password}
    //           </Text>
    //         )}
    //         <Button onPress={handleSubmit} title="LOGIN" disabled={!isValid} />
    //       </>
    //     )}
    //   </Formik>
    // </View>
  );
};

export default App;

// const styles = StyleSheet.create({
//   loginContainer: {
//     width: '80%',
//     alignItems: 'center',
//     alignSelf: 'center',
//     marginTop: 100,
//     padding: 10,
//     elevation: 10,
//     backgroundColor: '#e6e6e6',
//   },
//   textInput: {
//     height: 40,
//     width: '100%',
//     margin: 10,
//     backgroundColor: 'white',
//     borderColor: 'gray',
//     borderWidth: StyleSheet.hairlineWidth,
//     borderRadius: 10,
//   },
// });
