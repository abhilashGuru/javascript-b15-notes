// lib/jwtAuth.js
'use strict';

var User = require('../models/User');
var jwt  = require('jwt-simple');

module.exports = function(app) {
  var jwtauth = {};
  jwtauth.auth = function(req, res, next) {
    var token = req.body.jwt_token;

    if (token) {
      try {
        var decoded = jwt.decode(token, app.get('jwtTokenSecret'));
        User.findOne({'_id': decoded.iss}, function(err, user) {
          if(err) { return res.send(500,err); }
          req.user = user;
          return next();
        });
      } catch(err) {
        return res.send(500);
        // log the error...
      }
    } else {
      return res.send(401, {'msg': 'no access token found.'});
    }
  };
  return jwtauth;
};
