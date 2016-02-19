var app = angular.module('app', ['ngResource','ngAnimate','ngRoute', 'pascalprecht.translate', 'yaru22.md']).config(function($translateProvider, $routeProvider, $locationProvider) {
	$routeProvider
    	.when('/', {
    		templateUrl: 'home.html',
            controller: ''
    	})
		.when('/home', {
    		templateUrl: 'home.html',
            controller: ''
    	})
		.when('/blog/:id', {
    		templateUrl: 'blog.html',
            controller: ''
    	})
		.when('/404', {
			redirectTo: function(){
				window.location = "/404.html";
			}
		})
		.otherwise({
			redirectTo: '/'
		});

  $locationProvider.html5Mode(true);
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
		$scope.$apply();
	};
});

app.controller('translateController', function($translate, $scope, $rootScope) {
  $scope.changeLanguage = function (langKey) {
    $translate.use(langKey);
	$rootScope.key = langKey;
  };
  $rootScope.key = $translate.proposedLanguage() || $translate.use();
});

app.controller('blogController', function($scope,$routeParams,$location,$http,$window){
	$http.get('content/'+$routeParams.id+'.md').then(function(data) {
		$scope.text = data.data;
	},function(error){
		$location.url('/404');
	});	
	
	$scope.scrollPos = 0;
	$window.onscroll = function(){
		$scope.scrollPos = document.body.scrollTop || document.documentElement.scrollTop || 0;
		$scope.$apply();
	};
});

app.controller('gaController', function($scope, $location, $window) {
  $scope.$on('$viewContentLoaded', function(event) {
	$window.ga('send', 'pageview', { page: $location.url() });
  });
});

app.directive( 'elemReady', function( $parse ) {
   return {
       restrict: 'A',
       link: function( $scope, elem, attrs ) {    
          elem.ready(function(){
            $scope.$apply(function(){
                var func = $parse(attrs.elemReady);
                func($scope);
            })
          })
       }
    }
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

app.directive('animateOnLoad',['$animateCss', function($animateCss) {
  return {
    'link': function(scope, element) {
      $animateCss(element, {
          'event': 'enter',
           structural: true
      }).start();
    }
  };
}]);

$(function() { $('a[href*=#]:not([href=#])').click(function() { if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) { var target = $(this.hash); target = target.length ? target : $('[name=' + this.hash.slice(1) +']'); if (target.length) { $('html,body').animate({ scrollTop: target.offset().top - 100 }, 700); return false; } } });});
