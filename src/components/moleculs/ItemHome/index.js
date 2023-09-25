import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {screenHeight, screenWidth} from '../../../utils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Gap} from '../../atomics';
import {RFValue} from 'react-native-responsive-fontsize';
const ItemHome = ({type}) => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {type === 'logout' ? (
          <AntDesign name="logout" size={16} color="black" />
        ) : (
          <AntDesign name="login" size={16} color="black" />
        )}
        <Gap width={10} />
        <Text style={styles.text}>{type === 'logout' ? 'Pengeluaran' : 'Pemasukan'}</Text>
      </View>
      <Gap height={10} />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.desc}>Rp12000</Text>
      </View>
    </View>
  );
};

export default ItemHome;

const styles = StyleSheet.create({
  container: {
    width: screenWidth / 2 - 50,
    height: screenHeight / 5,
    borderWidth: 2,
    borderColor: '#ADD9F4',
    borderRadius: 20,
    marginVertical: 10,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: RFValue(12),
    color: '#000',
  },
  desc: {
    fontSize: RFValue(14),
    fontWeight: 'bold',
    color: '#C4C4C4',
  },
});
