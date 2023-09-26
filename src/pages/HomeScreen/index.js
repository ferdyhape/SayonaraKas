import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Gap, HeaderPrimary, ItemHome, Line} from '../../components';
import {openDatabase} from 'react-native-sqlite-storage';
import {useDispatch, useSelector} from 'react-redux';
import {checkDataPemasukan, checkDataPengeluaran} from '../../redux/actions';
import {screenHeight, screenWidth} from '../../utils';
import {RFValue} from 'react-native-responsive-fontsize';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import MonthPicker from 'react-native-month-year-picker';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const db = openDatabase({name: 'mydb.db'});

  const [refreshing, setRefresh] = useState(false);
  const {totalPemasukan, totalPengeluaran} = useSelector(
    state => state.globalReducer,
  );

  const currentDate = new Date();
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(currentDate.getMonth() - 1);

  const [startDate, setStartDate] = useState(oneMonthAgo);
  const [endDate, setEndDate] = useState(currentDate);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);

  const onValueChange1 = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || startDate;
      setStartDate(selectedDate);
      setModalVisible(false);
    },
    [startDate],
  );

  const onValueChange2 = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || endDate;
      setEndDate(selectedDate);
      setModalVisible2(false);
    },
    [endDate],
  );

  useEffect(() => {
    dispatch(checkDataPemasukan(db, startDate, endDate));
    dispatch(checkDataPengeluaran(db, startDate, endDate));
  }, [startDate, endDate]);

  const onRefresh = () => {
    setRefresh(true);
    dispatch(checkDataPemasukan(db));
    dispatch(checkDataPengeluaran(db));
    setRefresh(false);
  };

  return (
    <SafeAreaView style={styles.page}>
      <HeaderPrimary title="Home" />
      <Gap height={20} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.text}>
              {moment(startDate).format('MMMM YYYY')}
            </Text>
          </TouchableOpacity>
          <Line stylesLine={{width: screenWidth / 20 - 10}} />
          <TouchableOpacity
            style={styles.card}
            onPress={() => setModalVisible2(true)}>
            <Text style={styles.text}>
              {moment(endDate).format('MMMM YYYY')}
            </Text>
          </TouchableOpacity>
        </View>
        <Gap height={20} />
        <View style={styles.container}>
          <ItemHome type={'login'} dataPemasukkan={totalPemasukan} />
          <ItemHome type={'logout'} dataPengeluaran={totalPengeluaran} />
        </View>
      </ScrollView>

      {modalVisible ? (
        <MonthPicker
          onChange={onValueChange1}
          value={startDate}
          minimumDate={new Date(2020, 5)}
          maximumDate={new Date()}
          locale="id"
        />
      ) : null}

      {modalVisible2 ? (
        <MonthPicker
          onChange={onValueChange2}
          value={endDate}
          minimumDate={new Date(2020, 5)}
          maximumDate={new Date()}
          locale="id"
        />
      ) : null}
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
    alignItems: 'center',
  },
  card: {
    width: screenWidth / 2 - 30,
    height: RFValue(30),
    borderRadius: 10,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#eee',
  },
  text: {
    fontSize: 12,
    color: '#666',
  },
});
