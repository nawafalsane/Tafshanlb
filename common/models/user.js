'use strict';

module.exports = function(User) {
  User.beforeRemote('create', function(context, user, next) {
    context.args.data.date = Date.now();
    context.args.data.publisherId = context.req.accessToken.userId;
    next();
  });
};
