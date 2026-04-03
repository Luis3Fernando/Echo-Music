import { registerRootComponent } from 'expo';
import { Buffer } from 'buffer';
import TrackPlayer from 'react-native-track-player';
import App from './App';
import { PlaybackService } from './src/infrastructure/services/playback.service';

global.Buffer = Buffer;

registerRootComponent(App);
TrackPlayer.registerPlaybackService(() => PlaybackService);
