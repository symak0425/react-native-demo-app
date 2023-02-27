import React, { useEffect, useState } from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  ScrollView,
  View,
  TouchableHighlight,
  Text,
  TextInput
} from 'react-native';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppColors from './AppColors';
import AppScreens from './AppScreens';
import styles from './StyleSheet';
import {
  elementsDefaultConfigiOS,
  playspaceDefaultConfigiOS,
  elementsDefaultConfigAndroid,
  playspaceDefaultConfigAndroid,
} from './PlayerConfig';
import type { ConfigScreenProps } from './Types';

const radioButtonsProps: RadioButtonProps[] = [
  {
    id: AppScreens.elements,
    label: AppScreens.elements,
    value: AppScreens.elements},
  {
    id: AppScreens.playspace,
    label: AppScreens.playspace,
    value: AppScreens.playspace,
  },
];

const ConfigScreen = (props: ConfigScreenProps) => {
  var elementsDefaultConfig: string;
  var playspaceDefaultConfig: string;

  if (Platform.OS === 'ios') {
    elementsDefaultConfig = elementsDefaultConfigiOS;
    playspaceDefaultConfig = playspaceDefaultConfigiOS;
  } else {
    elementsDefaultConfig = elementsDefaultConfigAndroid;
    playspaceDefaultConfig = playspaceDefaultConfigAndroid;
  }

  const storeConfig = async (key: string, value: string) => {
    await AsyncStorage.setItem(key, value);
  };

  const readConfig = async (key: string) => {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    } else {
      if (key === AppScreens.elements) {
        return elementsDefaultConfig;
      } else {
        return playspaceDefaultConfig;
      }
    }
  };

  const [radioButtons, setRadioButtons] = useState(radioButtonsProps);
  const [config, setConfig] = useState('');

  const onRadioButtonTapped = async (newRadioButtons: RadioButtonProps[]) => {
    setRadioButtons(newRadioButtons);

    if (newRadioButtons[0]) {
      if (newRadioButtons[0].selected) {
        const storedConfig = await readConfig(AppScreens.elements);
        setConfig(storedConfig);
      } else {
        const storedConfig = await readConfig(AppScreens.playspace);
        setConfig(storedConfig);
      }
    }
  };
  const onLoadPlayerTapped = async () => {
    if (radioButtons[0]) {
      if (radioButtons[0].selected) {
        props.navigation.navigate('Elements', {config: config});
      } else {
        props.navigation.navigate('Playspace', {config: config});
      }
    }
  };
  const onSaveConfigTapped = async () => { 
    if (radioButtons[0]) {
      if (radioButtons[0].selected) {
        await storeConfig(AppScreens.elements, config);
      } else {
        await storeConfig(AppScreens.playspace, config);
      }
    }
  };
  const onResetConfigTapped = async () => {
    if (radioButtons[0]) {
      if (radioButtons[0].selected) {
        await storeConfig(AppScreens.elements, elementsDefaultConfig);
        setConfig(elementsDefaultConfig);
      } else {
        await storeConfig(AppScreens.playspace, playspaceDefaultConfig);
        setConfig(playspaceDefaultConfig);
      }
    }
  };

  useEffect(() => {
    const initialRadioButtons: RadioButtonProps[] = [
      {
        id: 'Elements',
        label: 'Elements',
        selected: true,
        value: 'Elements',
        color: AppColors.mainBrand,
        labelStyle: {color: AppColors.darkText},
      },
      {
        id: 'Playspace',
        label: 'Playspace',
        selected: false,
        value: 'Playspace',
        color: AppColors.mainBrand,
        labelStyle: {color: AppColors.darkText},
      },
    ];
    setRadioButtons(initialRadioButtons);

    readConfig(AppScreens.elements).then(value => {
      setConfig(value);
    });
  }, []);

  return (
    <SafeAreaView>
      <StatusBar
        barStyle="light-content"
        backgroundColor={AppColors.secondaryBrand}
      />
      <ScrollView>
        <View style={styles.scrollContainer}>
          <RadioGroup
            containerStyle={{height: 50}}
            radioButtons={radioButtons}
            onPress={onRadioButtonTapped}
            layout="row"
          />
          <TouchableHighlight
            onPress={onLoadPlayerTapped}
            activeOpacity={0.8}
            underlayColor={AppColors.background}>
            <View style={styles.appButton}>
              <Text style={styles.appText}>Load Player</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={onSaveConfigTapped}
            activeOpacity={0.8}
            underlayColor={AppColors.background}>
            <View style={styles.appButton}>
              <Text style={styles.appText}>Save Config</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={onResetConfigTapped}
            activeOpacity={0.8}
            underlayColor={AppColors.background}>
            <View style={styles.appButton}>
              <Text style={styles.appText}>Reset Config</Text>
            </View>
          </TouchableHighlight>
          <TextInput
            style={styles.configTextInput}
            multiline
            value={config}
            onChangeText={value => {
              setConfig(value);
            }}
            underlineColorAndroid="transparent"
            spellCheck
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ConfigScreen;
