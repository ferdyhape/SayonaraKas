import React, {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
const {width, height} = Dimensions.get('window');

const Icon = ({label, focus}) => {
  switch (label) {
    case 'Dashboard':
      return focus ? (
        <AntDesign name="home" size={24} color="#476C9B" />
      ) : (
        <AntDesign name="home" size={24} color="#BDBDBD" />
      );
    case 'Pemasukkan':
      return focus ? (
        <Entypo name="login" size={24} color="#476C9B" />
      ) : (
        <Entypo name="login" size={24} color="#BDBDBD" />
      );
    case 'Pengeluaran':
      return focus ? (
        <Entypo name="log-out" size={24} color="#476C9B" />
      ) : (
        <Entypo name="log-out" size={24} color="#BDBDBD" />
      );
    default:
      return focus ? (
        <AntDesign name="setting" size={24} color="#476C9B" />
      ) : (
        <AntDesign name="setting" size={24} color="#BDBDBD" />
      );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};

const BottomNavigator = ({state, descriptors, navigation}) => {
  const [isVisible, setIsVisible] = useState(false);
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            style={{backgroundColor: '#fff'}}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}>
            <View style={styles.wpItem}>
              <Icon label={label} focus={isFocused} />
              <Text style={styles.text(isFocused)}>{label}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomNavigator;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingTop: 7,
    borderTopWidth: 2,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: '#F2F2F2',
    paddingBottom: 8,
    paddingHorizontal: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'space-between',
  },
  wpItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: isFocused => ({
    fontSize: RFValue(12),
    fontFamily: 'Poppins-Regular',
    color: isFocused ? '#476C9B' : '#BDBDBD',
  }),
});
