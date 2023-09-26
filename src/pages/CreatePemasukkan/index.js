import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Button, Gap, HeaderPrimary, TextInput} from '../../components';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {showMessage, useForm} from '../../utils';
import {openDatabase} from 'react-native-sqlite-storage';
import {useDispatch} from 'react-redux';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';

const CreatePemasukkan = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [form, setForm] = useForm({
    nominal: '',
    keterangan: '',
    date: new Date(),
  });
  const [modalVisible, setModalVisible] = useState(false);

  const db = openDatabase({name: 'mydb.db'});

  const addDataPemasukkan = () => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO pemasukan (nominal, tanggal, keterangan) VALUES (?,?,?)',
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

  const onHandleSubmit = () => {
    if (form.nominal === '' || form.keterangan === '') {
      showMessage('Mohon isi semua data', 'danger');
    } else {
      addDataPemasukkan();
    }
  };

  return (
    <SafeAreaView style={styles.page}>
      <HeaderPrimary
        title="Create Pemasukkan"
        type={'detail'}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <TextInput
          lable="Nominal"
          placeholder="Masukkan nominal"
          keyboardType="number-pad"
          value={form.nominal}
          onChangeText={value => setForm('nominal', value)}
          placeholderTextColor="#ccc"
          stylesTextInput={{color: '#000'}}
        />
        <Gap height={15} />
        <TextInput
          lable="Catatan"
          placeholder="Masukkan nama pemasukkan"
          value={form.keterangan}
          onChangeText={value => setForm('keterangan', value)}
          placeholderTextColor="#ccc"
          stylesTextInput={{color: '#000'}}
        />
        <Gap height={15} />
        <Text style={{fontSize: 14, color: '#000'}}>Tanggal</Text>
        <Gap height={5} />
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style={styles.containerDate}>
            <MaterialIcons name="date-range" size={24} color="black" />
            <Text style={styles.text}>
              {moment(form.date).format('dddd, DD MMMM YYYY')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.btnButtom}>
        <Button title="Simpan" onPress={() => onHandleSubmit()} />
      </View>

      <DatePicker
        modal
        mode="date"
        open={modalVisible}
        date={form.date}
        onConfirm={date => {
          setModalVisible(false);
          setForm('date', date);
        }}
        onCancel={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
};

export default CreatePemasukkan;

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
