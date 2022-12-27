{/* <script async defer
  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAqgZXdzQBgmeEb_2qniK2Js3abzYdIshg&callback=initMap"></script> */}

// navigator.geolocation.getCurrentPosition(
//   function () {
//     initMap(39.248898, -104.968567);
//   },
//   function errorCallback(error) {
//     console.log(error);
//   }
// );

// function initMap(lat, lng) {
//   var myLatLng = {
//     lat,
//     lng,
//   };
//   var map = new google.maps.Map(document.getElementById("map"), {
//     zoom: 15,
//     center: myLatLng,
//   });
//   var marker = new google.maps.Marker({
//     position: myLatLng,
//     map: map,
//   });
// }

isEmpty = obj => {
  return Object.keys(obj).length === 0;
}

getGeoLocation = (lat , lng) =>{
  console.log(`Latitude => ${lat} , Langitude => ${lng}`)
}

// function getLoc(lat , lng){
//   console.log(`Latitude => ${lat} , Langitude => ${lng}`)
// }


module.exports = {
  // initMap:initMap,
  isEmpty:isEmpty,
  getGeoLocation:getGeoLocation
}

// exports.newDate = newDate
// exports.newTime = newTime
// exports.placeFetch = placeFetch
// exports.isEmpty = isEmpty
// exports.newDateFormatted = newDateFormatted
// exports.newTimeFormatted = newTimeFormatted
// exports.placeFetchAll = placeFetchAll
// exports.isEmptyNew = isEmptyNew
