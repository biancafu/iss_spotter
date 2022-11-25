const request = require('request-promise-native');

const fetchMyIP = () => {
  // return new Promise((resolve, reject) => {
  //   request('https://api.ipify.org/?format=json', (error, response, body) => {
  //     if (error) {
  //       reject(error);
  //     }
  //     if (response.statusCode !== 200) {
  //       const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
  //       reject(Error(msg));
  //     }
  //     const data = JSON.parse(body);
  //     resolve(data);
  //   });
  // });
  return request('https://api.ipify.org/?format=json');
};

const fetchCoordsByIP = (body) => {
  const ip = JSON.parse(body).ip;
  return request(`http://ipwho.is/${ip}`);
};


const fetchISSFlyOverTimes = (coordinates) => {
  const coords = JSON.parse(coordinates);
  const {latitude, longitude} = coords;
  return request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`);
}

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(data => {
      const {response} = JSON.parse(data)
      //why wouldn't it work if I just return JSON.parse(data).response?
      return response
    });
}
module.exports = { nextISSTimesForMyLocation };