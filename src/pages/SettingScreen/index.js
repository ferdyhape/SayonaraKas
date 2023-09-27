import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button, Gap, HeaderPrimary, TitleSection} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

const SettingScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={styles.page}>
      <HeaderPrimary title="Setting" />
      <View style={styles.card}>
        <Image
          source={require('../../assets/images/user.jpg')}
          style={{width: 100, height: 100, borderRadius: 50}}
        />
        <Text style={styles.txt}>User Sayonara</Text>
        <Text style={styles.desc}>
          Aplikasi ini dibuat untuk memudahkan dalam mengelola keuangan
        </Text>
      </View>
      <View>
        <TitleSection title="Detail Informasi" />
        <View>
          <View style={styles.row}>
            <Text style={styles.txt}>Nama</Text>
            <Text style={styles.desc}>Ferdy Hahan Pradana</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.txt}>Nim</Text>
            <Text style={styles.desc}>2141764028</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.txt}>Tanggal Lahir</Text>
            <Text style={styles.desc}>18 Januari 2002</Text>
          </View>
        </View>
      </View>
      <View>
        <TitleSection title="Setting" />
        <View style={{paddingHorizontal: 15}}>
          <Button
            title="Edit Password"
            onPress={() => navigation.navigate('ForgotPassword')}
            type={'secondary'}
            stylesText={{color: '#666'}}
          />
          <Gap height={10} />
          <Button
            title="Logout"
            type={'secondary'}
            stylesText={{color: '#666'}}
            onPress={() => {
              dispatch({type: 'SET_LOGIN', value: false});
              navigation.reset({index: 0, routes: [{name: 'LoginScreen'}]});
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 15,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  txt: {
    fontSize: 16,
    marginTop: 10,
    color: '#000',
  },
  desc: {
    fontSize: 14,
    marginTop: 10,
    color: 'rgba(0,0,0,0.5)',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginHorizontal: 15,
  },
});
