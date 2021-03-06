const assert = require('assert');
const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const Driver = mongoose.model('driver');

describe('Drivers controllers', () => {
  // it('Post request to api/drivers creates new driver', done => {
  //   Driver.countDocuments().then(count => {
  //     request(app)
  //       .post('/api/drivers')
  //       .send({ email: 'ivan@ivsn.com' })
  //       .end(() => {
  //         Driver.countDocuments().then(newCount => {
  //           assert(count + 1 === newCount);
  //           done();
  //         });
  //       });
  //   });
  // });
  // it('Put to /api/drivers/id can update a record', done => {
  //   const driver = new Driver({ email: 'test@test.com', driving: false });

  //   driver.save().then(() => {
  //     request(app)
  //       .put(`/api/drivers/${driver._id}`)
  //       .send({ driving: true })
  //       .end(() => {
  //         Driver.findOne({ email: 'test@test.com' }).then(driver => {
  //           // console.log(`New Driver Email: ${driver}`);
  //           assert(driver.driving === true);
  //           done();
  //         });
  //       });
  //   });
  // });
  // it('DELETE request to api/drivers can remove driver', done => {
  //   const driver = new Driver({ email: 'test@t.com' });
  //   driver.save().then(() => {
  //     request(app)
  //       .delete(`/api/drivers/${driver._id}`)
  //       .end(() => {
  //         Driver.findOne({ _id: driver._id }).then(driver => {
  //           // console.log(driver);
  //           assert(driver === null);
  //           done();
  //         });
  //       });
  //   });
  // });

  it('Get to /api/drivers finds drivers in a location', done => {
    const seattleDriver = new Driver({
      email: 'seattle@test.com',
      geometry: { coordinates: [-122.4759902, 47.6147628] }
    });
    const miamiDriver = new Driver({
      email: 'miami@test.com',
      geometry: { coordinates: [-80.78, 25.56] }
    });

    Promise.all([seattleDriver.save(), miamiDriver.save()]).then(() => {
      request(app)
        .get('/api/drivers?lng=-80&lat=25')
        .end((err, res) => {
          console.log(res.body);
          assert(res.body.length === 1);
          assert(res.body[0].email === 'miami@test.com');
          done();
        });
    });
  });
});
