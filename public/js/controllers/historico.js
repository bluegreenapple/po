var app = angular.module('appHist', ['ui.bootstrap','analiseService','equipamentoService','smart-table']);
var _ = require('underscore');

app.controller('HistoricoController', ["limitToFilter","$filter", "$http", '$scope','Analises','Equipamentos' ,function (limitToFilter,$filter,$http,$scope, Analises,Equipamentos) {

  $scope.loading = true;
  $scope.nSeries = [];
  $scope.analises = [];

  Equipamentos.get()
    .success(function(data) {
      console.log('success!');
      //first sort data by most recent date (descending order)
      $scope.equipamentos = _.sortBy(data, 'nSerie');

      //third get the nSeries array for requesting the equipamentos
      $scope.nSeries =  _.pluck($scope.equipamentos, 'nSerie');
      
      $scope.changedValue;
      
      // console.log(_.first($scope.equipamentos));
      
      Analises.get()
        .success(function(data2) {
          // alert(data2[0].nSerie);
          $scope.analises = data2;
          $scope.loading = false;
          console.log('analises0: '+ _.first(data2).nSerieDoEquipamento);
        });

    });


    
  $scope.changedValue = function() {
      
    $scope.equipamento = _.find($scope.equipamentos, function(aEquipamento){ return aEquipamento.nSerie == $scope.selectedNSerie;  });
    // $scope.selectedAnalises = $scope.analises;//_.filter($scope.analises, function(aAnalise){ return aAnalise.nSerieDoEquipamento == $scope.selectedNSerie; });
    if ($scope.equipamento == undefined) {
      $scope.loading = true;
    }
    else{
      $scope.loading = false;
      console.log('changedValue new nSerie: '+$scope.equipamento.nSerie);
    }
  };   

  if(!angular.isUndefined(window.equipamento)){
    $scope.selectedNSerie = window.equipamento.nSerie;
    console.log('nSerieFromWindow: '+window.equipamento.nSerie);
    $scope.changedValue;
  }
  
  $scope.change = function(){
    $scope.selectedNSerie = window.equipamento.nSerie;
    $scope.changedValue;
  }

}]);