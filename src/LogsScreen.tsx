import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  View,
  TextInput,
} from 'react-native';
import AppColors from './AppColors';
import styles from './StyleSheet';
import type { LogsScreenProps } from './Types';

const LogsScreen = (props: LogsScreenProps) => {
  const [logs, setLogs] = useState('');

  useEffect(() => {
    setLogs(props.route.params.logs);
  }, []);

  return (
    <SafeAreaView>
      <StatusBar
        barStyle="light-content"
        backgroundColor={AppColors.secondaryBrand}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.scrollContainer}>
          <TextInput
            style={styles.logsTextInput}
            multiline
            scrollEnabled
            value={logs}
            underlineColorAndroid="transparent"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LogsScreen;
