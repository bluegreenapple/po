angular.module('ui.bootstrap.demo', ['ui.bootstrap'])


	.controller('TabsDemoCtrl', function ($scope, $window) {
	  $scope.tabs = [
	    { title:'Doble', content:'Under Construction' },
	    { title:'Iec 60599', content:'Under Construction'},
	    { title:'Laborelec', content:'Under Construction'},
	    { title:'Pugh', content:'Under Construction'},
	    { title:'Rogers', content:'Under Construction'},
	    { title:'Duval', content:'Under Construction'},
	    { title:'Dornemburg', content:'Under Construction'},
	  ];

	});