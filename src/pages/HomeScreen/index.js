import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Gap, HeaderPrimary, ItemHome} from '../../components';
import {openDatabase} from 'react-native-sqlite-storage';

const HomeScreen = () => {
  const db = openDatabase({name: 'mydb.db'});

  const checkDataPemasukan = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM pemasukan', [], (tx, results) => {
        if (results.rows.length == 0) {
          db.transaction(tx => {
            console.log('masuk pemasukan');
          });
        }
      });
    });
  };

  const checkDataPengeluaran = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM pengeluaran', [], (tx, results) => {
        if (results.rows.length == 0) {
          db.transaction(tx => {
            console.log('masuk pengeluaran');
          });
        }
      });
    });
  };

  useEffect(() => {
    checkDataPemasukan();
    checkDataPengeluaran();
  }, []);

  return (
    <SafeAreaView style={styles.page}>
      <HeaderPrimary title="Home" />
      <Gap height={20} />
      <View style={styles.container}>
        <ItemHome type={'login'} />
        <ItemHome type={'logout'} />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
