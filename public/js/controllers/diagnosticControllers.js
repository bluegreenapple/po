angular.module('diagnosticController', [])

	// inject the Duval service factory into our controller
	.controller('duvalController', ['$scope','Duval', function($scope, Duval) {
		$scope.loading = true;


		// CALCULATE DUVAL DIAGNOSTIC ===============================================
		$scope.analise;
		
		$scope.calculaDuval = function(analise) {

			$scope.duval_m = Duval.diagnostico2(analise);
		};
		
		$scope.calculaDuval_m = function(ch4,c2h2,c2h4) {

			$scope.duval_m = Duval.m(ch4,c2h2,c2h4);
		};
		$scope.calculaDuval_y = function(ch4,c2h2,c2h4) {

			$scope.duval_y = Duval.y(ch4,c2h2,c2h4);
		};
		$scope.calculaDuval_a = function(ch4,c2h2,c2h4) {

			$scope.duval_a = Duval.a(ch4,c2h2,c2h4);
		};
		$scope.calculaDuval_diagnostico = function(ch4,c2h2,c2h4) {

			$scope.duval_diagnostico = Duval.diagnostico(ch4,c2h2,c2h4);
		};
	}]);