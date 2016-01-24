var app = angular.module('app', ['ngResource','ngAnimate', 'pascalprecht.translate']).config(function($translateProvider) {
	$translateProvider.useStaticFilesLoader({
		prefix: '/languages/',
	    suffix: '.json'
	});
	$translateProvider.preferredLanguage('nl');
	$translateProvider.useSanitizeValueStrategy('escape');
});

app.controller('mainController', function($scope,$resource) {
    $scope.content = $resource('content/content.json').query();
});

app.controller('viewController', function($scope,$document) {
	 $document.ready(function () {
		$scope.show = true;
		$scope.$apply();
	});
});

app.controller('translateController', function($translate, $scope, $rootScope) {
  $scope.changeLanguage = function (langKey) {
    $translate.use(langKey);
	$rootScope.key = langKey;
  };
  $rootScope.key = $translate.proposedLanguage() || $translate.use();
});