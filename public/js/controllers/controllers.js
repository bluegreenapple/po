var app = angular.module('appDiag', ['ui.bootstrap','diagnosticosServices']);

app.controller('DuvalController', ['$scope','DuvalService' ,function ($scope, DuvalService) {
    $scope.formData = {
        ch4: 0,
        c2h2: 0,
        c2h4: 0
    };
    $scope.m = 0;
    $scope.a = 0;
    $scope.y = 0;
    $scope.diagnostico = '';
    $scope.calculaM = function() {
        alert('I submit1');
        $scope.m = DuvalService.m($scope.formData.ch4, $scope.formData.c2h2, $scope.formData.c2h4);
        $scope.a = DuvalService.a($scope.formData.ch4, $scope.formData.c2h2, $scope.formData.c2h4);
        $scope.y = DuvalService.y($scope.formData.ch4, $scope.formData.c2h2, $scope.formData.c2h4);
        $scope.diagnostico = DuvalService.diagnostico($scope.formData.ch4, $scope.formData.c2h2, $scope.formData.c2h4);
    };


}]);

