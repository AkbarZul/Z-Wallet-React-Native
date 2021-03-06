import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  ToastAndroid
} from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input } from 'react-native-elements';
// import ChangePassword from '../ChangePassword';
import axios from 'axios';
import { } from 'react-redux'
import { API_URL } from '@env'

const AddNumber = ({ navigation }) => {
  const token = useSelector((state) => state.authReducer.token);
  const [number, setNumber] = useState('');
  const [errMsg, setErrMsg] = useState('')

  const empty = () => {
    if (number === '') {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = () => {
    const testNumber = /^(^\+62)(\d{3,4}-?){2}\d{3,4}$/g
    if (!empty()) {
      if (testNumber.test(number)) {
        const config = {
          headers: {
            'x-access-token': 'bearer ' + token,
          },
        };
        const updatePhone = {
          phone: number
        }
        axios.patch(API_URL + `/user/changeInfo`, updatePhone, config)
          .then(({ data }) => {
            ToastAndroid.show(data.message, ToastAndroid.SHORT);
            navigation.replace('Profile')
          }).catch(({ response }) => {
            if(response.status == 401){
              ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
            }
            console.log(response.data)
          })

      } else {
        setErrMsg('Format penulisan No. Hp salah !')
      }
    } else {
      setErrMsg('Kolom tidak boleh kosong !')
    }
  }

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#6379F4"
          translucent={true}
        />
        <View style={styles.header2}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={{ marginTop: 20 }}
              onPress={() => {
                navigation.goBack()
              }}
            >
              <Icon name="arrow-left" color="white" size={30} />
            </TouchableOpacity>
            <Text
              style={{
                marginLeft: 10,
                marginTop: 20,
                color: 'white',
                fontSize: 20,
                fontWeight: '700',
                lineHeight: 30,
              }}>
              Add Phone Number
            </Text>
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.subContent}>
            {/* <Text style={styles.header}>Create Security PIN</Text> */}
            <Text style={styles.subHeader}>
              Add at least one phone number for the transfer
            </Text>
            <Text style={styles.subHeader}>
              ID so you can start transfering your money to
            </Text>
            <Text style={styles.subHeader}>another user</Text>
          </View>
          <View style={styles.form}>
            <Input
              placeholder="+62"
              keyboardAppearance="dark"
              leftIcon={
                <Icon
                  name="phone"
                  size={24}
                  color={number === '' ? '#878787' : '#6379F4'}
                />
              }
              onChangeText={(text) => setNumber(text)}
            />
          </View>
          <Text style={{ color: 'red', fontWeight: 'bold' }}>{errMsg}</Text>
        </View>
      </ScrollView>
      <View style={{ marginBottom: 25 }}>
        <TouchableOpacity
          style={empty() ? styles.btn : styles.btnActive}
          onPress={handleSubmit}>
          <Text style={empty() ? styles.textNon : styles.textActive}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  name: {
    // marginBottom: 50,
    color: '#6379F4',
    alignSelf: 'center',
    marginTop: 100,
    fontSize: 26,
    fontWeight: 'bold',
  },
  header2: {
    width: '100%',
    height: 110,
    padding: 20,
    backgroundColor: '#6379F4',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  content: {
    paddingBottom: 30,
    padding: 15,
    // backgroundColor: 'white',
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    // borderTopWidth: 0.5,
    // borderColor: '#EEEEEE',
    // elevation: 1,
    marginTop: 50,
  },
  subContent: {
    // marginTop: 30,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  subHeader: {
    fontSize: 16,
    color: '#878787',
  },
  form: {
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  btn: {
    width: '90%',
    backgroundColor: '#DADADA',
    padding: 18,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 25,
    borderRadius: 12,
  },
  btnActive: {
    width: '90%',
    backgroundColor: '#6379F4',
    padding: 18,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 25,
    borderRadius: 12,
  },
  textNon: {
    fontWeight: 'bold',
    color: '#88888F',
    fontSize: 20,
  },
  textActive: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
  },
});

export default AddNumber;
