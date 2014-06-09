'use strict';

var User = require('../models/User');

module.exports = function(app, passport) {
  app.post('/api/v1/users', function(req, res) {
    User.findOne({'basic.email': req.body.email}, function(err, user) {
      if(err) { return res.send(500, err); }

      if(user) {
        return res.send(409,
          {'msg': 'Conflict: Anuser with that email already exists'}
        );
      }

      var newUser = new User({});
      newUser.basic.email = req.body.email;
      newUser.basic.password = newUser.generateHash(req.body.password);

      newUser.save(function(err, resNewUser) {
        if(err) { return res.send(500, err); }
        res.send(resNewUser);
      });
    });
  });

  app.get('/api/v1/users',
    passport.authenticate('basic', {session: false}),
    function(req, res) { res.json(req.user); }
  );
};
