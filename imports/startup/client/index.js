import './routes.js';

if (Meteor.isClient) {
	GoogleMaps.load({
		key: 'AIzaSyDM0CwBwSS3LbL1_AuL2E5NgZubWf1v-GM',
		libraries: 'places'
	});
}
