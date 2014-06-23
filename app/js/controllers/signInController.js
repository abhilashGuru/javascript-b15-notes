module.exports = function(app) {
  app.controller('SignInController', function($scope, $http, $base64, $cookies, $location, $log) {
    $scope.signIn = function() {
      $http.defaults.headers.common['Authorization'] = 'Basic ' + $base64.encode($scope.user.email + ':' + $scope.user.password);
      $http({
        method: "GET",
        url: '/api/v1/users',
        data: {}
      }).success(function(data) {
        $cookies.jwt = data.jwt;
        $location.path('/notes');
      }).error(function(data) {
        console.log(data);
      });
    } 
  });
}
