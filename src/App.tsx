import React from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppColors from './AppColors';
import AppScreens from './AppScreens';
import ConfigScreen from './ConfigScreen';
import ElementsScreen from './ElementsScreen';
import PlayspaceScreen from './PlayspaceScreen';
import LogsScreen from './LogsScreen';
import { readLogs } from './LoggingUtils';
import type { RootStackParamList } from './Types';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const App = () => (
  <NavigationContainer>
    <RootStack.Navigator>
      <RootStack.Screen
        name='Config'
        component={ConfigScreen}
        options={{title: AppScreens.config}}
      />
      <RootStack.Screen
        name='Elements'
        component={ElementsScreen}
        options={({navigation}) => ({
          title: AppScreens.elements,
          headerRight: () => (
            <TouchableHighlight
              onPress={() => {
                readLogs().then(logs => {
                  navigation.navigate(AppScreens.logs, {logs: logs});
                });
              }}
              activeOpacity={0.8}
              underlayColor={AppColors.background}>
              <View>
                <Text style={{color: AppColors.mainBrand, fontSize: 16}}>
                  {AppScreens.logs}
                </Text>
              </View>
            </TouchableHighlight>
          ),
        })}
      />
      <RootStack.Screen
        name='Playspace'
        component={PlayspaceScreen}
        options={({navigation}) => ({
          title: AppScreens.playspace,
          headerRight: () => (
            <TouchableHighlight
              onPress={() => {
                readLogs().then(logs => {
                  navigation.navigate(AppScreens.logs, {logs: logs});
                });
              }}
              activeOpacity={0.8}
              underlayColor={AppColors.background}>
              <View>
                <Text style={{color: AppColors.mainBrand, fontSize: 16}}>
                  {AppScreens.logs}
                </Text>
              </View>
            </TouchableHighlight>
          ),
        })}
      />
      <RootStack.Screen
        name='Logs'
        component={LogsScreen}
        options={{title: AppScreens.logs}}
      />
    </RootStack.Navigator>
  </NavigationContainer>
);

export default App;
