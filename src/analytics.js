import { createMiddleware } from 'redux-beacon';
import GoogleAnalyticsGtag from '@redux-beacon/google-analytics-gtag';
import offlineWeb from '@redux-beacon/offline-web';
// import logger from '@redux-beacon/logger';

import { isCordova } from './cordova-util';
import boardEventsMap from './components/Board/Board.analytics';
import speechEventsMap from './providers/SpeechProvider/SpeechProvider.analytics';

const isConnected = state => state.app.isConnected;
const offlineStorage = offlineWeb(isConnected);

const eventsMap = {
  ...boardEventsMap,
  ...speechEventsMap
};

const trackingId = 'UA-108091601-1';
const ga = GoogleAnalyticsGtag(trackingId);

const gaMiddleware = createMiddleware(eventsMap, ga, {
  offlineStorage
});

if (isCordova()) {
  window.ga.startTrackerWithId('UA-152065055-1', 20);
}

export default gaMiddleware;
