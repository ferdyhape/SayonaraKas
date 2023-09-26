import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {RFValue} from 'react-native-responsive-fontsize';
import {Gap} from '../../atomics';
import moment from 'moment';

const ItemCardList = ({type, nominal, tanggal, keterangan}) => {
  console.log(type);
  return (
    <View style={styles.wp}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {type === 'logout' ? (
          <View style={styles.wpIcon(type)}>
            <Entypo name="login" size={18} color="#fff" />
          </View>
        ) : (
          <View style={styles.wpIcon(type)}>
            <Entypo name="log-out" size={18} color="#666" />
          </View>
        )}
        <Gap width={10} />
        <View>
          <Text style={styles.txt}>
            Uang {type === 'logout' ? 'Keluar' : 'Masuk'}
          </Text>
          <Text style={styles.desc}>{keterangan}</Text>
        </View>
      </View>
      <View style={{alignItems: 'flex-end'}}>
        <Text style={styles.nominal(type)}>
          {type === 'logout' ? '-' : '+'}Rp{nominal}
        </Text>
        <Text style={styles.desc}>
          {moment(tanggal).format('DD MMMM YYYY')}
        </Text>
      </View>
    </View>
  );
};

export default ItemCardList;

const styles = StyleSheet.create({
  wp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#EEE',
    marginHorizontal: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  wpIcon: type => ({
    width: RFValue(35),
    height: RFValue(35),
    backgroundColor: type === 'logout' ? '#990000' : '#B8F1B0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }),
  txt: {
    fontSize: RFValue(11),
    color: '#000',
  },
  desc: {
    fontSize: RFValue(11),
    color: '#666',
  },
  nominal: type => ({
    fontSize: RFValue(12),
    color: type === 'logout' ? '#990000' : '#03C988',
  }),
});
