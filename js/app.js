var app = angular.module('app', ['ngResource','ngAnimate','ngRoute', 'pascalprecht.translate']).config(function($translateProvider, $routeProvider) {
	$routeProvider
    	.when('/', {
    		templateUrl: 'home.html',
            controller: ''
    	})
		.when('/home', {
    		templateUrl: 'home.html',
            controller: ''
    	})
		.when('/blog', {
    		templateUrl: 'blog.html',
            controller: ''
    	})
		.otherwise({
			redirectTo: '/'
		});


	$translateProvider.useStaticFilesLoader({
		prefix: '/languages/',
	    suffix: '.json'
	});
	$translateProvider.preferredLanguage('nl');
	$translateProvider.useSanitizeValueStrategy('escape');
});

app.controller('mainController', function($scope,$resource,$window) {
	$scope.content = $resource('content/content.json').query();
	$scope.scrollPos = 0;
 
	$window.onscroll = function(){
		$scope.scrollPos = document.body.scrollTop || document.documentElement.scrollTop || 0;
		$scope.$apply(); //or simply $scope.$digest();
	};
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

app.directive('scrollOnClick', function() {
  return {
    restrict: 'A',
    link: function(scope, $elm) {
      $elm.on('click', function() {
        $("body").animate({scrollTop: 0}, "slow");
      });
    }
  }
});