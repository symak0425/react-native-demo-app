import AsyncStorage from '@react-native-async-storage/async-storage';
import AppScreens from './AppScreens';

const storeLogs = async (value: string) => {
  await AsyncStorage.setItem(AppScreens.logs, value);
};

const readLogs = async () => {
  const value = await AsyncStorage.getItem(AppScreens.logs);
  if (value !== null) {
    return value;
  } else {
    return '';
  }
};

export { storeLogs, readLogs };
