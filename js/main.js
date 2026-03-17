mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

let map;
let scriptPanel = scrollama();
let restaurants;

const allRestaurantsLayer = {
  id: 'restaurants-all',
  type: 'circle',
  source: 'restaurants-src',
  paint: {
    'circle-radius': 6,
    'circle-color': '#e63946',
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
    style: 'mapbox://styles/mapbox/light-v10',
    center: [-122.2348, 47.3809],
    zoom: 10,
    pitch: 0
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
  const index = response.index;

  if (index === 0) {
    map.flyTo({
      center: [-122.2348, 47.3809],
      zoom: 10,
      pitch: 0,
      speed: 0.5
    });

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
      pitch: 25,
      speed: 0.5
    });

    if (!map.getLayer('restaurants-featured')) {
      map.addLayer(featuredLayer);
    }
  }
}

function handleSceneExit(response) {
  const index = response.index;

  if (index === 0) {
    if (response.direction === 'up') {
      document.getElementById('cover').style.visibility = 'visible';
    }
  }

  else if (index === 3) {
    if (map.getLayer('restaurants-featured')) {
      map.removeLayer('restaurants-featured');
    }
  }
}

adjustStoryboardSize();
initializeMap();
geojsonFetch();
