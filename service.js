// trackPlayerService.ts
import TrackPlayer, {Capability} from 'react-native-track-player';

module.exports = async function () {
  TrackPlayer.updateOptions({
    stopWithApp: false, // keep playback in background
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.Stop,
    ],
    compactCapabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
    ],
    // notificationCapabilities: [
    //   Capability.Play,
    //   Capability.Pause,
    //   Capability.SkipToNext,
    //   Capability.SkipToPrevious,
    //   Capability.Stop
    // ],
  });
  TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());

  TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());

  TrackPlayer.addEventListener('remote-next', () => {
    TrackPlayer.skipToNext();
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener('remote-previous', () => {
    TrackPlayer.skipToPrevious();
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.destroy());
};
