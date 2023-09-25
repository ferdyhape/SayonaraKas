import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {robot3} from '../../assets';
import {getData} from '../../utils';
import {useDispatch} from 'react-redux';
import {openDatabase} from 'react-native-sqlite-storage';

const SplashScreen = ({navigation}) => {
  const dispatch = useDispatch();

  // create table user di sqlite
  const db = openDatabase({name: 'mydb.db'});

  // create table user di sqlite
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS pemasukan (id INTEGER PRIMARY KEY AUTOINCREMENT, nominal TEXT, tanggal TEXT,  keterangan TEXT)',
    );

    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS pengeluaran (id INTEGER PRIMARY KEY AUTOINCREMENT, nominal TEXT, tanggal TEXT,  keterangan TEXT)',
    );
  });

  useEffect(() => {
    setTimeout(() => {
      navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
    }, 3000);
  }, []);
  return (
    <View style={styles.page}>
      <Text style={{fontSize: RFValue(20), fontWeight: 'bold'}}>
        Sayonara Kas
      </Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9DF7E5',
  },
  img: {
    width: RFValue(150),
    height: RFValue(100),
    resizeMode: 'contain',
  },
});
