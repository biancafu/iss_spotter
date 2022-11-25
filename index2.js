const { nextISSTimesForMyLocation } = require('./iss_promised');

nextISSTimesForMyLocation()
  .then(data => {
    for(const pass of data) {
      const datetime = new Date(0);
      datetime.setUTCSeconds(pass.risetime);
      console.log(`Next pass at ${datetime} for ${pass.duration} seconds!`);
    }
  })
  .catch(err => console.log("It didn't work. " + err.message));
