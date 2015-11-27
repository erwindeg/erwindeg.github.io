var app = angular.module('app', ['ngResource','ngTouch','ngAnimate'], function($locationProvider) {
      $locationProvider.html5Mode({
                                               enabled: true,
                                               requireBase: false
                                               });
    });
 
 
app.controller('mainCtrl',function($window, $scope){
        $scope.scrollPos = 0;
 
        $window.onscroll = function(){
            $scope.scrollPos = document.body.scrollTop || document.documentElement.scrollTop || 0;
            $scope.$apply(); //or simply $scope.$digest();
        };
    });
               
app.controller('workCtrl',function($window, $scope, $resource,$location){
	var content = $resource('content/work.json').query(function(){
		$scope.contentItems = content;
		$scope.page = $location.search().page;
        if(($scope.page  !== undefined) && $scope.page > 0 && $scope.page <= content.length){
			$scope.index = $scope.page-1;
			} else {
            $scope.index = 0;
            }

			//$scope.contentItem = content[$scope.index];
			content[$scope.index].visible = true;
			$scope.next = function(){
			content[$scope.index].visible = false;
			if($scope.index < content.length-1){
				
            	$scope.index = $scope.index+1;
            	} else {
                $scope.index = 0;
                }
                //$scope.contentItem = content[$scope.index];
				content[$scope.index].visible = true;
                }

				$scope.prev = function(){
					content[$scope.index].visible = false;
					if($scope.index > 0){
						$scope.index = $scope.index-1;
                        } else {
                        $scope.index = 0;
                        }
                        //$scope.contentItem = content[$scope.index];
						content[$scope.index].visible = true;
                        }
		});
});

$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - 100
        }, 1000);
        return false;
      }
    }
  });
});

$(window).resize(function() {
	if(window.innerHeight > 650 ) {
  		$('#home').css('height', window.innerHeight+'px'); 
 		} else {
  			$('#home').css('height','650px'); 
  			
 	}
});
