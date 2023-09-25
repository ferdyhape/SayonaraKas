import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {RFValue} from 'react-native-responsive-fontsize';

const HeaderPrimary = ({
  type,
  onBack,
  onInfo,
  onSearch,
  handleLogin,
  handleLogout,
  title,
  onPress,
  onPressTow,
  iconName,
  bgColor,
  stylesTitle,
  countCart,
  typeCart,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {isLogin} = useSelector(state => state.globalReducer);

  const width = Dimensions.get('window').width;

  if (type === 'detail') {
    return (
      <View style={styles.container(bgColor)}>
        {onPress ? (
          <TouchableOpacity
            style={styles.btnBack}
            onPress={onPress}
            activeOpacity={0.5}>
            <Feather
              name="arrow-left"
              size={RFValue(25)}
              color={bgColor ? '#fff' : '#fff'}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.btnBack} />
        )}
        <View style={styles.wpText}>
          <Text style={[styles.title(bgColor), stylesTitle]}>{title}</Text>
        </View>
        {typeCart && (
          <TouchableOpacity onPress={onPressTow} activeOpacity={0.5}>
            <View
              style={{
                width: 'auto',
                height: Dimensions.get('window').height > 800 ? 18 : 15,
                backgroundColor: '#C11F4B',
                borderWidth: 1,
                borderColor: '#fff',
                borderRadius: 100,
                position: 'absolute',
                top: -4,
                right: -4,
                zIndex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: 15,
              }}>
              <Text style={{fontSize: RFValue(8), color: '#fff'}}>
                {countCart}
              </Text>
            </View>
            <AntDesign name="shoppingcart" size={RFValue(20)} color="#000" />
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return (
    <View style={styles.header(bgColor)}>
      <View />
      <View>
        <Text
          style={{fontSize: RFValue(16), fontWeight: 'bold', color: '#fff'}}>
          {title}
        </Text>
      </View>
      <View />
    </View>
  );
};

export default HeaderPrimary;

const styles = StyleSheet.create({
  header: bgColor => ({
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: bgColor ? bgColor : '#476C9B',
  }),
  login: {
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#634d92',
  },
  img: {
    width: RFValue(80),
    height: RFValue(55),
    resizeMode: 'contain',
  },
  navRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: RFValue(14),
    color: '#634d92',
  },
  container: bgColor => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: RFValue(15),
    paddingVertical: RFValue(15),
    backgroundColor: bgColor ? bgColor : '#476C9B',
  }),
  btnBack: {
    width: RFValue(25),
    height: RFValue(25),
  },
  title: bgColor => ({
    fontSize: RFValue(16),
    fontFamily: 'Poppins-SemiBold',
    color: bgColor ? '#fff' : '#fff',
    textTransform: 'capitalize',
  }),
  wpText: {
    flex: 1,
    alignItems: 'center',
  },
});
