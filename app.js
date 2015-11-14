var app = angular.module('plunker', [
  'ngRoute',
  'ngAnimate',
  'ngTouch'
]);

app.run(function($rootScope, $window) {
  // publish current transition direction on rootScope
  $rootScope.direction = 'ltr';
  // listen change start events
  $rootScope.$on('$routeChangeStart', function(event, next, current) {
  //console.log(next);
    $rootScope.direction = 'rtl';
   // console.log(arguments);
    if (current && next && (current.params.page > next.params.page)) {
      $rootScope.direction = 'ltr';  
    }
    // back
   // $rootScope.back = function() {
     // $window.history.back();
    //}
  });
});

app.controller('MainCtrl', function($scope,$routeParams,$location) {
	$scope.page = $routeParams.page;
	$scope.next = function() {
		var index = $routeParams.page*1+1;
		if(index > 5){
			index = 5;
		}
	
		$location.path('/'+(index));
	}
	
	$scope.back = function() {
		var index = $routeParams.page*1-1;
		if(index < 1){
			index = 1;
		}
	
		$location.path('/'+(index));
	}
});

app.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'home.html',
	controller: 'MainCtrl',
    depth:1,
	redirectTo: '/1'
  }).when('/:page', {
    templateUrl: 'home.html',
    controller: 'MainCtrl',
	depth:2
  })
});