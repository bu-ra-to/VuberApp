const mongoose = require('mongoose');

before(done => {
  mongoose.connect(
    'mongodb://localhost/vuber_test',
    { useNewUrlParser: true }
  );
  mongoose.connection
    .once('open', () => {
      done();
    })
    .on('error', error => {
      console.warn('***Unspeacable Error Happened******', error);
    });
});

beforeEach(done => {
  const { drivers } = mongoose.connection.collections;
  drivers
    .drop()
    .then(() => drivers.createIndex({ 'geometry.coordinates': '2dsphere' }))
    .then(() => done())
    .catch(() => done());
});
