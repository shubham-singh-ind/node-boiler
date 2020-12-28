// * INITIALIZE MAP
// const { maplat=22.5, maplong=22.6 } = fetchLatLong();
// console.log(": ---------------")
// console.log("maplong", maplong)
// console.log(": ---------------")
// console.log(": -------------")
// console.log("maplat", maplat)
// console.log(": -------------")
// var mymap = L.map("mymap").setView([maplat, maplong], 1.5);
// console.log(": -----------")
// console.log("mymap", mymap)
// console.log(": -----------")
// // * \INITIALIZE MAP

// L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//   maxZoom: 18,
//   attribution: 
//     "&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors",
//   tileSize: 512,
//   zoomOffset: -1,
// }).addTo(mymap);

// var LeafIcon = L.Icon.extend({
//   options: {
//     shadowUrl: '/img/mapMarkers/male.png',
//     iconSize:     [20, 20],
//     shadowSize:   [30, 30],
//     iconAnchor:   [22, 94],
//     shadowAnchor: [4, 62],
//     popupAnchor:  [-3, -76]
//   }
// });

// var maleIcon = new LeafIcon({iconUrl: '/img/mapMarkers/male.png'});
// var femaleIcon = new LeafIcon({iconUrl: '/img/mapMarkers/female.png'});
// var noGenderIcon = new LeafIcon({iconUrl: '/img/mapMarkers/nogender.png'});

// // * CREATE LOCATION ALL MARKS, GET TOTAL USERS

// const createMarkers = () => {
//   fetchUsers().then((mydata) => {
//     const data = mydata.data; 
//     for (d of data) {
//       let icon = noGenderIcon;
//       if(d.gender==1) {
//         icon = maleIcon;
//       }else if(d.gender==2){
//         icon = femaleIcon;
//       }
//       marker = L.marker([d.lat, d.lon], {icon}).addTo(mymap);
      
//       // getUserAddressBy(d.lat, d.lon, (err, address) => {
//       //   marker.bindPopup(address);
//       // });
//       marker.on("click", () => {
//         checkLoginStatus().then((data) => {
//           if (!data) document.location.href = "login";
//         });
//       });
//     }
//   });
// };
// createMarkers();
let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("mymap"), {
    center: {
      lat: 22.9734,
      lng: 78.6569,
    },
    zoom: 2,
  });

  // Creating markers
    fetchUsers().then((mydata) => {
    const data = mydata.data; 
    for (d of data) {
      // let icon = noGenderIcon;
      // if(d.gender==1) {
      //   icon = maleIcon;
      // }else if(d.gender==2){
      //   icon = femaleIcon;
      // }
      marker = new google.maps.Marker({position: {lat: d.lat, lng: d.lon}, map: map});
      
      // getUserAddressBy(d.lat, d.lon, (err, address) => {
      //   marker.bindPopup(address);
      // });
      // marker.addListener("click", () => {
      //   checkLoginStatus().then((data) => {
      //     if (!data) document.location.href = "login";
      //   });
      // });
    }
  });

  // map.addListener('click', () => {
  //   checkLoginStatus().then((data) => {
  //     if (!data) document.location.href = "login";
  //   });
  // })
}
// * CREATE LOCATION ALL MARKS, GET TOTAL USERS
