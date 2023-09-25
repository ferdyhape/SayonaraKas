import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Button, Gap, HeaderPrimary, TextInput} from '../../components';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';
import {showMessage, useForm} from '../../utils';
import {openDatabase} from 'react-native-sqlite-storage';

const CreatePengeluaran = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [form, setForm] = useForm({
    nominal: '',
    keterangan: '',
    date: new Date(),
  });
  const [modalVisible, setModalVisible] = useState(false);

  const db = openDatabase({name: 'mydb.db'});

  const addDataPengeluaran = () => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO pengeluaran (nominal, tanggal, keterangan) VALUES (?,?,?)',
        [form.nominal, moment(form.date).format('YYYY-MM-DD'), form.keterangan],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            selectDataPemasukkan();
            showMessage('Data berhasil disimpan', 'success');
            navigation.goBack();
          } else {
            showMessage('Gagal menyimpan data', 'danger');
            navigation.goBack();
          }
        },
      );
    });
  };

  const selectDataPengeluaran = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM pengeluaran', [], (tx, results) => {
        console.log('Results', results.rows.item(0));
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

  const onHandleSubmit = () => {
    if (form.nominal === '' || form.keterangan === '') {
      showMessage('Mohon isi semua data', 'danger');
    } else {
      addDataPengeluaran();
    }
  };
  return (
    <SafeAreaView style={styles.page}>
      <HeaderPrimary
        title="Create Pengeluaran"
        type={'detail'}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <TextInput
          lable="Nominal"
          placeholder="Masukkan nominal"
          keyboardType="number-pad"
          value=""
          onChangeText={() => {}}
        />
        <Gap height={15} />
        <TextInput
          lable="Catatan"
          placeholder="Masukkan nama pemasukkan"
          value=""
          onChangeText={() => {}}
        />
        <Gap height={15} />
        <Text style={{fontSize: 14, color: '#000'}}>Tanggal</Text>
        <Gap height={5} />
        <View style={styles.containerDate}>
          <MaterialIcons name="date-range" size={24} color="black" />
          <Text style={styles.text}>Senin, 22 Januari 2023</Text>
        </View>
      </View>
      <View style={styles.btnButtom}>
        <Button title="Simpan" onPress={() => onHandleSubmit()} />
      </View>
    </SafeAreaView>
  );
};

export default CreatePengeluaran;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    marginTop: 15,
    marginHorizontal: 15,
  },
  containerDate: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
  },
  text: {
    marginLeft: 10,
    fontSize: 12,
    color: '#000',
  },
  btnButtom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 15,
    marginHorizontal: 15,
  },
});
