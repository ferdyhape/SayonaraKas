import {Dimensions, Platform} from 'react-native';

export const truncateString = (string, n) => {
  return string?.length > n ? string.substr(0, n - 1) + '...' : string;
};

export const truncateStringV2 = (string, n) => {
  return string?.length > n ? string.substr(0, n - 1) + '' : string;
};

export const convertToRupiah = angka => {
  let rupiah = '';
  let angkarev = angka?.toString()?.split('')?.reverse()?.join('');
  for (let i = 0; i < angkarev?.length; i++)
    if (i % 3 === 0) rupiah += angkarev?.substr(i, 3) + '.';
  return (
    'Rp' +
    rupiah
      .split('', rupiah?.length - 1)
      .reverse()
      .join('')
  );
};

export const TabVersion = 499;

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;
