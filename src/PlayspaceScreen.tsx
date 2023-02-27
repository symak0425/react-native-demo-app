import React, { useEffect, useState, useRef } from 'react';
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  View,
  Text,
  TouchableHighlight,
  TextInput,
  Alert
} from 'react-native';
import { PlayspacePlayer } from 'connatix-player-sdk-react-native';
import AppColors from './AppColors';
import styles from './StyleSheet';
import { storeLogs, readLogs } from './LoggingUtils';
import type { PlayspaceScreenProps } from './Types';

const PlayspaceLayout = {
  portrait: 'Portrait',
  landspace: 'Landscape',
};

const PlayspaceScreen = (props: PlayspaceScreenProps) => {
  const ERROR_ALERT_TITLE = 'Error';

  useEffect(() => {
    playspacePlayerRef.current?.setPlayspaceConfig(props.route.params.config, (error, success) => {
      if (error !== undefined) {
        Alert.alert(ERROR_ALERT_TITLE, error);
        return;
      }
      if (success) {
        playspacePlayerRef.current?.listenForAllEvents();
      }
    });
    return () => {
      storeLogs('');
    };
  }, [props.route.params.config]);

  const _onPlayerEvent = (event: any) => {
    readLogs().then(logs => {
      storeLogs(`${logs}🔴 Event: ${JSON.stringify(event)}\n`);
    });

    if (event.OmidViewabilityThreshold != null) {
      setViewability(event.OmidViewabilityThreshold.threshold.toString());
    }
  };

  const [volume, setVolume] = useState('');
  const [videoQuality, setVideoQuality] = useState('');
  const [getQuality, setGetQuality] = useState('');
  const [macros, setMacros] = useState('');
  const [preRollBreakSeconds, setPreRollBreakSeconds] = useState('');
  const [postRollBreakSeconds, setPostRollBreakSeconds] = useState('');
  const [getPosition, setGetPosition] = useState('');
  const [getSetPosition, setSetPosition] = useState('');
  const [storyId, setStoryId] = useState('');
  const [timeline, setTimeline] = useState('');
  const [getLayout, setGetLayout] = useState('');
  const [setLayout, setSetLayout] = useState('');
  const [slideIndex, setSlideIndex] = useState('');
  const [ctaLabel, setCtaLabel] = useState('');
  const [storyMetadata, setStoryMetadata] = useState('');
  const [viewability, setViewability] = useState('N/A');
  const playspacePlayerRef = useRef<PlayspacePlayer>(null);

  const onNewScreenTapped = () => props.navigation.push('Playspace', { config: props.route.params.config });

  const onPlayTapped = () => playspacePlayerRef.current?.play((error) => {
    Alert.alert(ERROR_ALERT_TITLE, error);
  });

  const onPauseTapped = () => playspacePlayerRef.current?.pause((error) => {
    Alert.alert(ERROR_ALERT_TITLE, error);
  });

  const onSetVolumeTapped = () => playspacePlayerRef.current?.setVolume(parseFloat(volume), (error) => {
    Alert.alert(ERROR_ALERT_TITLE, error);
  });

  const onSetQualityTapped = () => playspacePlayerRef.current?.setQuality(parseInt(videoQuality, 10), (error) => {
    Alert.alert(ERROR_ALERT_TITLE, error);
  });

  const onGetQualityTapped = () => playspacePlayerRef.current?.getQuality((error, result) => {
    if (error !== undefined) {
      Alert.alert(ERROR_ALERT_TITLE, error);
      return;
    }
    if (result !== undefined) {
      setGetQuality(result.toString());
    }
  });

  const onDisableAdvertisingTapped = () => playspacePlayerRef.current?.disableAdvertising((error) => {
    Alert.alert(ERROR_ALERT_TITLE, error);
  });

  const onEnableAdvertisingTapped = () => playspacePlayerRef.current?.enableAdvertising((error) => {
    Alert.alert(ERROR_ALERT_TITLE, error);
  });

  const onSetMacrosTapped = () => playspacePlayerRef.current?.setMacros(macros, (error) => {
    Alert.alert(ERROR_ALERT_TITLE, error);
  });

  const onSetPreRollBreakTapped = () => playspacePlayerRef.current?.setPreRollBreak(parseInt(preRollBreakSeconds, 10), (error) => {
    Alert.alert(ERROR_ALERT_TITLE, error);
  });

  const onSetPostRollBreakTapped = () => playspacePlayerRef.current?.setPostRollBreak(parseInt(postRollBreakSeconds, 10), (error) => {
    Alert.alert(ERROR_ALERT_TITLE, error);
  });

  const onGetPositionTapped = () => playspacePlayerRef.current?.getStoryPosition((error, result) => {
    if (error !== undefined) {
      Alert.alert(ERROR_ALERT_TITLE, error);
      return;
    }
    if (result !== undefined) {
      setGetPosition(result.toString());
    }
  });

  const onSetPositionTapped = () => playspacePlayerRef.current?.setStoryPosition(parseInt(getSetPosition, 10), (error) => {
    Alert.alert(ERROR_ALERT_TITLE, error);
  });

  const onGetStoryIDTapped = () => playspacePlayerRef.current?.getStoryId((error, result) => {
    if (error !== undefined) {
      Alert.alert(ERROR_ALERT_TITLE, error);
      return;
    }
    if (result !== undefined) {
      setStoryId(result);
    }
  });

  const onGetTimelineTapped = () => playspacePlayerRef.current?.getStoryTimeline((error, result) => {
    if (error !== undefined) {
      Alert.alert(ERROR_ALERT_TITLE, error);
      return;
    }
    if (result !== undefined) {
      setTimeline(result.toString());
    }
  });

  const onGetLayoutTapped = () => playspacePlayerRef.current?.getLayout((error, result) => {
    if (error !== undefined) {
      Alert.alert(ERROR_ALERT_TITLE, error);
      return;
    }
    if (result !== undefined) {
      if (result === 0) {
        setGetLayout(PlayspaceLayout.portrait);
      } else if (result === 1) {
        setGetLayout(PlayspaceLayout.landspace);
      }
    }
  });

  const onSetLayoutTapped = () => {
    var result;
    if (setLayout === PlayspaceLayout.portrait) {
      result = 0;
    } else if (setLayout === PlayspaceLayout.landspace) {
      result = 1;
    } else {
      result = -1;
    }

    playspacePlayerRef.current?.setLayout(result, (error) => {
      Alert.alert(ERROR_ALERT_TITLE, error);
    });
  };

  const onSetCtaLabelTapped = () => playspacePlayerRef.current?.setCtaLabel(parseInt(slideIndex, 10), ctaLabel, (error) => {
    Alert.alert(ERROR_ALERT_TITLE, error);
  });

  const onGetStoryMetadataTapped = () => playspacePlayerRef.current?.getStoryMetadata((error, result) => {
    if (error !== undefined) {
      Alert.alert(ERROR_ALERT_TITLE, error);
      return;
    }
    if (result !== undefined) {
      setStoryMetadata(JSON.stringify(result));
    }
  });

  return (
    <SafeAreaView>
      <StatusBar
        barStyle="light-content"
        backgroundColor={AppColors.secondaryBrand}
      />
      <View style={styles.viewabilityContainer}>
        <Text style={styles.appText}>Viewability: {viewability}</Text>
      </View>
      <ScrollView>
        <View style={styles.scrollContainer}>
          <View style={styles.playspaceContainerView}>
            <PlayspacePlayer
              ref={playspacePlayerRef}
              style={{flex: 1}}
              onPlayerEvent={_onPlayerEvent}
            />
          </View>
          <TouchableHighlight
            onPress={onNewScreenTapped}
            activeOpacity={0.8}
            underlayColor={AppColors.background}>
            <View
              style={{
                marginTop: 20,
                marginBottom: 10,
                height: 50,
                justifyContent: 'center',
                backgroundColor: AppColors.secondaryBrand,
                borderRadius: 6,
              }}>
              <Text style={styles.appText}>New Screen</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={onPlayTapped}
            activeOpacity={0.8}
            underlayColor={AppColors.background}>
            <View style={styles.appButton}>
              <Text style={styles.appText}>Play</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={onPauseTapped}
            activeOpacity={0.8}
            underlayColor={AppColors.background}>
            <View style={styles.appButton}>
              <Text style={styles.appText}>Pause</Text>
            </View>
          </TouchableHighlight>
          <View style={styles.rowContainer}>
            <TouchableHighlight
              onPress={onSetVolumeTapped}
              activeOpacity={0.8}
              underlayColor={AppColors.background}
              style={styles.rowButton}>
              <View style={styles.appButton}>
                <Text style={styles.appText}>Set Volume</Text>
              </View>
            </TouchableHighlight>
            <TextInput
              style={styles.rowTextInput}
              placeholder="Volume"
              onChangeText={value => {
                setVolume(value);
              }}
              underlineColorAndroid="transparent"
              spellCheck
            />
          </View>
          <View style={styles.rowContainer}>
            <TouchableHighlight
              onPress={onSetQualityTapped}
              activeOpacity={0.8}
              underlayColor={AppColors.background}
              style={styles.rowButton}>
              <View style={styles.appButton}>
                <Text style={styles.appText}>Set Quality</Text>
              </View>
            </TouchableHighlight>
            <TextInput
              style={styles.rowTextInput}
              placeholder="Quality"
              onChangeText={quality => {
                setVideoQuality(quality);
              }}
              underlineColorAndroid="transparent"
              spellCheck
            />
          </View>
          <View style={styles.rowContainer}>
            <TouchableHighlight
              onPress={onGetQualityTapped}
              activeOpacity={0.8}
              underlayColor={AppColors.background}
              style={styles.rowButton}>
              <View style={styles.appButton}>
                <Text style={styles.appText}>Get Quality</Text>
              </View>
            </TouchableHighlight>
            <TextInput
              style={styles.rowTextInput}
              placeholder="Quality"
              editable={false}
              focusable={false}
              value={getQuality}
              underlineColorAndroid="transparent"
              spellCheck
            />
          </View>
          <TouchableHighlight
            onPress={onDisableAdvertisingTapped}
            activeOpacity={0.8}
            underlayColor={AppColors.background}>
            <View style={styles.appButton}>
              <Text style={styles.appText}>Disable Advertising</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={onEnableAdvertisingTapped}
            activeOpacity={0.8}
            underlayColor={AppColors.background}>
            <View style={styles.appButton}>
              <Text style={styles.appText}>Enable Advertising</Text>
            </View>
          </TouchableHighlight>
          <View style={styles.rowContainer}>
            <TouchableHighlight
              onPress={onSetMacrosTapped}
              activeOpacity={0.8}
              underlayColor={AppColors.background}
              style={styles.rowButton}>
              <View style={styles.appButton}>
                <Text style={styles.appText}>Set Macros</Text>
              </View>
            </TouchableHighlight>
            <TextInput
              style={styles.rowTextInput}
              placeholder="Macros JSON"
              onChangeText={value => {
                setMacros(value);
              }}
              underlineColorAndroid="transparent"
              spellCheck
            />
          </View>
          <View style={styles.rowContainer}>
            <TouchableHighlight
              onPress={onSetPreRollBreakTapped}
              activeOpacity={0.8}
              underlayColor={AppColors.background}
              style={styles.rowButton}>
              <View style={styles.appButton}>
                <Text style={styles.appText}>Set Pre-roll Break</Text>
              </View>
            </TouchableHighlight>
            <TextInput
              style={styles.rowTextInput}
              placeholder="Seconds"
              onChangeText={seconds => {
                setPreRollBreakSeconds(seconds);
              }}
              underlineColorAndroid="transparent"
              spellCheck
            />
          </View>
          <View style={styles.rowContainer}>
            <TouchableHighlight
              onPress={onSetPostRollBreakTapped}
              activeOpacity={0.8}
              underlayColor={AppColors.background}
              style={styles.rowButton}>
              <View style={styles.appButton}>
                <Text style={styles.appText}>Set Post-roll Break</Text>
              </View>
            </TouchableHighlight>
            <TextInput
              style={styles.rowTextInput}
              placeholder="Seconds"
              onChangeText={seconds => {
                setPostRollBreakSeconds(seconds);
              }}
              underlineColorAndroid="transparent"
              spellCheck
            />
          </View>
          <View style={styles.rowContainer}>
            <TouchableHighlight
              onPress={onGetPositionTapped}
              activeOpacity={0.8}
              underlayColor={AppColors.background}
              style={styles.rowButton}>
              <View style={styles.appButton}>
                <Text style={styles.appText}>Get Position</Text>
              </View>
            </TouchableHighlight>
            <TextInput
              style={styles.rowTextInput}
              placeholder="Story Position"
              editable={false}
              focusable={false}
              value={getPosition}
              underlineColorAndroid="transparent"
              spellCheck
            />
          </View>
          <View style={styles.rowContainer}>
            <TouchableHighlight
              onPress={onSetPositionTapped}
              activeOpacity={0.8}
              underlayColor={AppColors.background}
              style={styles.rowButton}>
              <View style={styles.appButton}>
                <Text style={styles.appText}>Set Position</Text>
              </View>
            </TouchableHighlight>
            <TextInput
              style={styles.rowTextInput}
              placeholder="Set Position"
              onChangeText={position => {
                setSetPosition(position);
              }}
              underlineColorAndroid="transparent"
              spellCheck
            />
          </View>
          <View style={styles.rowContainer}>
            <TouchableHighlight
              onPress={onGetStoryIDTapped}
              activeOpacity={0.8}
              underlayColor={AppColors.background}
              style={styles.rowButton}>
              <View style={styles.appButton}>
                <Text style={styles.appText}>Get Story ID</Text>
              </View>
            </TouchableHighlight>
            <TextInput
              style={styles.rowTextInput}
              placeholder="Story ID"
              editable={false}
              focusable={false}
              value={storyId}
              underlineColorAndroid="transparent"
              spellCheck
            />
          </View>
          <View style={styles.rowContainer}>
            <TouchableHighlight
              onPress={onGetTimelineTapped}
              activeOpacity={0.8}
              underlayColor={AppColors.background}
              style={styles.rowButton}>
              <View style={styles.appButton}>
                <Text style={styles.appText}>Get Timeline</Text>
              </View>
            </TouchableHighlight>
            <TextInput
              style={styles.rowTextInput}
              placeholder="Story Timeline"
              editable={false}
              focusable={false}
              value={timeline}
              underlineColorAndroid="transparent"
              spellCheck
            />
          </View>
          <View style={styles.rowContainer}>
            <TouchableHighlight
              onPress={onGetLayoutTapped}
              activeOpacity={0.8}
              underlayColor={AppColors.background}
              style={styles.rowButton}>
              <View style={styles.appButton}>
                <Text style={styles.appText}>Get Layout</Text>
              </View>
            </TouchableHighlight>
            <TextInput
              style={styles.rowTextInput}
              placeholder="Landscape/Portrait"
              editable={false}
              focusable={false}
              value={getLayout}
              underlineColorAndroid="transparent"
              spellCheck
            />
          </View>
          <View style={styles.rowContainer}>
            <TouchableHighlight
              onPress={onSetLayoutTapped}
              activeOpacity={0.8}
              underlayColor={AppColors.background}
              style={styles.rowButton}>
              <View style={styles.appButton}>
                <Text style={styles.appText}>Set Layout</Text>
              </View>
            </TouchableHighlight>
            <TextInput
              style={styles.rowTextInput}
              placeholder="Landscape/Portrait"
              onChangeText={layout => {
                setSetLayout(layout);
              }}
              underlineColorAndroid="transparent"
              spellCheck
            />
          </View>
          <View style={styles.rowContainer}>
            <TouchableHighlight
              onPress={onSetCtaLabelTapped}
              activeOpacity={0.8}
              underlayColor={AppColors.background}
              style={styles.rowButton}>
              <View style={styles.appButton}>
                <Text style={styles.appText}>Set CTA Label</Text>
              </View>
            </TouchableHighlight>
            <TextInput
              style={styles.rowTextInput}
              placeholder="Slide Index"
              onChangeText={value => {
                setSlideIndex(value);
              }}
              underlineColorAndroid="transparent"
              spellCheck
            />
            <TextInput
              style={styles.rowTextInput}
              placeholder="CTA Label"
              onChangeText={value => {
                setCtaLabel(value);
              }}
              underlineColorAndroid="transparent"
              spellCheck
            />
          </View>
          <TouchableHighlight
            onPress={onGetStoryMetadataTapped}
            activeOpacity={0.8}
            underlayColor={AppColors.background}>
            <View style={styles.appButton}>
              <Text style={styles.appText}>Get Story Metadata</Text>
            </View>
          </TouchableHighlight>
          <TextInput
            style={styles.rowLargeTextInput}
            multiline
            editable={false}
            focusable={false}
            value={storyMetadata}
            underlineColorAndroid="transparent"
            spellCheck
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PlayspaceScreen;
