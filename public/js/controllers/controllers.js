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

app.controller('DiagController', ["limitToFilter", "$http", '$scope','Analises' ,function (limitToFilter,$http,$scope, Analises) {
  // $scope.tag = window.equipamento.tag;
  // console.log('equipamentoTag: ' + equipamento.tag);
  alert('piro');

  // $scope.tag= "2313";
  $scope.loading = true;

  // console.log('lalalal'+ $scope.tag);  

  // $scope.findUltimaAnalise = function() {
  //   alert('piro');
  //   console.log('touch');
  //     Analises.getByTag($scope.tag)
  //     .success(function(data) {
  //       $scope.analise =  _.last(_.sortBy(data, 'dataDaAnalise'));
  //       $scope.loading = false;
  //     });
  // };


  
  $scope.tags = [];
  $scope.analises = [];
  Analises.get()
    .success(function(data) {
      // console.log('data: '+ data);
      //first sort data by most recent date (descending order)
      $scope.analises = _.sortBy(data, 'dataDaAnalise').reverse();

      //(optional) second only take the first (most recent) Analise for each tagDoEquipamento
      console.log("pre: ");
      console.log("pre: "+ $scope.analises.length);
      $scope.analises = _.uniq($scope.analises,true, function(aAnalise){ return aAnalise.tagDoEquipamento; });
      for (var i = $scope.analises.length - 1; i >= 0; i--) {
        console.log($scope.analises[i].tagDoEquipamento);
      };
      console.log("pos: "+ $scope.analises.length);

      // console.log('analises: '+ $scope.analises);

      //third get the tags array for requesting the equipamentos
      $scope.tags =  _.pluck($scope.analises, 'tagDoEquipamento');
      console.log("pre: "+ $scope.tags);
      $scope.tags = _.uniq($scope.tags,true);
      console.log("pos: "+ $scope.tags);
      // console.log('obj: '+ tags);
    });

    
  $scope.changedValue = function() {
    console.log("change");
    $scope.analise = _.find($scope.analises, function(aAnalise){ return aAnalise.tagDoEquipamento == $scope.selectedTag;  });
    if ($scope.analise == undefined) {
      $scope.loading = true;
    }
    else{
      $scope.loading = false;
    }
  };   

  // Analises.getByTag($scope.tag)
  //     .success(function(data) {
  //       console.log('lalalal');
  //       $scope.analise =  _.last(_.sortBy(data, 'dataDaAnalise'));
  //       // console.log('analise: ' + $scope.analise.tagDoEquipamento);
  //     });
}]);