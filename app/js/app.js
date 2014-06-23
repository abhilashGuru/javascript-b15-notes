require('angular/angular');
require('angular-route');
require('angular-resource');
require('angular-base64');
require('angular-cookies');

var notesApp = angular.module('notesApp', ['ngRoute', 'base64', 'ngCookies']);

require('./controllers/notesController')(notesApp);
require('./controllers/newNotesController')(notesApp);
require('./controllers/signInController')(notesApp);

notesApp.config(['$routeProvider', function($routeProvider) {
$routeProvider
  .when('/notes', {
    templateUrl: 'views/notes.html',
    controller: 'NotesController'
  })
  .when('/notes/new', {
    templateUrl: 'views/newNote.html',
    controller: 'NewNotesController'
  })
  .when('/signin', {
    templateUrl: 'views/signIn.html',
    controller: 'SignInController'
  })
  .otherwise({
    redirectTo: '/signin'
  });
}]);

