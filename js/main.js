mapboxgl.accessToken = 'pk.eyJ1IjoibWVyb253YiIsImEiOiJjbWt5eXZtZmIwZTRiM2RuM2NmMW51NTJsIn0.Ed7Mtil9vLyQb-7MMOBfiQ';

let map;
let scriptPanel = scrollama();
let restaurants;

const allRestaurantsLayer = {
  id: 'restaurants-all',
  type: 'circle',
  source: 'restaurants-src',
  paint: {
    'circle-radius': 6,
    'circle-color': '#d62828',
    'circle-stroke-width': 1,
    'circle-stroke-color': '#ffffff'
  }
};

const cuisineLayer = {
  id: 'restaurants-cuisine',
  type: 'circle',
  source: 'restaurants-src',
  paint: {
    'circle-radius': 7,
    'circle-stroke-width': 1,
    'circle-stroke-color': '#ffffff',
    'circle-color': [
      'match',
      ['get', 'cuisine'],
      'Ethiopian', '#8d5524',
      'Mexican', '#2a9d8f',
      'Vietnamese', '#457b9d',
      'American', '#e76f51',
      'Dessert', '#ff70a6',
      '#6c757d'
    ]
  }
};

const featuredLayer = {
  id: 'restaurants-featured',
  type: 'circle',
  source: 'restaurants-src',
  filter: ['==', ['get', 'featured'], 'yes'],
  paint: {
    'circle-radius': 10,
    'circle-color': '#ffb703',
    'circle-stroke-width': 2,
    'circle-stroke-color': '#ffffff'
  }
};

function adjustStoryboardSize() {
  const scenes = document.querySelectorAll('.scene');
  scenes.forEach(scene => {
    scene.style.minHeight = '100vh';
  });
}

function initializeMap() {
  map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v10',
  center: [-122.2348, 47.3809],
  zoom: 10
});

  map.addControl(new mapboxgl.NavigationControl(), 'top-right');
}

async function geojsonFetch() {
  const response = await fetch('data/restaurants.geojson');
  restaurants = await response.json();

  map.on('load', () => {
    map.addSource('restaurants-src', {
      type: 'geojson',
      data: restaurants
    });

    scriptPanel
      .setup({
        step: '.scene',
        offset: 0.33,
        debug: false
      })
      .onStepEnter(handleSceneEnter)
      .onStepExit(handleSceneExit);

    window.addEventListener('resize', () => {
      adjustStoryboardSize();
      scriptPanel.resize();
    });
  });
}

function handleSceneEnter(response) {
  var index = response.index;

  if (index === 0) {
    map.flyTo({
      center: [-122.2348, 47.3809],
      zoom: 10
    });
  }

  if (index === 1) {
    map.flyTo({
      center: [-122.2348, 47.3809],
      zoom: 12
    });
  }

  if (index === 2) {
    map.flyTo({
      center: [-122.2400, 47.3700],
      zoom: 14
    });
  }
}

    if (!map.getLayer('restaurants-all')) {
      map.addLayer(allRestaurantsLayer);
    }

    document.getElementById('cover').style.visibility = 'hidden';
  }

  else if (index === 1) {
    map.flyTo({
      center: [-122.2348, 47.3809],
      zoom: 11,
      pitch: 0,
      speed: 0.5
    });

    if (map.getLayer('restaurants-all')) {
      map.removeLayer('restaurants-all');
    }

    if (!map.getLayer('restaurants-cuisine')) {
      map.addLayer(cuisineLayer);
    }
  }

  else if (index === 2) {
    map.flyTo({
      center: [-122.225, 47.39],
      zoom: 12,
      pitch: 20,
      speed: 0.5
    });
  }

  else if (index === 3) {
    map.flyTo({
      center: [-122.234, 47.382],
      zoom: 12.5,
      pitch: 35,
      speed: 0.5
    });

    if (!map.getLayer('restaurants-featured')) {
      map.addLayer(featuredLayer);
    }
  }

  else if (index === 4) {
    map.flyTo({
      center: [-122.239, 47.384],
      zoom: 13,
      pitch: 0,
      speed: 0.5
    });
  }
}

function handleSceneExit(response) {
  const index = response.index;

  if (index === 0 && response.direction === 'up') {
    document.getElementById('cover').style.visibility = 'visible';
  }

  if (index === 3 && map.getLayer('restaurants-featured')) {
    map.removeLayer('restaurants-featured');
  }
}

adjustStoryboardSize();
initializeMap();
geojsonFetch();
