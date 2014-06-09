'use strict';
var Note = require('../models/Note');

module.exports = function(app, passport) {

  app.get('/api/v1/notes', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    Note.find({}, function(err, notes) {
      if(err) {
        res.send(500, {error: err});
        return false;
      }
      res.send(notes);
    });
  });

  app.get('/api/v1/notes/:id',
    passport.authenticate('basic', {session: false}),
    function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    Note.findOne({'_id': req.params.id}, function(err, note) {
      if(err) {
        res.send(500, {error: err});
        return false;
      }
      res.send(note);
    });
  });

create = function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  var note = new Note({noteBody: req.body.noteBody});
  note.save(function(err, resNote) {
    if(err) {
      res.send(500, {error: err});
      return false;
    }
    res.send(resNote);
  });
};

update = function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  var id = req.params.id;
  delete req.body._id;

  Note.findOneAndUpdate({'_id' : id}, req.body, function(err, note) {
    if (err) {
      res.send(500, {error: err});
    } else {
      res.send(note);
    }
  });
};

destroy = function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  Note.remove({'_id' : req.params.id}, function(err) {
    if(err) {
      res.send(500, {error: err});
      return false;
    }
    res.send({'message' : 'success!'});
  });
};
};
