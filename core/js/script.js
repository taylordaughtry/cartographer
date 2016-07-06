/* global L */

Wee.fn.make('Cartographer', {
	/**
	 * Creates the map using the ID you've provided, and sets image paths and
	 * attribution settings that we commonly use.
	 *
	 * TODO: Put the config into a single object
	 * TODO: Add scrollToMarker functionality
	 *
	 * @param {object} setup
	 * @return void
	 */
	init: function(params) {
		var conf = $.extend({
			startPoint: [36.16, -86.78],
			startZoom: 13,
			ref: 'map',
			mapbox: false,
			attribution: Wee.view.render('cartographer.attribution')
		}, params),
			url;

		this.conf = conf;

		if (! conf.mapbox) {
			url = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png';
		} else {
			url = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}';
		}

		this.map = L.map($('ref:' + conf.ref)[0]).setView(conf.startPoint, conf.startZoom);

		this.map.attributionControl.setPrefix(false);

		L.Icon.Default.imagePath = '/assets/modules/cartographer/img/';

		L.tileLayer(url, {
			attribution: conf.attribution,
			id: conf.mapbox.projectId,
			accessToken: conf.mapbox.accessToken
		}).addTo(this.map);

		// TODO: Store these values in a general sense, rather than specifically
		this.features = {};
	},

	/**
	 * Adds a marker to the map.
	 *
	 * @param {array} marker The lat/long location of the marker, and any options
	 * @return void
	 */
	addMarker: function(params) {
		var marker = L.marker([params.lat, params.long], params.options);

		if (params.popup) {
			marker.bindPopup(params.popup.content, params.popup.options);
		}

		marker.addTo(this.map);

		this.features[params.id] = marker;

		return this.features[params.id];
	},

	/**
	 * Add a circle to the map.
	 *
	 * @param {object} params Settings to define a circle
	 * @return void
	 */
	addCircle: function(params) {
		var circle = L.circle(params.centerPoint, params.radius);

		circle.addTo(this.map);

		this.features[params.id] = circle;
	},

	/**
	 * Add a polygon to the map.
	 *
	 * @param {object} params Points and options for a polygon
	 * @return void
	 */
	addPolygon: function(params) {
		var polygon = L.polygon(params.points);

		this.features[params.id] = polygon;

		polygon.addTo(this.map);
	},

	/**
	 * Removes a feature from the map.
	 *
	 * TODO: Handle boolean returns properly instead of always true
	 *
	 * @param {string} identifier The feature's identifier passed during creation
	 * @return void
	 */
	removeFeature: function(identifier) {
		this.map.removeLayer(this.features[identifier]);

		this.features[identifier] = null;

		return true;
	},

	/**
	 * Check whether a given circle or polygon contains a given marker.
	 *
	 * @param {string} container The container's identifier
	 * @param {string} identifier The marker's identifier
	 * @return boolean
	 */
	contains: function(container, identifier) {
		return this.features[container]
			.getBounds()
			.contains(this.features[identifier]
			.getLatLng());
	},

	/**
	 * Move the map view to a given set of coordinates
	 *
	 * TODO: Add support for options
	 * TODO: Add support for passing a marker to be scrolled to
	 *
	 * @param {array} params The options object for this method
	 * @return void
	 */
	panTo: function(params) {
		this.map.setView(params.coords, params.zoom ? params.zoom : this.conf.startZoom, {
			animation: true
		});
	}
});