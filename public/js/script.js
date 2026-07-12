console.log('script.js loading');
const socket=io();
 if(navigator.geolocation){
    navigator.geolocation.watchPosition((position)=>{
        const lat= position.coords.latitude;
        const long= position.coords.longitude;
        socket.emit('sendLocation',{lat,long});
    }, (error) => {
        console.error('Error occurred while fetching location:', error);
    },{
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000
    }
);
}

const map = L.map("map").setView([0, 0], 20);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const markers={};

socket.on('locationUpdate', (data) => {
    const {id, lat, long} = data;
    console.log('locationUpdate', data);
    map.setView([lat, long], 18);
    if(markers[id]){
        markers[id].setLatLng([lat, long]);
    } else{
        markers[id] = L.marker([lat, long]).addTo(map);
    }
});

socket.on('userDisconnected', (id) => {
    if(markers[id]){
        map.removeLayer(markers[id]);
        delete markers[id];
    }
}); 
