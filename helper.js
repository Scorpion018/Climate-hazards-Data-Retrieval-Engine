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

//  initMap=(lat, lng)=> {
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

// initMap=(lat, lng)=> {
//   var myLatLng = {
//     lat,
//     lng,
//   };
//   var div = document.createElement('div');
//   var map = new google.maps.Map(div.innerHTML, {
//     zoom: 15,
//     center: myLatLng,
//   });
//   var marker = new google.maps.Marker({
//     position: myLatLng,
//     map: map,
//   });
//   document.body.appendChild(div);
// }

isEmpty = obj => {
  return Object.keys(obj).length === 0;
}

getGeoLocation = (lat , lng , score) =>{
  // isWithinRange(lat , lng ,35.288092 , -80.777155 , range = 1000 , score)
  isWithinRange(lat , lng ,39.248898 , -104.968567 , range = 1000 , score)
}

// 7847 INCA RD

// let lat1 = 39.248898
// let lon1 = -104.968567
// let lat2 = 35.288092
// let lon2 = -80.777155
// isWithinRange=()=> {
//Haversine Formula
isWithinRange=(lat1, lon1, lat2, lon2, range , score)=> {
  let isInrange = ''
  let rangeName = ''
  const R = 6371e3; // earth's radius in meters
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  if(score <19){
    rangeName = 'Low'
  } else if( score < 39){
    rangeName = 'Significant'
  }else if( score < 59){
    rangeName = 'High'
  }else if( score < 79){
    rangeName = 'Very High'
  } else{
    rangeName = 'Extreme'
  }

if (distance < range) {
  isInrange = `Near the Hazard Area & Impact in that area is ${rangeName}`
} else {
  isInrange = `Far from Hazard Area & no effect`
}
  console.log( isInrange , distance)
  return distance;
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
