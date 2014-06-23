'use strict';

module.exports = function(app) {
  app.controller('NotesController', function($scope, $http, $cookies) {
    $http.defaults.headers.common['jwt'] = $cookies.jwt;
    $http({
      method: 'GET',
      url: '/api/v1/notes'
    }).success(function(data, status, headers, config) {
      $scope.notes = data;
    }).error(function(data, status, headers, config) {
      console.log(data);
    });
  });
};
