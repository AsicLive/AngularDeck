import { DeckAction } from 'app/models';

export const DECK_SET: DeckAction[] = [
   // {name: 'Toggle On/Off', func: 'deck_toggle'},
   // {name: 'Toggle Group', func: 'deck_toggle_group'},
   { name: 'Delay Actions', func: 'deck_delay' },
   { name: 'Open Folder', func: 'deck_folder' }
];

export const TWITCH_SET: DeckAction[] = [
   { name: 'Sub Only Mode', func: 'twitch_subs' },
   { name: 'Emote Mode', func: 'twitch_emote' },
   { name: 'Follower Only Mode', func: 'twitch_followers' },
   { name: 'Slow Mode', func: 'twitch_slow' },
   { name: 'Commercial', func: 'twitch_commercial' },
   { name: 'Custom Message', func: 'twitch_custom_message' }
];

export const OBS_SET: DeckAction[] = [
   { name: 'Start/ Stop Streaming', func: 'obs_toggle_streaming' },
   { name: 'Start/ Stop Recording', func: 'obs_toggle_recording' },
   { name: 'Toggle Mic', func: 'obs_toggle_mic' },
   { name: 'Change Scene', func: 'obs_change_scene' },
   { name: 'Toggle Source', func: 'obs_toggle_source' },
];

export const MEDIA_SET: DeckAction[] = [
   { name: 'Play/ Pause', func: 'media_play_pause' },
   { name: 'Prev Track', func: 'media_prev_track' },
   { name: 'Next Track', func: 'media_next_track' },
   { name: 'Mute', func: 'media_mute' },
   { name: 'Stop', func: 'media_stop' },
   { name: 'Volume Up', func: 'media_vol_up' },
   { name: 'Volume Down', func: 'media_vol_down' }
];

export const SYS_SET: DeckAction[] = [
   { name: 'Hotkey', func: 'sys_hotkey' }
];
