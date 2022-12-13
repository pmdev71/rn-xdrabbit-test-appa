// Example of YouTube Video Integration in React Native
// https://aboutreact.com/youtube-video-integration-in-react-native/

// Import React
import React, {useState, useRef} from 'react';
// Import required components
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  PixelRatio,
  Button,
} from 'react-native';

// Import Youtube Players
import YouTube from 'react-native-youtube';

const YoutubeApi = () => {
  const youtubePlayerRef = useRef();
  const [singleVideoId, setSingleVideoId] = useState('4A426Yjm_jM');
  const listVideoIds = [
    '0BxQSe9pHrY',
    '4A426Yjm_jM',
    'BfmIgt_kPvM',
    'F9LwbmIWIr0',
  ];

  const [isReady, setIsReady] = useState(false); // true/false
  const [status, setStatus] = useState(null); // 'unstarted', 'ended', 'playing', 'paused', 'buffering', 'cued'.
  const [quality, setQuality] = useState(null); // 'small', 'medium', 'large', 'hd720', 'hd1080', 'highres', 'default'.
  const [error, setError] = useState(null); //
  const [isPlaying, setIsPlaying] = useState(true); // true/false
  const [isLooping, setIsLooping] = useState(false); // true/false
  const [duration, setDuration] = useState(0); // total duration of video
  const [currentTime, setCurrentTime] = useState(0); // current playing time of video
  const [fullscreen, setFullscreen] = useState(false); // true/false
  const [containerMounted, setContainerMounted] = useState(false); // true/false
  const [containerWidth, setContainerWidth] = useState(null); // width of container
  const [showinfo, setShowinfo] = useState(false); // true/false

  const API_KEY = 'AIzaSyAWM6tON4D0liKmDO31g5c4b-6R5RRjmxM';

  console.log(youtubePlayerRef);
  const handlePlayNext = () => {
    setSingleVideoId('F9LwbmIWIr0');
    setIsPlaying(false);
  };

  setInterval(function () {
    youtubePlayerRef.current?.getCurrentTime().then(currentTime => {
      console.log({currentTime});
      console.log(currentTime);
      if (currentTime >= 10) {
        setIsPlaying(false);
        handlePlayNext();
        // youtubePlayerRef.current && youtubePlayerRef.current.nextVideo();
      }
    });

    // youtubePlayerRef.current
    //   ?.getDuration()
    //   .then(getDuration => console.log({getDuration}));
  }, 2000);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={styles.container}
        onLayout={({
          nativeEvent: {
            layout: {width},
          },
        }) => {
          if (!containerMounted) setContainerMounted(true);
          if (containerWidth !== width) setContainerWidth(width);
        }}>
        {containerMounted && (
          <YouTube
            ref={youtubePlayerRef}
            // You must have an API Key for the player to load in Android
            apiKey={API_KEY}
            // Un-comment one of videoId / videoIds / playlist.
            // You can also edit these props while Hot-Loading in development mode to see how
            // it affects the loaded native module
            videoId={singleVideoId}
            // videoIds={listVideoIds}
            // playlistId="PLF797E961509B4EB5"
            play={isPlaying}
            loop={isLooping}
            fullscreen={fullscreen}
            controls={1}
            style={[
              {
                height: PixelRatio.roundToNearestPixel(
                  containerWidth / (16 / 9),
                ),
              },
              styles.player,
            ]}
            onError={e => setError(e.error)}
            onReady={e => setIsReady(true)}
            onChangeState={e => setStatus(e.state)}
            onChangeQuality={e => setQuality(e.quality)}
            onChangeFullscreen={e => setFullscreen(e.isFullscreen)}
            //onProgress work only on IOS
            onProgress={e => {
              setDuration(e.duration);
              setCurrentTime(e.currentTime);
            }}
          />
        )}

        {/* <Text style={styles.titleText}>
          YouTube Video Integration in React Native
        </Text> */}

        {/* Playing / Looping */}
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setIsPlaying(isPlaying => !isPlaying)}>
            <Text style={styles.buttonText}>
              {status == 'playing' ? 'Pause' : 'Play'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setIsLooping(isLooping => !isLooping)}>
            <Text style={styles.buttonText}>
              {isLooping ? 'Looping' : 'Not Looping'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Previous / Next video */}
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              youtubePlayerRef.current &&
              youtubePlayerRef.current.previousVideo()
            }>
            <Text style={styles.buttonText}>Previous Video</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              youtubePlayerRef.current && youtubePlayerRef.current.nextVideo()
            }>
            <Text style={styles.buttonText}>Next Video</Text>
          </TouchableOpacity>
          <Button
            title="log details"
            onPress={() => {
              youtubePlayerRef.current
                ?.getCurrentTime()
                .then(currentTime => console.log({currentTime}));

              youtubePlayerRef.current
                ?.getDuration()
                .then(getDuration => console.log({getDuration}));
            }}
          />
        </View>

        {/* Go To Specific time in played video with seekTo() */}
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              youtubePlayerRef.current && youtubePlayerRef.current.seekTo(15)
            }>
            <Text style={styles.buttonText}>15 Seconds</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              youtubePlayerRef.current &&
              youtubePlayerRef.current.seekTo(2 * 60)
            }>
            <Text style={styles.buttonText}>2 Minutes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              youtubePlayerRef.current &&
              youtubePlayerRef.current.seekTo(15 * 60)
            }>
            <Text style={styles.buttonText}>15 Minutes</Text>
          </TouchableOpacity>
        </View>

        {/* Play specific video in a videoIds array by index */}
        {youtubePlayerRef.current &&
          youtubePlayerRef.current.props.videoIds &&
          Array.isArray(youtubePlayerRef.current.props.videoIds) && (
            <View style={styles.buttonGroup}>
              {youtubePlayerRef.current.props.videoIds.map((videoId, i) => (
                <TouchableOpacity
                  key={i}
                  style={styles.button}
                  onPress={() =>
                    youtubePlayerRef.current &&
                    youtubePlayerRef.current.playVideoAt(i)
                  }>
                  <Text
                    style={[
                      styles.buttonText,
                      styles.buttonTextSmall,
                    ]}>{`Video ${i}`}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

        {/* Fullscreen */}
        {!fullscreen && (
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setFullscreen(true)}>
              <Text style={styles.buttonText}>Set Fullscreen</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.instructions}>
          {isReady ? 'Player is ready' : 'Player setting up...'}
        </Text>
        <Text style={styles.instructions}>Status: {status}</Text>
        <Text style={styles.instructions}>Quality: {quality}</Text>

        {/* Show Progress */}
        <Text style={styles.instructions}>
          Progress: {Math.trunc(currentTime)}s ({Math.trunc(duration / 60)}:
          {Math.trunc(duration % 60)}s)
        </Text>

        <Text style={styles.instructions}>
          {error ? 'Error: ' + error : ''}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default YoutubeApi;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'blue',
  },
  buttonTextSmall: {
    fontSize: 15,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  player: {
    alignSelf: 'stretch',
    marginVertical: 5,
    marginHorizontal: 5,
  },
});

// {"current": {"_backPress": [Function anonymous], "_interval": null, "_nativeComponentRef": {"current": [ReactNativeFiberHostComponent]}, "_onChangeFullscreen": [Function anonymous], "_onChangeQuality": [Function anonymous], "_onChangeState": [Function anonymous], "_onError": [Function anonymous], "_onLayout": [Function anonymous], "_onReady": [Function anonymous], "_reactInternalInstance": {}, "_reactInternals": {"_debugHookTypes": null, "_debugNeedsRemount": false, "_debugOwner": [FiberNode], "_debugSource": undefined, "actualDuration": 0.4767000013962388, "actualStartTime": 4634382.6838, "alternate": [FiberNode], "child": [FiberNode], "childLanes": 0, "deletions": null, "dependencies": null, "elementType": [Function YouTube], "flags": 5, "index": 0, "key": null, "lanes": 1, "memoizedProps": [Object], "memoizedState": [Object], "mode": 2, "pendingProps": [Object], "ref": [Circular], "return": [FiberNode], "selfBaseDuration": 0.18910000007599592, "sibling": [FiberNode], "stateNode": [Circular], "subtreeFlags": 5, "tag": 1, "treeBaseDuration": 0.37410000059753656, "type": [Function YouTube], "updateQueue": [Object]}, "_timeout": 153, "context": {}, "getCurrentTime": [Function anonymous], "getDuration": [Function anonymous], "getVideosIndex": [Function anonymous], "props": {"apiKey": "AIzaSyAWM6tON4D0liKmDO31g5c4b-6R5RRjmxM", "controls": 1, "fullscreen": false, "loop": false, "onChangeFullscreen": [Function onChangeFullscreen], "onChangeQuality": [Function onChangeQuality], "onChangeState": [Function onChangeState], "onError": [Function onError], "onProgress": [Function onProgress], "onReady": [Function onReady], "play": false, "resumePlayAndroid": true, "showFullscreenButton": true, "style": [Array], "videoIds": [Array]}, "refs": {}, "state": {"fullscreen": false, "resizingHackFlag": false}, "updater": {"enqueueForceUpdate": [Function enqueueForceUpdate], "enqueueReplaceState": [Function enqueueReplaceState], "enqueueSetState": [Function enqueueSetState], "isMounted": [Function isMounted]}}}
