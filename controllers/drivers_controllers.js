const Driver = require('../models/drivers');

module.exports = {
  greeting(req, res) {
    res.send({ hi: 'there' });
  },

  index(req, res, next) {
    const { lng, lat } = req.query;

    Driver.aggregate([
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          spherical: true,
          maxDistance: 200000,
          distanceField: 'dist.calculated'
        }
      }
    ])
      .then(drivers => res.send(drivers))
      .catch(next);
  },

  create(req, res, next) {
    // console.log(req.body);
    const driverProps = req.body;
    Driver.create(driverProps)
      .then(driver => {
        res.send(driver);
      })
      .catch(next);
  },
  edit(req, res, next) {
    const driverId = req.params.id;
    const driverProps = req.body;

    Driver.findOneAndUpdate({ _id: driverId }, driverProps, { new: true })
      // .then(() => Driver.findOne({ _id: driverId }))
      .then(driver => res.send(driver))
      .catch(er => {
        console.log("********Wow********It's an Error***  :  ", er);
        next();
      });
  },
  delete(req, res, next) {
    const driverId = req.params.id;

    Driver.findByIdAndRemove({ _id: driverId })
      .then(driver => res.status(204).send(driver))
      .catch(next);
  }
};
