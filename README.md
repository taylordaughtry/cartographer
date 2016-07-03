# Cartographer

Cartographer is a javascript module for [Wee](https://github.com/weepower/wee)
that makes creating and managing web maps easier. It uses Leaflet 0.7.7 and
Mapbox. The intent of this module is to make web maps easier & faster to
implement on client sites, while taking advantage of Wee's JS capabilities.

# Installation

Download the `master` branch of this repo and rename the extracted folder to
`cartographer`. Place that in your `/source/js/modules/` folder, then do a
`wee run` to rebuild your code and include Cartographer in your JS.

# Usage

Go to [Mapbox](https://www.mapbox.com/studio/) and grab your Access Token. Then,
using the 'Classic' projects, create a new 'Mapbox Editor' project, build the
style needed for your map, and grab the project ID. From there, you're all ready
to boot up Cartographer.

## Initalizing Cartographer

To initialize a map, Cartographer needs a few things: your Mapbox connection
information, the `id` of your div where it'll be creating the map, and the
coordinates of where you'd like the map to render on pageload. (Your
startPoint.)

Here's how your start Cartographer in your JS controller:

```javascript
Wee.Cartographer.init({
	startPoint: [35.92, -86.87],
	startZoom: 13,
	id: 'map',
	accessToken: 'myAccessToken'
	projectId: 'myProjectId'
});
```

And here's a rundown of the options:

| Option        | Type           | Explanation  |
|:-------------:|:-------------:| -----|
| startPoint      | *object* | The coordinates of the starting center point of the map. |
| startZoom      | *int* | The default zoom level of the map. |
| id      | *string* | The `id` of the `div` where you'd like the map to appear. |
| accessToken      | *string* | Your Mapbox access token. |
| projectId      | *string* | The ID of your Mapbox project. |


## Cartographer's Features

Cartographer has most of the features you'll be looking for when creating maps.
Centering on coordinates, setting zoom levels, and adding features are all
possible in Cartographer. If you don't see something you'd like, open an issue
in this repo and let's talk about it. If it's a good idea, I'll build it into
Cartographer in the next release.