var app = angular.module('app', ['ngResource', 'pascalprecht.translate']).config(function($translateProvider) {
	$translateProvider.useStaticFilesLoader({
		prefix: '/languages/',
	    suffix: '.json'
	});
	$translateProvider.preferredLanguage('nl');
	$translateProvider.useSanitizeValueStrategy('escape');
});

app.controller('mainController', function($translate,$scope,$resource,$rootScope) {
    $scope.content = $resource('content/content.json').query();
});

app.controller('translateController', function($translate, $scope, $rootScope) {
  $scope.changeLanguage = function (langKey) {
    $translate.use(langKey);
	$rootScope.key = langKey;
  };
  $rootScope.key = $translate.proposedLanguage() || $translate.use();
});