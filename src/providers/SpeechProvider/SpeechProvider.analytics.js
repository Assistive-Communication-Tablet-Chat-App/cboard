import { trackEvent } from '@redux-beacon/google-analytics-gtag';

import {
  CHANGE_VOICE,
  CHANGE_PITCH,
  CHANGE_RATE,
  START_SPEECH
} from './SpeechProvider.constants';
import { isCordova } from '../../cordova-util';

const changeVoice = trackEvent((action, prevState, nextState) => {
  const gaEvent = {
    category: 'Speech',
    action: 'Changed Voice',
    label: action.voiceURI
  };
  if (isCordova()) {
    window.ga.trackEvent(gaEvent.category, gaEvent.action, gaEvent.label);
  }
  return gaEvent;
});

const changePitch = trackEvent((action, prevState, nextState) => {
  const gaEvent = {
    category: 'Speech',
    action: 'Changed Pitch',
    label: action.pitch
  };
  if (isCordova()) {
    window.ga.trackEvent(gaEvent.category, gaEvent.action, gaEvent.label);
  }
  return gaEvent;
});

const changeRate = trackEvent((action, prevState, nextState) => {
  const gaEvent = {
    category: 'Speech',
    action: 'Changed Rate',
    label: action.rate
  };
  if (isCordova()) {
    window.ga.trackEvent(gaEvent.category, gaEvent.action, gaEvent.label);
  }
  return gaEvent;
});

const startSpeech = trackEvent((action, prevState, nextState) => {
  const gaEvent = {
    category: 'Speech',
    action: 'Start Speech',
    label: action.text
  };
  if (isCordova()) {
    window.ga.trackEvent(gaEvent.category, gaEvent.action, gaEvent.label);
  }
  return gaEvent;
});

const eventsMap = {
  [CHANGE_VOICE]: changeVoice,
  [CHANGE_PITCH]: changePitch,
  [CHANGE_RATE]: changeRate,
  [START_SPEECH]: startSpeech
};

export default eventsMap;
