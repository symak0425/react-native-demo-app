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
import { ElementsPlayer } from 'connatix-player-sdk-react-native';
import AppColors from './AppColors';
import styles from './StyleSheet';
import { storeLogs, readLogs } from './LoggingUtils';
import type { ElementsScreenProps } from './Types';

const ElementsScreen = (props: ElementsScreenProps) => {
  const ERROR_ALERT_TITLE = 'Error';

  useEffect(() => {
    elementsPlayerRef.current?.setElementsConfig(props.route.params.config, (error, success) => {
      if (error !== undefined) {
        Alert.alert(ERROR_ALERT_TITLE, error);
        return;
      }

      if (success) {
        elementsPlayerRef.current?.listenForAllEvents();
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
  const [getVideoDetails, setGetVideoDetails] = useState('');
  const [getCurrentPosition, setGetCurrentPosition] = useState('');
  const [getVideoDuration, setGetVideoDuration] = useState('');
  const [getVideoIndex, setGetVideoIndex] = useState('');
  const [getSetVideoIndex, setSetVideoIndex] = useState('');
  const [getAvailableQualities, setGetAvailableQualities] = useState('');
  const [shouldShowSubtitles, setShouldShowSubtitles] = useState('');
  const [getSubtitles, setGetSubtitles] = useState('');
  const [getSetSubtitles, setSetSubtitles] = useState('');
  const [macros, setMacros] = useState('');
  const [preRollBreakSeconds, setPreRollBreakSeconds] = useState('');
  const [postRollBreakSeconds, setPostRollBreakSeconds] = useState('');
  const [listenForEvent, setListenForEvent] = useState('');
  const [listenForMoreEvents, setListenForMoreEvents] = useState('');
  const [removeEvent, setRemoveEvent] = useState('');
  const [viewability, setViewability] = useState('N/A');
  const elementsPlayerRef = useRef<ElementsPlayer>(null);

  const onNewScreenTapped = () => props.navigation.push('Elements', { config: props.route.params.config });

  const onPlayTapped = () => elementsPlayerRef.current?.play((error) => {
    Alert.alert(ERROR_ALERT_TITLE, error);
  });

  const onPauseTapped = () => elementsPlayerRef.current?.pause((error) => {
    Alert.alert(ERROR_ALERT_TITLE, error);
  });

  const onSetVolumeTapped = () => elementsPlayerRef.current?.setVolume(parseFloat(volume), (error) => {
    Alert.alert(ERROR_ALERT_TITLE, error);
  });

  const onSetQualityTapped = () => elementsPlayerRef.current?.setQuality(parseInt(videoQuality, 10), (error) => {
    Alert.alert(ERROR_ALERT_TITLE, error);
  });

  const onGetQualityTapped = () => elementsPlayerRef.current?.getQuality((error, result) => {
    if (error !== undefined) {
      Alert.alert(ERROR_ALERT_TITLE, error);
      return;
    }
    if (result !== undefined) {
      setGetQuality(result.toString());
    }
  });

  const onDisableAdvertisingTapped = () => elementsPlayerRef.current?.disableAdvertising((error) => {
    Alert.alert(ERROR_ALERT_TITLE, error);
  });

  const onEnableAdvertisingTapped = () => elementsPlayerRef.current?.enableAdvertising((error) => {
    Alert.alert(ERROR_ALERT_TITLE, error);
  });

  const onGetVideoDetailsTapped = () => elementsPlayerRef.current?.getVideoDetails((error, result) => {
    if (error !== undefined) {
      Alert.alert(ERROR_ALERT_TITLE, error);
      return;
    }
    if (result !== undefined) {
      setGetVideoDetails(JSON.stringify(result));
    }
  });

  const onGetCurrentPositionTapped = () => elementsPlayerRef.current?.getVideoCurrentPosition((error, result) => {
    if (error !== undefined) {
      Alert.alert(ERROR_ALERT_TITLE, error);
      return;
    }
    if (result !== undefined) {
      setGetCurrentPosition(result.toString());
    }
  });

  const onGetVideoDurationTapped = () => elementsPlayerRef.current?.getVideoDuration((error, result) => {
    if (error !== undefined) {
      Alert.alert(ERROR_ALERT_TITLE, error);
      return;
    }
    if (result !== undefined) {
      setGetVideoDuration(result.toString());
    }
  });

  const onGetVideoIndexTapped = () => elementsPlayerRef.current?.getVideoIndex((error, result) => {
    if (error !== undefined) {
      Alert.alert(ERROR_ALERT_TITLE, error);
      return;
    }
    if (result !== undefined) {
      setGetVideoIndex(result.toString());
    }
  });

  const onSetVideoIndexTapped = () => elementsPlayerRef.current?.setVideoIndex(parseInt(getSetVideoIndex, 10), (error) => {
    Alert.alert(ERROR_ALERT_TITLE, error);
  });

  const onSetAutoQualityTapped = () => elementsPlayerRef.current?.setAutoQuality((error) => {
    Alert.alert(ERROR_ALERT_TITLE, error);
  });

  const onGetAvailableQualitiesTapped = () => elementsPlayerRef.current?.getAvailableQualities((error, result) => {
    if (error !== undefined) {
      Alert.alert(ERROR_ALERT_TITLE, error);
      return;
    }
    if (result !== undefined) {
      setGetAvailableQualities(result.toString());
    } 
  });

  const onToggleFullscreenTapped = () => elementsPlayerRef.current?.toggleFullscreen((error) => {
    Alert.alert(ERROR_ALERT_TITLE, error);
  });

  const onToggleSubtitlesTapped = () => {
    var result;
    if (shouldShowSubtitles === 'true') {
      result = true;
    } else if (shouldShowSubtitles === 'false') {
      result = false;
    } else {
      Alert.alert(ERROR_ALERT_TITLE, 'Could not cast String to Bool');
      return;
    }

    elementsPlayerRef.current?.toggleSubtitles(result, (error) => {
      Alert.alert(ERROR_ALERT_TITLE, error);
    });
  };

  const onGetSubtitlesTapped = () => elementsPlayerRef.current?.getSubtitles((error, result) => {
    if (error !== undefined) {
      Alert.alert(ERROR_ALERT_TITLE, error);
      return;
    }
    if (result !== undefined) {
      setGetSubtitles(JSON.stringify(result));
    }
  });

  const onSetSubtitleTapped = () => elementsPlayerRef.current?.setSubtitle(getSetSubtitles, (error) => {
    Alert.alert(ERROR_ALERT_TITLE, error);
  });

  const onSetMacrosTapped = () => elementsPlayerRef.current?.setMacros(macros, (error) => {
    Alert.alert(ERROR_ALERT_TITLE, error);
  });

  const onSetPreRollBreakTapped = () => elementsPlayerRef.current?.setPreRollBreak(parseInt(preRollBreakSeconds, 10), (error) => {
    Alert.alert(ERROR_ALERT_TITLE, error);
  });

  const onSetPostRollBreakTapped = () => elementsPlayerRef.current?.setPostRollBreak(parseInt(postRollBreakSeconds, 10), (error) => {
    Alert.alert(ERROR_ALERT_TITLE, error);
  });

  const onListenForEventTapped = () => elementsPlayerRef.current?.listenFor(listenForEvent, false, (error) => {
    Alert.alert(ERROR_ALERT_TITLE, error);
  });

  const onListenForMoreEventsTapped = () => {
    const events = listenForMoreEvents.split(", ");
  
    elementsPlayerRef.current?.listenForMore(events, (error) => {
      Alert.alert(ERROR_ALERT_TITLE, error);
    });
  };

  const onListenForAllEventsTapped = () => elementsPlayerRef.current?.listenForAllEvents();

  const onRemoveEventTapped = () => elementsPlayerRef.current?.remove(removeEvent, (error) => {
    Alert.alert(ERROR_ALERT_TITLE, error);
  });

  const onRemoveAllEventsTapped = () => elementsPlayerRef.current?.removeAllEvents();

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
          <View style={styles.elementsContainerView}>
            <ElementsPlayer
              ref={elementsPlayerRef}
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
          <TouchableHighlight
            onPress={onSetAutoQualityTapped}
            activeOpacity={0.8}
            underlayColor={AppColors.background}>
            <View style={styles.appButton}>
              <Text style={styles.appText}>Set Auto Quality</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={onToggleFullscreenTapped}
            activeOpacity={0.8}
            underlayColor={AppColors.background}>
            <View style={styles.appButton}>
              <Text style={styles.appText}>Toggle Fullscreen</Text>
            </View>
          </TouchableHighlight>
          <View style={styles.rowContainer}>
            <TouchableHighlight
              onPress={onToggleSubtitlesTapped}
              activeOpacity={0.8}
              underlayColor={AppColors.background}
              style={styles.rowButton}>
              <View style={styles.appButton}>
                <Text style={styles.appText}>Toggle Subtitles</Text>
              </View>
            </TouchableHighlight>
            <TextInput
              style={styles.rowTextInput}
              placeholder="Boolean"
              onChangeText={shouldShow => {
                setShouldShowSubtitles(shouldShow);
              }}
              underlineColorAndroid="transparent"
              spellCheck
            />
          </View>
          <TouchableHighlight
            onPress={onGetSubtitlesTapped}
            activeOpacity={0.8}
            underlayColor={AppColors.background}>
            <View style={styles.appButton}>
              <Text style={styles.appText}>Get Subtitles</Text>
            </View>
          </TouchableHighlight>
          <TextInput
            style={styles.rowLargeTextInput}
            multiline
            editable={false}
            focusable={false}
            value={getSubtitles}
            underlineColorAndroid="transparent"
            spellCheck
          />
          <View style={styles.rowContainer}>
            <TouchableHighlight
              onPress={onSetSubtitleTapped}
              activeOpacity={0.8}
              underlayColor={AppColors.background}
              style={styles.rowButton}>
              <View style={styles.appButton}>
                <Text style={styles.appText}>Set Subtitle</Text>
              </View>
            </TouchableHighlight>
            <TextInput
              style={styles.rowTextInput}
              placeholder="Track JSON"
              onChangeText={track => {
                setSetSubtitles(track);
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
          <View style={styles.rowContainer}>
            <TouchableHighlight
              onPress={onGetAvailableQualitiesTapped}
              activeOpacity={0.8}
              underlayColor={AppColors.background}
              style={styles.rowButton}>
              <View style={styles.appButton}>
                <Text style={styles.appText}>Get Available Qualities</Text>
              </View>
            </TouchableHighlight>
            <TextInput
              style={styles.rowTextInput}
              placeholder="Available Qualities"
              editable={false}
              focusable={false}
              value={getAvailableQualities}
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
              onPress={onGetCurrentPositionTapped}
              activeOpacity={0.8}
              underlayColor={AppColors.background}
              style={styles.rowButton}>
              <View style={styles.appButton}>
                <Text style={styles.appText}>Get Current Position</Text>
              </View>
            </TouchableHighlight>
            <TextInput
              style={styles.rowTextInput}
              placeholder="Position"
              editable={false}
              focusable={false}
              value={getCurrentPosition}
              underlineColorAndroid="transparent"
              spellCheck
            />
          </View>
          <View style={styles.rowContainer}>
            <TouchableHighlight
              onPress={onGetVideoDurationTapped}
              activeOpacity={0.8}
              underlayColor={AppColors.background}
              style={styles.rowButton}>
              <View style={styles.appButton}>
                <Text style={styles.appText}>Get Video Duration</Text>
              </View>
            </TouchableHighlight>
            <TextInput
              style={styles.rowTextInput}
              placeholder="Duration"
              editable={false}
              focusable={false}
              value={getVideoDuration}
              underlineColorAndroid="transparent"
              spellCheck
            />
          </View>
          <View style={styles.rowContainer}>
            <TouchableHighlight
              onPress={onGetVideoIndexTapped}
              activeOpacity={0.8}
              underlayColor={AppColors.background}
              style={styles.rowButton}>
              <View style={styles.appButton}>
                <Text style={styles.appText}>Get Video Index</Text>
              </View>
            </TouchableHighlight>
            <TextInput
              style={styles.rowTextInput}
              placeholder="Index"
              editable={false}
              focusable={false}
              value={getVideoIndex}
              underlineColorAndroid="transparent"
              spellCheck
            />
          </View>
          <View style={styles.rowContainer}>
            <TouchableHighlight
              onPress={onSetVideoIndexTapped}
              activeOpacity={0.8}
              underlayColor={AppColors.background}
              style={styles.rowButton}>
              <View style={styles.appButton}>
                <Text style={styles.appText}>Set Video Index</Text>
              </View>
            </TouchableHighlight>
            <TextInput
              style={styles.rowTextInput}
              placeholder="Index"
              onChangeText={index => {
                setSetVideoIndex(index);
              }}
              underlineColorAndroid="transparent"
              spellCheck
            />
          </View>
          <TouchableHighlight
            onPress={onGetVideoDetailsTapped}
            activeOpacity={0.8}
            underlayColor={AppColors.background}>
            <View style={styles.appButton}>
              <Text style={styles.appText}>Get Video Details</Text>
            </View>
          </TouchableHighlight>
          <TextInput
            style={styles.rowLargeTextInput}
            multiline
            editable={false}
            focusable={false}
            value={getVideoDetails}
            underlineColorAndroid="transparent"
            spellCheck
          />
                    <View style={styles.rowContainer}>
            <TouchableHighlight
              onPress={onListenForEventTapped}
              activeOpacity={0.8}
              underlayColor={AppColors.background}
              style={styles.rowButton}>
              <View style={styles.appButton}>
                <Text style={styles.appText}>Listen For</Text>
              </View>
            </TouchableHighlight>
            <TextInput
              style={styles.rowTextInput}
              placeholder="Event"
              onChangeText={event => {
                setListenForEvent(event);
              }}
              underlineColorAndroid="transparent"
              spellCheck
            />
          </View>
          <View style={styles.rowContainer}>
            <TouchableHighlight
              onPress={onListenForMoreEventsTapped}
              activeOpacity={0.8}
              underlayColor={AppColors.background}
              style={styles.rowButton}>
              <View style={styles.appButton}>
                <Text style={styles.appText}>Listen For More</Text>
              </View>
            </TouchableHighlight>
            <TextInput
              style={styles.rowTextInput}
              placeholder="Events"
              onChangeText={events => {
                setListenForMoreEvents(events);
              }}
              underlineColorAndroid="transparent"
              spellCheck
            />
          </View>
          <TouchableHighlight
            onPress={onListenForAllEventsTapped}
            activeOpacity={0.8}
            underlayColor={AppColors.background}>
            <View style={styles.appButton}>
              <Text style={styles.appText}>Listen For All Events</Text>
            </View>
          </TouchableHighlight>
          <View style={styles.rowContainer}>
            <TouchableHighlight
              onPress={onRemoveEventTapped}
              activeOpacity={0.8}
              underlayColor={AppColors.background}
              style={styles.rowButton}>
              <View style={styles.appButton}>
                <Text style={styles.appText}>Remove</Text>
              </View>
            </TouchableHighlight>
            <TextInput
              style={styles.rowTextInput}
              placeholder="Event"
              onChangeText={event => {
                setRemoveEvent(event);
              }}
              underlineColorAndroid="transparent"
              spellCheck
            />
          </View>
          <TouchableHighlight
            onPress={onRemoveAllEventsTapped}
            activeOpacity={0.8}
            underlayColor={AppColors.background}>
            <View style={styles.appButton}>
              <Text style={styles.appText}>Remove All Events</Text>
            </View>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ElementsScreen;
