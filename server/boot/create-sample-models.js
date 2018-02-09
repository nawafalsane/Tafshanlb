// Require Async lib
var async = require('async');

module.exports = function(app) {
  // Datasources for models
  var mongoDB = app.dataSources.mongoDB;
  var postgresDB = add.dataSources.postgeresDB;

  //Create the models
  async.parallel({
    user: async.apply(createUsers),
    post: async.apply(createPosts),
  }, function(err, results) {
    createReviews(results.user, results.post, function(err) {
     console.log('> models created sucessfully');
  });
});


  //create users
  function createUsers(cb) {
    mongoDB.automigrate('user', function(err) {
      if (err) return cb(err);
      var userModel = app.models.user;
      userModel.create([{
        email: 'foo@bar.com',
        password: 'foobar'
      }, {
        email: 'john@doe.com',
        password: 'johndoe'
      }, {
        email: 'jane@doe.com',
        password: 'janedoe'
      }], cb);
    });
  }

  //create Posts
  function createPosts(cb) {
    postgresDB.automigrate('post', function(err) {
      if (err) return cb(err);
      var postModel = app.models.post;
      postModel.create([{
        title: 'Test',
        description: 'Test description'
      }, {
      title: 'Secondary Test',
      description: 'Secondary Test description'
    }, ], cb);
    });
  }

  //create reviews
  function createReviews(user, post, cb) {
    mongoDs.automigrate('review', function(err) {
      if (err) return cb(err);
      var reviewModel = app.models.review;
      var DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
      reviewModel.create([{
        date: Date.now() - (DAY_IN_MILLISECONDS * 4),
        rating: 5,
        comments: 'A very good coffee shop.',
        publisherId: user[0].id,
        coffeeShopId: post[0].id,
      }, {
        date: Date.now() - (DAY_IN_MILLISECONDS * 3),
        rating: 5,
        comments: 'Quite pleasant.',
        publisherId: user[1].id,
        coffeeShopId: post[0].id,
      }, {
        date: Date.now() - (DAY_IN_MILLISECONDS * 2),
        rating: 4,
        comments: 'It was ok.',
        publisherId: user[1].id,
        coffeeShopId: post[1].id,
      }, {
        date: Date.now() - (DAY_IN_MILLISECONDS),
        rating: 4,
        comments: 'I go here everyday.',
        publisherId: user[2].id,
        coffeeShopId: post[2].id,
      }], cb);
    });
  }
};
