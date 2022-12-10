import React from 'react';
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

const blogValidationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  post: yup
    .string()
    .min(20, ({min, value}) => `${min - value.length} characters to go`)
    .required('Blog post is required'),
});

const EmailVerification = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Text>Verify email and try again ! </Text>

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
export default EmailVerification;
