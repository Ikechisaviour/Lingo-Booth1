import TrackPlayer from 'react-native-track-player';

/**
 * Playback service registered with TrackPlayer.
 * Handles remote events from the Android media notification (play/pause/stop).
 */
module.exports = async function () {
  const { Event } = require('react-native-track-player');

  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    TrackPlayer.play();
  });

  TrackPlayer.addEventListener(Event.RemotePause, () => {
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener(Event.RemoteStop, () => {
    TrackPlayer.stop();
    TrackPlayer.reset();
  });
};
