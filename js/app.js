var app = angular.module('app', ['ngResource']);

app.controller('mainController', function($scope,$resource) {
    $scope.content = $resource('content/content.json').query();
});