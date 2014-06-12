'use strict';

module.exports = function(app) {
  app.controller('NewNotesController', function($scope, $http, $location, $log) {
    $scope.note = {'noteBody' : ''};
    $scope.saveNote = function() {
      $http.post('/api/v1/notes', $scope.note)
        .success(function(data, status, headers, config) {
          $location.path('/notes')
        })
        .error(function(data) {
          $log.warn(data);
        });
    };
  });
};
