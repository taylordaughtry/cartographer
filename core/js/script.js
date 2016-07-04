/* global L */

Wee.fn.make('Cartographer', {
	/**
	 * Creates the map using the ID you've provided, and sets image paths and
	 * attribution settings that we commonly use.
	 *
	 * TODO: Default to OpenStreetMaps if no accessToken/projectId
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

		this.map = L.map($('ref:' + setup.ref)[0]).setView(setup.startPoint, setup.startZoom);

		this.map.attributionControl.setPrefix(false);

		L.Icon.Default.imagePath = '/assets/modules/cartographer/img/';

		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', providerOptions)
			.addTo(this.map);

		// TODO: Store these values in a general sense, rather than specifically
		this.markers = {};
		this.circles = {};
		this.polygons = {};
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

		this.markers[params.id] = marker;

		return this.markers[marker.id];
	},

	/**
	 * Removes a marker from the map.
	 *
	 * TODO: Combine these into one method to remove any feature from map
	 * TODO: Handle boolean returns properly instead of always true
	 *
	 * @param {string} identifier The marker's identifier passed during creation
	 * @return void
	 */
	removeMarker: function(identifier) {
		this.map.removeLayer(this.markers[identifier]);

		delete this.markers[identifier];

		return true;
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

		this.circles[params.id] = circle;
	},

	/**
	 * Remove a circle from the map.
	 *
	 * @param {string} identifier The circle's identifier
	 * @return boolean
	 */
	removeCircle: function(identifier) {
		this.map.removeLayer(this.circles[identifier]);

		delete this.circles[identifier];

		return true;
	},

	addPolygon: function(params) {
		var polygon = L.polygon(params.points);

		this.polygons[params.id] = polygon;

		polygon.addTo(this.map);
	},

	removePolygon: function(identifier) {
		this.map.removeLayer(this.polygons[identifier]);

		delete this.polygons[identifier];

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
		return this.circles[container]
			.getBounds()
			.contains(this.markers[identifier]
			.getLatLng());
	}
});