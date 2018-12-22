const Driver = require('../models/drivers');

module.exports = {
  greeting(req, res) {
    res.send({ hi: 'there' });
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
      .then(driver => res.send(driver))
      .catch(next);
  }
};
