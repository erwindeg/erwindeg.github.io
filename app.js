var app = angular.module('app', ['ngRoute', 'ngAnimate']);

app.config(function($routeProvider) {
    $routeProvider
    	.when('/', {
			templateUrl: 'home.html',
			controller: 'MainCtrl',
			redirectTo: '/1'
		  })
		.when('/:page', {
			templateUrl: 'home.html',
			controller: 'MainCtrl',
		});

});

app.controller('MainCtrl', function($scope,$routeParams,$location,$rootScope) {
	$scope.page = $routeParams.page;
	$scope.next = function() {
		$rootScope.pageClass = 'page-content-rtl';
		var index = $routeParams.page*1+1;
		if(index > 5){
			index = 1;
		}
	
		$location.path('/'+(index));
	}
	
	$scope.back = function() {
		$rootScope.pageClass = 'page-content-ltr';
		var index = $routeParams.page*1-1;
		if(index < 1){
			index = 5;
		}
	
		$location.path('/'+(index));
	}
});