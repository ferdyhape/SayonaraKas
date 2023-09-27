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
import {
  Gap,
  HeaderPrimary,
  ItemHome,
  Line,
  TitleSection,
} from '../../components';
import {openDatabase} from 'react-native-sqlite-storage';
import {useDispatch, useSelector} from 'react-redux';
import {
  checkDataPemasukan,
  checkDataPengeluaran,
  selectDataPemasukkan,
  selectDataPengeluaran,
} from '../../redux/actions';
import {screenHeight, screenWidth} from '../../utils';
import {RFValue} from 'react-native-responsive-fontsize';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import MonthPicker from 'react-native-month-year-picker';
import {LineChart} from 'react-native-chart-kit';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const db = openDatabase({name: 'mydb.db'});

  const [refreshing, setRefresh] = useState(false);
  const {totalPemasukan, totalPengeluaran, listPemasukan2, listPengeluaran2} =
    useSelector(state => state.globalReducer);
  console.log(listPengeluaran2);
  console.log(listPemasukan2);

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
    dispatch(selectDataPemasukkan(db));
    dispatch(selectDataPengeluaran(db));
  }, [startDate, endDate]);

  const onRefresh = () => {
    setRefresh(true);
    dispatch(checkDataPemasukan(db));
    dispatch(checkDataPengeluaran(db));
    dispatch(selectDataPemasukkan(db));
    dispatch(selectDataPengeluaran(db));
    setRefresh(false);
  };

  function getUniqueDatesWithMinCount(listPemasukan2) {
    const dates = listPemasukan2?.map(item =>
      moment(item.tanggal).format('DD/MM/YYYY'),
    );

    // Batasi data maksimal 7 hari
    if (dates.length > 7) {
      dates.splice(0, dates.length - 7);
    }

    return dates;
  }

  function getUniqueDatesWithMinCount2(listPengeluaran2) {
    const dates = listPengeluaran2?.map(item =>
      moment(item.tanggal).format('DD/MM/YYYY'),
    );

    // Batasi data maksimal 7 hari
    if (dates.length > 7) {
      dates.splice(0, dates.length - 7);
    }

    return dates;
  }

  const uniqueDates = getUniqueDatesWithMinCount(listPemasukan2);
  const uniqueDates2 = getUniqueDatesWithMinCount2(listPengeluaran2);

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
        <Gap height={20} />
        {listPemasukan2?.length > 0 ? (
          <>
            <TitleSection title="Grafik Pemasukkan Terbaru" />
            <View style={{paddingHorizontal: 15}}>
              <LineChart
                data={{
                  labels: uniqueDates || [0],
                  datasets: [
                    {
                      data: listPemasukan2?.map(item => parseInt(item.nominal)),
                    },
                  ],
                }}
                width={screenWidth - 30}
                height={220}
                yAxisLabel=""
                yAxisSuffix=""
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                  backgroundColor: '#e26a00',
                  backgroundGradientFrom: '#fb8c00',
                  backgroundGradientTo: '#ffa726',
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) =>
                    `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: '6',
                    strokeWidth: '2',
                    stroke: '#ffa726',
                  },
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />
            </View>
          </>
        ) : null}
        <Gap height={10} />
        {listPengeluaran2?.length > 0 ? (
          <>
            <TitleSection title="Grafik Pengeluaran Terbaru" />
            <View style={{paddingHorizontal: 15}}>
              <LineChart
                data={{
                  labels: uniqueDates2 || [0],
                  // labels: ['1', '2', '3', '4', '5', '6', '7'],
                  datasets: [
                    {
                      data: listPengeluaran2?.map(item => parseInt(item.nominal)),
                      // data: [20, 45, 28, 80, 99, 43, 50],
                    },
                  ],
                }}
                width={screenWidth - 30}
                height={220}
                yAxisLabel=""
                yAxisSuffix=""
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                  backgroundColor: '#476C9B',
                  backgroundGradientFrom: '#476C9B',
                  backgroundGradientTo: '#476C9B',

                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) =>
                    `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: '6',
                    strokeWidth: '2',
                    stroke: '#ffa726',
                  },
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />
            </View>
          </>
        ) : null}
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
