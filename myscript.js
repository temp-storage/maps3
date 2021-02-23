let markers = [];
let uniqueID = 1;

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 6,
    center: { lat: 64.9146659 , lng: 26.0672554 },
  });
  const geocoder = new google.maps.Geocoder();
  document.getElementById("submit").addEventListener("click", () => {
    geocodeAddress(geocoder, map);
  });

}


function geocodeAddress(geocoder, resultsMap) {
  const address = document.getElementById("address").value;
  geocoder.geocode({ address: address }, (results, status) => {
    if (status === "OK") {
      resultsMap.setCenter(results[0].geometry.location);
    const marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location,
				label: prompt("Location name?"),
				id: uniqueID
    
	  });
	  
	  markers.push(marker);
   	uniqueID = uniqueID++;
		
		
	  
	     const contentString =
		"<form>" +
         "Name:" + '<br>' + '<input type="text" name="name">' +
         '<br>' +
         "Phone Number:" + '<br>' + '<input type="text" name="subject">' +
         '<br>' +
         "Email Address:" + '<br>' + '<input type="text" name="rank">' +  '<br>' + '<br>' + 
		 '<input type="button" value="Delete" onclick="DeleteMarker(  '+marker.id+' )" />' +
		"</form>"
		
  const infowindow = new google.maps.InfoWindow({
    content: contentString,
  });

	  
  	marker.addListener("click", () => {
    infowindow.open(map, marker);
	});
	  
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });

}

function DeleteMarker(id) {
	for (let i = 0; i < markers.length; i++) {
		if (markers[i].id == id) {
			markers[i].setMap(null);
			markers.splice(i, 1);
		}
	}
}
