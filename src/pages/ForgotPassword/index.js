import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button, Gap, HeaderPrimary, TextInput} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {openDatabase} from 'react-native-sqlite-storage';
import {showMessage, useForm} from '../../utils';

const ForgotPassword = () => {
  const navigation = useNavigation();
  const db = openDatabase({name: 'mydb.db'});
  const dis = useDispatch();
  const [form, setForm] = useForm({
    password: '',
    confirmPassword: '',
  });
  const onHandleSubmit = () => {
    if (form.password !== form.confirmPassword) {
      showMessage('Password tidak sama', 'danger');
      return false;
    }
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE user SET password=? WHERE id=?',
        [form.password, 1],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            console.log('masuk');
            dis({
              type: 'SET_USER',
              value: {
                id: 1,
                username: 'user',
                password: form.password,
              },
            });
            showMessage('Data berhasil disimpan', 'success');
            navigation.reset({index: 0, routes: [{name: 'LoginScreen'}]});
          } else {
            showMessage('Gagal menyimpan data', 'danger');
          }
        },
      );
    });
  };
  return (
    <SafeAreaView style={styles.page}>
      <HeaderPrimary title="Lupa Password" type={'detail'} />
      <View style={{paddingHorizontal: 15, paddingVertical: 15}}>
        <TextInput
          lable="Password Baru"
          placeholder="Masukkan Password Baru"
          value={form.password}
          onChangeText={value => setForm('password', value)}
          placeholderTextColor="#666"
          stylesTextInput={{color: '#666'}}
          secureTextEntry={true}
        />
        <Gap height={5} />
        <TextInput
          lable="Confirm Password Baru"
          placeholder="Masukkan Confirm Password Lama"
          value={form.confirmPassword}
          onChangeText={value => setForm('confirmPassword', value)}
          placeholderTextColor="#666"
          stylesTextInput={{color: '#666'}}
          secureTextEntry={true}
        />
        <Gap height={15} />
        <Button
          title="Simpan"
          onPress={() => {}}
          type={'primary'}
          stylesText={{color: '#fff'}}
          onPress={() => onHandleSubmit()}
        />
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
