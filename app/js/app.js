require('angular/angular');
require('angular-route');
require('angular-resource');

var notesApp = angular.module('notesApp', ['ngRoute']);

require('./controllers/notesController')(notesApp);
require('./controllers/newNotesController')(notesApp);

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
    .otherwise({
      redirectTo: '/notes'
    });
}]);

