var app = angular.module('appDiag', ['ui.bootstrap','diagnosticosServices','analiseService']);
var _ = require('underscore');

app.controller('DuvalController', ['$scope','$filter','DuvalService','Analises' ,function ($scope,$filter, DuvalService, Analises) {
    
    $scope.m = function(analise) {
      if (angular.isUndefined(analise)) {return '-'};
      return DuvalService.m(analise.ch4, analise.c2h2, analise.c2h4);
    };
    $scope.a = function(analise) {
      if (angular.isUndefined(analise)) {return '-'};
      return DuvalService.a(analise.ch4, analise.c2h2, analise.c2h4);
    };
    $scope.y = function(analise) {
      if (angular.isUndefined(analise)) {return '-'};
      return DuvalService.y(analise.ch4, analise.c2h2, analise.c2h4);
    };
    $scope.diagnostico = function(analise) {
      if (angular.isUndefined(analise)) {return '-'};
      return DuvalService.diagnostico(analise.ch4, analise.c2h2, analise.c2h4);
    };

}]);

app.controller('DiagController', ['$scope','Analises' ,function ($scope, Analises) {
  $scope.equipamento = window.equipamento;
  console.log('equipamentoTag: ' + equipamento.tag);

  // Analises.get()
  Analises.getByTag(equipamento.tag)
      .success(function(data) {
        $scope.analise =  _.last(_.sortBy(data, 'dataDaAnalise'));
        // console.log('analise: ' + $scope.analise.tagDoEquipamento);
      });
}]);