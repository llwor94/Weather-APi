const express = require('express');
const cors = require('cors');
const axios = require('axios');

const server = express();

server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  res.send('ya made it mon');
});

const URL = 'https://api.darksky.net/forecast/9a3d59d0aa28de9b80d42982e4546243';
const gURL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
server.post('/location', async (req, res) => {
  let { latitude, longitude } = req.body;
  try {
    let weather = await axios.get(`${URL}/${latitude},${longitude}`);
    let location = await axios.get(
      `${gURL}${latitude},${longitude}&key=AIzaSyCJADyuaUwpH25bQbLBeL5IXR0TrC8xFsA`,
    );

    weather = weather.data.currently;
    city = location.data.results[0].address_components[3].long_name;
    state = location.data.results[0].address_components[5].short_name;
    console.log(weather, city, state);
  } catch (err) {
    console.log(err);
  }
});

const port = process.env.PORT || 3600;
server.listen(port, () => {
  console.log(`\n=== Server listening on port ${port}\n`);
});
