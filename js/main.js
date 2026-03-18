mapboxgl.accessToken = 'pk.eyJ1IjoibWVyb253YiIsImEiOiJjbWt5eXZtZmIwZTRiM2RuM2NmMW51NTJsIn0.Ed7Mtil9vLyQb-7MMOBfiQ';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v10',
  center: [-122.2348, 47.3809],
  zoom: 11
});

const scroller = scrollama();

map.on('load', () => {

  // ADD RESTAURANTS
  map.addSource('restaurants', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-122.239, 47.382]
          }
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-122.230, 47.378]
          }
        }
      ]
    }
  });

  map.addLayer({
    id: 'restaurants',
    type: 'circle',
    source: 'restaurants',
    paint: {
      'circle-radius': 6,
      'circle-color': '#ff4d4d'
    }
  });

  scroller
    .setup({
      step: ".scene",
      offset: 0.5
    })
    .onStepEnter((response) => {

      if (response.index === 0) {
        map.flyTo({ center: [-122.2348, 47.3809], zoom: 10 });
      }

      if (response.index === 1) {
        map.flyTo({ center: [-122.2348, 47.3809], zoom: 12 });
      }

      if (response.index === 2) {
        map.flyTo({ center: [-122.239, 47.382], zoom: 14 });
      }

    });

});
