import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Config: undefined,
  Elements: { config: string },
  Playspace: { config: string },
  Logs: { logs: string }
};

type ConfigScreenProps = NativeStackScreenProps<RootStackParamList, 'Config', 'RootStack'>;
type ElementsScreenProps = NativeStackScreenProps<RootStackParamList, 'Elements', 'RootStack'>;
type PlayspaceScreenProps = NativeStackScreenProps<RootStackParamList, 'Playspace', 'RootStack'>;
type LogsScreenProps = NativeStackScreenProps<RootStackParamList, 'Logs', 'RootStack'>;

export { 
  RootStackParamList,
  ConfigScreenProps,
  ElementsScreenProps,
  PlayspaceScreenProps,
  LogsScreenProps,
}