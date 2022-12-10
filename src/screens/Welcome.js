import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Button,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Formik, Field} from 'formik';
import * as yup from 'yup';
import CustomInput from '../components/common/components/CustomInput';
import BouncyDrawer from 'react-native-bouncy-drawer';

//redux toolkit
import {useSelector, useDispatch} from 'react-redux';
import {setUser, removeUser} from '../reduxtoolkit/UserSlice';
import YoutubeApi from './YoutubeApi';
import axios from 'axios';

const applications = [
  {
    id: 1,
    title: 'Videos',
    icon: require('../assets/icons/Leave.png'),
    color: '#D444F1',
  },
  {
    id: 2,
    title: 'Buy',
    icon: require('../assets/icons/Movements.png'),
    color: '#2E90FA',
  },
  {
    id: 3,
    title: 'Sell',
    icon: require('../assets/icons/Attendance.png'),
    color: '#F63D68',
  },
  {
    id: 4,
    title: 'Add Video',
    icon: require('../assets/icons/IOU.png'),
    color: '#F79009',
  },
  {
    id: 5,
    title: 'Support',
    icon: require('../assets/icons/Loan.png'),
    color: '#669F2A',
  },
  {
    id: 6,
    title: 'Privacy Policy',
    icon: require('../assets/icons/Overtime.png'),
    color: '#875BF7',
  },
];

const blogValidationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  post: yup
    .string()
    .min(20, ({min, value}) => `${min - value.length} characters to go`)
    .required('Blog post is required'),
});

