// Require Async lib
var async = require('async');

module.exports = function(app) {
  // Datasources for models
  let mongoDB = app.dataSources.mongoDB;
  let postgresDB = add.dataSources.postgeresDB;

  //Create the models
  async.parallel({
    user: async.apply(createUsers),
    post: async.apply(createPosts),
  }, function(err, results) {
    // createReviews(results.user, results.posts, function(err) {
    //  console.log('> models created sucessfully');
  })


  //create users
  function createUsers(cb) {
    mongoDs.automigrate('user', function(err) {
      if (err) return cb(err);
      var Reviewer = app.models.user;
      post.create([{
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
  function createPost(cb) {
    mysqlDs.automigrate('post', function(err) {
      if (err) return cb(err);
      var posts = app.models.post;
      user.create([{
        title: 'Test',
        description: 'Test description'
      }, {
      title: 'Secondary Test',
      description: 'Secondary Test description'
    }, ], cb);
    });
  }
  app.dataSources.postgresDB.automigrate('post', function(err){
    if (err) throw err;

    app.models.post.create([{
      title: 'Test',
      description: 'Test description'
    }, {
    title: 'Secondary Test',
    description: 'Secondary Test description'
    }], function(err, post) {
      if (err) throw err;

      console.log('Test model created\n', post);
    });
  });
};
