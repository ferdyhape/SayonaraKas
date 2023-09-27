import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Button, Gap, HeaderPrimary, TextInput} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {LoginImage} from '../../assets';
import {showMessage, useForm} from '../../utils';
import {useNavigation} from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.globalReducer);
  const [form, setForm] = useForm({
    username: '',
    password: '',
  });

  const onHandleSubmit = () => {
    if (form.username === '' || form.password === '') {
      showMessage('Username dan Password tidak boleh kosong', 'danger');
    } else {
      if (form.username === user.username && form.password === user.password) {
        showMessage('Login Berhasil', 'success');
        dispatch({type: 'SET_LOGIN', value: true});
        navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
      } else {
        dispatch({type: 'SET_LOGIN', value: false});
        showMessage('Username atau Password salah', 'danger');
      }
    }
  };

  return (
    <SafeAreaView style={styles.page}>
      <HeaderPrimary title="Login" />
      <View style={{paddingHorizontal: 15, alignItems: 'center'}}>
        <Image source={LoginImage} style={styles.img} />
        <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>
          Sayonara Kas
        </Text>
      </View>
      <View style={{paddingHorizontal: 15}}>
        <TextInput
          lable={'Username'}
          placeholder="Username"
          value={form.username}
          onChangeText={value => setForm('username', value)}
          placeholderTextColor="#ccc"
          stylesTextInput={{color: '#000'}}
        />
        <Gap height={5} />
        <TextInput
          lable={'Password'}
          placeholder="Password"
          value={form.password}
          onChangeText={value => setForm('password', value)}
          placeholderTextColor="#ccc"
          stylesTextInput={{color: '#000'}}
          secureTextEntry={true}
        />
        <Gap height={20} />
        <View style={styles.btnButtom}>
          <Button
            title="Login"
            onPress={() => onHandleSubmit()}
            stylesButton={{backgroundColor: '#476C9B'}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
  img: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
  },
  txtForget: {
    fontSize: 14,
    color: '#C4C4C4',
  },
});
