/* global L */

Wee.fn.make('Cartographer', {
	/**
	 * Creates the map using the ID you've provided, and sets image paths and
	 * attribution settings that we commonly use.
	 *
	 * @param {object} setup
	 * @return void
	 */
	init: function(setup) {
		var providerOptions = {
				attribution: Wee.view.render('cartographer.attribution'),
				id: setup.projectId,
				accessToken: setup.accessToken
			};

		this.map = L.map(setup.id).setView(setup.startPoint, setup.startZoom);

		this.map.attributionControl.setPrefix(false);

		L.Icon.Default.imagePath = '/assets/modules/cartographer/img/';

		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', providerOptions)
			.addTo(this.map);

		this.markers = {};
	},

	/**
	 * Adds a marker to the map.
	 *
	 * @param {array} point The x/y location of the marker, and any options
	 * @param {string} markerId An identifier for this marker
	 * @return void
	 */
	addMarker: function(point, markerId) {
		var marker = L.marker([point.x, point.y], point.options).addTo(this.map);

		this.markers[markerId] = marker;
	},

	/**
	 * Removes a marker from the map
	 *
	 * @param {string} markerId The marker's identifier
	 * @return void
	 */
	removeMarker: function(markerId) {
		this.map.removeLayer(this.markers[markerId]);

		delete this.markers[markerId];
	}
});