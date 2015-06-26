angular.module('diagnosticControllers', [])

	// inject the Duval service factory into our controller
	.controller('duvalController', ['$scope','Duval', function($scope, Duval) {
		$scope.loading = true;


		// CALCULATE DUVAL DIAGNOSTIC ===============================================
		$scope.duval = '';
		
		$scope.calculaDuval = function(ch4,c2h2,c2h4) {

			$scope.duval = Duval.m(ch4,c2h2,c2h4);
			
		};
	}]);