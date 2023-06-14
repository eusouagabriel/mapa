function initMap() {
  const urlParams = new URLSearchParams(window.location.search);
  const place = urlParams.get('place');
  console.log(place)

  var center_position = { lat: 0, lng: 0 };
  if (place === 'sp') {
    center_position = { lat: -23.5640732, lng: -46.6876096 };
  } else {
    center_position = { lat: -22.9666002, lng: -43.214805 };
  }
  
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13.07,
    center: center_position,
    minZoom: 12.6,
    maxZoom: 17,
  });
  
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
}

window.initMap = initMap;