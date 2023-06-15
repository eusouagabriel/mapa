function initMap() {
  const urlParams = new URLSearchParams(window.location.search);
  const place = urlParams.get('place');

  var center_position = { lat: 0, lng: 0 };
  if (place && place === 'sp') {
    center_position = { lat: -23.5640732, lng: -46.6876096 };
  } else {
    center_position = { lat: -22.9666002, lng: -43.214805 };
  }

  const mapOptions = {
    zoom: 13.07,
    center: center_position,
    minZoom: 12.6,
    maxZoom: 18,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false,
    streetViewControl: false,
  };
  
  const map = new google.maps.Map(document.getElementById("map"), mapOptions);
  
  // Load the JSON file
  fetch('locations.fixed.json')
    .then(response => response.json())
    .then(locations => {
      locations.forEach(location => {
        if (location.lat == null || location.lng == null) return;
        const marker = new google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: map,
          icon: {
            url: 'pin.png',
            scaledSize: new google.maps.Size(45, 45),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(25, 50)
          },
        });
      });
    })
    .catch(error => console.error('Error loading JSON:', error));

  const autocompleteInput = document.getElementById('autocomplete');
  const autocomplete = new google.maps.places.Autocomplete(autocompleteInput);
  const marker = new google.maps.Marker({ map });
  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();
    if (place.geometry && place.geometry.location) {
      map.setCenter(place.geometry.location);
      map.setZoom(mapOptions.maxZoom);
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);
    }
  });
}

window.initMap = initMap;