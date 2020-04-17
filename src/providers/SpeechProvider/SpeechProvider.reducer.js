import {
  RECEIVE_VOICES,
  CHANGE_VOICE,
  CHANGE_PITCH,
  CHANGE_RATE,
  CHANGE_VOLUME,
  START_SPEECH,
  END_SPEECH,
  EMPTY_VOICES
} from './SpeechProvider.constants';
import { getVoiceURI } from '../../i18n';
import { CHANGE_LANG } from '../LanguageProvider/LanguageProvider.constants';
import { LOGIN_SUCCESS } from '../../components/Account/Login/Login.constants';
import { DEFAULT_LANG } from '../../components/App/App.constants';

const initialState = {
  voices: [],
  langs: [],
  options: {
    lang: '',
    voiceURI: null,
    pitch: 1.0,
    rate: 1.0,
    volume: 1
  },
  isSpeaking: false
};

function speechProviderReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      const settings = action.payload.settings || {};
      const { speech } = settings || {};

      const pitch = speech && speech.pitch ? speech.pitch : state.options.pitch;
      const rate = speech && speech.rate ? speech.rate : state.options.rate;

      const options = { ...state.options, pitch, rate };

      return {
        ...state,
        options
      };
    case RECEIVE_VOICES:
      return {
        ...state,
        voices: action.voices,
        langs: [...new Set(action.voices.map(voice => voice.lang))].sort()
      };
    case CHANGE_VOICE:
      return {
        ...state,
        options: {
          ...state.options,
          voiceURI: action ? action.voiceURI : EMPTY_VOICES,
          lang: action ? action.lang : DEFAULT_LANG
        }
      };
    case CHANGE_LANG:
      // hack just for alfanum voice
      if (
        action.lang === 'sr-RS' ||
        action.lang === 'sr-ME' ||
        action.lang === 'me-ME'
      ) {
        return {
          ...state,
          options: {
            ...state.options,
            lang: action.lang,
            voiceURI: getVoiceURI(action.lang, state.voices)
          },
          langs: ['me-ME', 'sr-ME', 'sr-RS']
        };
      } else {
        return {
          ...state,
          options: {
            ...state.options,
            lang: action.lang,
            voiceURI: getVoiceURI(action.lang, state.voices)
          }
        };
      }
    case CHANGE_PITCH:
      return { ...state, options: { ...state.options, pitch: action.pitch } };
    case CHANGE_RATE:
      return { ...state, options: { ...state.options, rate: action.rate } };
    case CHANGE_VOLUME:
      return { ...state, options: { ...state.options, volume: action.volume } };
    case START_SPEECH:
      return { ...state, isSpeaking: action.isSpeaking };
    case END_SPEECH:
      return { ...state, isSpeaking: action.isSpeaking };
    default:
      return state;
  }
}

export default speechProviderReducer;
