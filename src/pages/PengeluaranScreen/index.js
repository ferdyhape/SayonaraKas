import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Gap, HeaderPrimary, ItemCardList} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {openDatabase} from 'react-native-sqlite-storage';

const PengeluaranScreen = () => {
  const navigation = useNavigation();
  const {listPengeluaran} = useSelector(state => state.globalReducer);
  console.log('listPengeluaran', listPengeluaran);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefresh] = useState(false);

  const db = openDatabase({name: 'mydb.db'});

  const selectDataPengeluaran = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM pengeluaran', [], (tx, results) => {
        let temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        dispatch({
          type: 'SET_LIST_PENGELUARAN',
          value: temp,
        });
      });
    });
  };

  useEffect(() => {
    selectDataPengeluaran();
  }, []);

  const onRefresh = () => {
    setRefresh(true);
    selectDataPengeluaran();
    setRefresh(false);
  };

  return (
    <SafeAreaView style={styles.page}>
      <HeaderPrimary title="Pengeluaran" onPress={() => navigation.goBack()} />
      <Gap height={15} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.content}>
          <Button
            title="+ Pengeluaran"
            stylesButton={{backgroundColor: '#FF5B37'}}
            onPress={() => navigation.navigate('CreatePengeluaran')}
          />
        </View>
        <Gap height={15} />
        <View>
          {loading ? (
            <View style={styles.content}>
              <ActivityIndicator size="large" color="#FF5B37" />
            </View>
          ) : listPengeluaran?.length > 0 ? (
            listPengeluaran?.map((item, i) => {
              return (
                <ItemCardList
                  key={i}
                  type={'logout'}
                  nominal={item.nominal}
                  date={item.tanggal}
                  keterangan={item.keterangan}
                />
              );
            })
          ) : (
            <View style={styles.center}>
              <Text style={{color: '#FF5B37', fontSize: 16}}>Data Kosong</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PengeluaranScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flexDirection: 'row-reverse',
    marginHorizontal: 15,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
