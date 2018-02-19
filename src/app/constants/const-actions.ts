import { DeckAction } from 'app/models';

export const DECK_SET: DeckAction[] = [
   // {name: 'Toggle On/Off', func: 'deck_toggle'},
   // {name: 'Toggle Group', func: 'deck_toggle_group'},
   { name: 'Delay Actions', func: 'DeckDelay' },
   { name: 'Open Folder', func: 'DeckFolder' }
];

export const TWITCH_SET: DeckAction[] = [
   { name: 'Sub Only Mode', func: 'TwitchSubs' },
   { name: 'Emote Mode', func: 'TwitchEmote' },
   { name: 'Follower Only Mode', func: 'TwitchFollowers' },
   { name: 'Slow Mode', func: 'TwitchSlow' },
   { name: 'Commercial', func: 'TwitchCommercial' },
   { name: 'Custom Message', func: 'TwitchCustomMessage' }
];

export const OBS_SET: DeckAction[] = [
   { name: 'Start/ Stop Streaming', func: 'ObsToggleStreaming' },
   { name: 'Start/ Stop Recording', func: 'ObsToggleRecording' },
   { name: 'Toggle Mic', func: 'ObsToggleMic' },
   { name: 'Change Scene', func: 'ObsToggleScene' },
   { name: 'Toggle Source', func: 'ObsToggleSource' },
];

export const MEDIA_SET: DeckAction[] = [
   { name: 'Play/ Pause', func: 'MediaPlayPause' },
   { name: 'Prev Track', func: 'MediaPrevTrack' },
   { name: 'Next Track', func: 'MediaNextTrack' },
   { name: 'Mute', func: 'MediaMute' },
   { name: 'Stop', func: 'MediaStop' },
   { name: 'Volume Up', func: 'MediaVolUp' },
   { name: 'Volume Down', func: 'MediaVolDown' }
];

export const SYS_SET: DeckAction[] = [
   { name: 'Hotkey', func: 'SysHotkey' }
];
