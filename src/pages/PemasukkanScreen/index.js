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
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {openDatabase} from 'react-native-sqlite-storage';
import {useDispatch, useSelector} from 'react-redux';
import {RFValue} from 'react-native-responsive-fontsize';

const PemasukkanScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {listPemasukan} = useSelector(state => state.globalReducer);
  console.log(listPemasukan);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefresh] = useState(false);

  const db = openDatabase({name: 'mydb.db'});

  const selectDataPemasukkan = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM pemasukan', [], (tx, results) => {
        let temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        temp.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
        dispatch({
          type: 'SET_LIST_PEMASUKAN',
          value: temp,
        });
      });
    });
  };

  useEffect(() => {
    selectDataPemasukkan();
  }, []);

  const onRefresh = () => {
    setRefresh(true);
    selectDataPemasukkan();
    setRefresh(false);
  };

  return (
    <SafeAreaView style={styles.page}>
      <HeaderPrimary title="Pemasukkan" />
      <Gap height={15} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.content}>
          <Button
            title="+ Pemasukkan"
            onPress={() => navigation.navigate('CreatePemasukkan')}
          />
        </View>
        <Gap height={15} />
        <View>
          {loading ? (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ) : listPemasukan?.length > 0 ? (
            listPemasukan?.map((item, i) => {
              return (
                <ItemCardList
                  key={i}
                  type={'pemasukkan'}
                  nominal={item.nominal}
                  tanggal={item.tanggal}
                  keterangan={item.keterangan}
                />
              );
            })
          ) : (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={styles.text}>Data Kosong</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PemasukkanScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flexDirection: 'row-reverse',
    marginHorizontal: 15,
  },
  text: {
    fontSize: RFValue(14),
    color: '#666',
  },
});
