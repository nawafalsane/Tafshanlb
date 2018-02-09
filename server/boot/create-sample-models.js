module.exports = function(app) {

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
