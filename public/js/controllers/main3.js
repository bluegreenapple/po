var appDiag = angular.module('appDiag', ['ui.bootstrap']);


appDiag.controller('TabsDemoCtrl', function ($scope, $window) {
	// $scope.curAnalise;
	// $scope.formData = {};
	$scope.createAnalise = function() {
		alert('I submit1');
		
	};
});


appDiag.controller('DuvalController', function ($scope, $window) {

	// $scope.m = 0;
	// $scope.y = 0;
	// $scope.a = 0;
	// $scope.diagnosticoDuval = '';

	$scope.createAnalise = function() {
		alert('I submit222');
		// $scope.a = 2;//Duval.a($scope.ch4,$scope.c2h2,$scope.c2h4);
	};

	

	// $scope.calcular = function($scope) {
	// 	alert('I submit');
	// 	$scope.m = Duval.m($scope.ch4,$scope.c2h2,$scope.c2h4);
	// 	$scope.y = Duval.y($scope.ch4,$scope.c2h2,$scope.c2h4);
	// 	$scope.a = Duval.a($scope.ch4,$scope.c2h2,$scope.c2h4);
	// 	$scope.diagnosticoDuval = Duval.diagnostico($scope.ch4,$scope.c2h2,$scope.c2h4);
	// };
});


// // inject the Duval service factory into our controller
// // module.controller('DuvalController', ['$scope','Duval', function($scope, Duval) {
// appDiag.controller('DuvalController', ['$scope', function($scope) {
// 		// $scope.loading = true;


// 		// CALCULATE DUVAL DIAGNOSTIC ===============================================
// 		// $scope.analise;
		
		


// 		$scope.createAnalise2 = function() {
// 			alert('I submit');
			
// 		};
// 		// $scope.calculaDuval2 = function(analise) {

// 		// 	$scope.duval_m = Duval.diagnostico2(analise);
// 		// };
		
// 		// $scope.calculaDuval_m = function(ch4,c2h2,c2h4) {

// 		// 	$scope.duval_m = Duval.m(ch4,c2h2,c2h4);
// 		// };
// 		// $scope.calculaDuval_y = function(ch4,c2h2,c2h4) {

// 		// 	$scope.duval_y = Duval.y(ch4,c2h2,c2h4);
// 		// };
// 		// $scope.calculaDuval_a = function(ch4,c2h2,c2h4) {

// 		// 	$scope.duval_a = Duval.a(ch4,c2h2,c2h4);
// 		// };
// 		// $scope.calculaDuval = function(ch4,c2h2,c2h4) {

// 		// 	$scope.duval_diagnostico = Duval.diagnostico(ch4,c2h2,c2h4);
// 		// };

// 		// $scope.calculaDuval1 = function($scope) {

// 		// 	alert("2dddd");
// 		// 	$scope.diagnosticoDuval = Duval.diagnostico($scope.ch4,$scope.c2h2,$scope.c2h4);
// 		// };
// 		// $scope.calculam1 = function($scope) {

// 		// 	$scope.diagnosticoDuval = Duval.m($scope.ch4,$scope.c2h2,$scope.c2h4);
// 		// };
// 		// $scope.calculay1 = function($scope) {

// 		// 	$scope.diagnosticoDuval = Duval.y($scope.ch4,$scope.c2h2,$scope.c2h4);
// 		// };
		


// 	}]);


