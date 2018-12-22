const mongoose = require('mongoose');

before(done => {
  mongoose.connect(
    'mongodb://localhost/vuber_test',
    { useNewUrlParser: true }
  );
  mongoose.connection
    .once('open', () => {
      console.log('Connected for the Test');
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
    .then(() => done())
    .catch(() => done());
});
