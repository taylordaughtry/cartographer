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
		var priv = this.$private,
			providerOptions = {
				attribution: Wee.view.render('cartographer.attribution'),
				id: setup.projectId,
				accessToken: setup.accessToken
			};

		priv.map = L.map(setup.id).setView(setup.startPoint, setup.startZoom);

		priv.map.attributionControl.setPrefix(false);

		L.Icon.Default.imagePath = '/assets/modules/cartographer/img/';

		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', providerOptions)
			.addTo(priv.map);
	}
}, {
	method: function() {
		// ...
	}
});