const Welcome = ({navigation, route}) => {
  const [userCurrentBalance, setUserCurrentBalance] = useState(0);
  // const {user} = route.params;
  // console.log('User--->', user);

  // const dispatch = useDispatch();

  const userInfo = useSelector(state => state.user);

  console.log('User from toolkit store welcome page--->', userInfo);

  const handleUserBalance = () => {
    setUserCurrentBalance(0);
    const url = `https://xdrabbit-server.vercel.app/user/balance/${userInfo?.email}`;
    axios
      .get(url)
      .then(response => {
        const result = response.data;
        const {msg, status, data} = result;
        // console.log('Result login--->', result);
        if (status === 'Success') {
          // console.log('Balance--->', data);
          setUserCurrentBalance(data);
        } else {
          console.log('Error--->', msg);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    handleUserBalance();
  }, []);

  //item
  const renderApplications = item => {
    return (
      <View style={[styles.itemContainer2]}>
        <TouchableOpacity onPress={() => navigation.navigate('YoutubeApi')}>
          <View
            style={[styles.imageContainer, {backgroundColor: item.item.color}]}>
            <Image source={item.item.icon} />
          </View>
          <Text style={styles.itemName}>{item.item.title}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      {/* <SafeAreaView style={styles.container}> */}

      <View style={styles.container}>
        <View style={styles.profileTop}>
          <View style={styles.profileHeaderLeft}>
            <Image
              style={styles.profileImage}
              source={require('../assets/images/Avatar.png')}
            />
            <View>
              <Text style={styles.nameText}>{userInfo?.name}</Text>
              <Text style={styles.normalText}>Email: {userInfo?.email}</Text>
              <Text style={styles.normalText}>ID: {userInfo?._id}</Text>
              {/* <Text style={styles.normalText}>Package: Gold</Text> */}
              {/* <Text style={styles.normalText}>
                Balance: {userCurrentBalance || 'Not Found'}
              </Text> */}
              <TouchableOpacity onPress={handleUserBalance}>
                <Text style={styles.normalText}>Refresh Balance</Text>
              </TouchableOpacity>
            </View>
          </View>
          {userInfo?.verified ? (
            <View style={styles.activityContainer}>
              <Text style={styles.activityText}>Active</Text>
            </View>
          ) : (
            <View style={styles.activityContainer}>
              <Text style={styles.activityText}>Deactive</Text>
            </View>
          )}
        </View>

        <View style={styles.horizontalDivider}></View>

        {/* Bottom start */}
        {/* <View style={styles.itemContainer}>
          <Image
            style={styles.smallIcon}
            source={require('../assets/icons/Department.png')}
          />
          <View>
            <Text style={styles.titleText}>
              {userCurrentBalance || 'Not Found'}
            </Text>
            <Text style={styles.smallText}>Balance</Text>
          </View>
        </View> */}

        {/* <View style={styles.horizontalDivider}></View>
        <View style={styles.itemContainer}>
          <Image
            style={styles.smallIcon}
            source={require('../assets/icons/Dob.png')}
          />
          <View>
            <Text style={styles.titleText}>28 September, 1990</Text>
            <Text style={styles.smallText}>Date of Birth</Text>
          </View>
        </View> */}

        {/* <View style={styles.horizontalDivider}></View> */}
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}>
          <View style={styles.itemContainer}>
            <Image
              style={styles.smallIcon}
              source={require('../assets/icons/Gender.png')}
            />
            <View>
              <Text style={styles.titleText}>
                {userCurrentBalance || 'Wait..'}
              </Text>
              <Text style={styles.smallText}>Balance</Text>
            </View>
          </View>

          <View
            style={{
              borderLeftColor: '#F2F2F7',
              borderLeftWidth: 1,
              marginTop: 8,
            }}></View>
          <View style={{paddingHorizontal: 16}}>
            <View style={styles.varticalDivider}>
              <Image
                style={styles.smallIcon}
                source={require('../assets/icons/Gender.png')}
              />
              <View>
                <Text style={styles.titleText}>Gold</Text>
                <Text style={styles.smallText}>Package</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              borderLeftColor: '#F2F2F7',
              borderLeftWidth: 1,
              marginTop: 8,
            }}></View>
          <View style={{paddingHorizontal: 16}}>
            <View style={styles.varticalDivider}>
              <Image
                style={styles.smallIcon}
                source={require('../assets/icons/Gender.png')}
              />
              <View>
                <Text style={styles.titleText}>0001</Text>
                <Text style={styles.smallText}>User ID</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <Text style={styles.headerText}>Application</Text>
      <View style={styles.itemsContainer2}>
        <FlatList
          data={applications}
          renderItem={renderApplications}
          keyExtractor={item => item.id}
          numColumns={4}
        />
      </View>

      {/* <View style={styles.welcomeContainer}>
          <Text>Welcome Screen</Text>
          <Text>Id: {userInfo?._id}</Text>
          <Text>Name: {userInfo?.name}</Text>
          <Text>Email: {userInfo?.email}</Text>
          <Text>Balance: {userInfo?.balance}</Text> */}

      {/* <Text>{JSON.stringify(user, null, 2)}</Text> */}
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
      {/* </View> */}

      {/* <YoutubeApi /> */}
      {/* </SafeAreaView> */}
    </>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // justifyContent: 'center',
//     // alignItems: 'center',
//   },
//   welcomeContainer: {
//     width: '80%',
//     alignItems: 'center',
//     backgroundColor: 'white',
//     padding: 10,
//     elevation: 10,
//     margin: 10,
//     marginTop: 20,
//     backgroundColor: '#e6e6e6',
//   },
// });

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 22,
    paddingBottom: 16,
  },
  profileTop: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  profileHeaderLeft: {
    display: 'flex',
    flexDirection: 'row',
  },
  profileImage: {
    height: 72,
    width: 72,
    marginRight: 19,
    borderRadius: 99,
  },
  nameText: {
    color: '#344054',
    fontSize: 20,
    fontWeight: '600',
  },
  normalText: {
    color: '#344054',
    fontSize: 16,
    fontWeight: '400',
  },
  activityContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },

  activityText: {
    color: '#299647',
    paddingHorizontal: 8,
    paddingVertical: 1,
    backgroundColor: '#E6F9E9',
    borderRadius: 99,
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  smallIcon: {
    height: 20,
    width: 20,
    marginTop: 6,
    marginRight: 19,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#344054',
  },
  smallText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#667085',
  },
  horizontalDivider: {
    borderTopColor: '#F2F2F7',
    borderTopWidth: 1,
  },
  varticalDivider: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 8,
  },

  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#344054',
    marginTop: 8,
    marginLeft: 16,
  },
  itemsContainer2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemContainer2: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '25%',
    marginTop: 12,
  },
  imageContainer: {
    height: 48,
    width: 48,
    marginHorizontal: 16,
    marginTop: 6,
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center',
  },

  itemName: {
    fontSize: 14,
    fontWeight: '400',
    color: '#1D2939',
    alignSelf: 'center',
    textAlign: 'center',
  },
});

export default Welcome;
