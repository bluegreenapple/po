var app = angular.module('appHist', ['ui.bootstrap','analiseService','equipamentoService']);
var _ = require('underscore');

app.controller('HistoricoController', ["$http", '$scope','Analises','Equipamentos' ,function ($http,$scope,Analises, Equipamentos) {

  $scope.loading = true;
  $scope.nSeries = [];
  $scope.equipamentos = [];
  $scope.analises = [];
  $scope.selectedAnalises = [];

  Equipamentos.get()
    .success(function(data) {
      
      //first sort data by most recent date (descending order)
      $scope.equipamentos = _.sortBy(data, 'nSerie');

      //third get the nSeries array for requesting the equipamentos
      $scope.nSeries =  _.pluck($scope.equipamentos, 'nSerie');
      
      $scope.changedValue;
      console.log('success!');
      // console.log(_.first($scope.equipamentos));
      
      Analises.getByNSeries($scope.nSeries)
        .success(function(data2) {
          // alert(data2[0].nSerie);
          $scope.analises = data2;
          $scope.loading = false;
          console.log('analises1: '+ _.first(data2).nSerieDoEquipamento);
        });

    });


    
  $scope.changedValue = function() {
      
    $scope.equipamento = _.find($scope.equipamentos, function(aEquipamento){ return aEquipamento.nSerie == $scope.selectedNSerie;  });
    console.log('selected: '+$scope.selectedNSerie);
    console.log('selectedEquipamento: ',$scope.equipamento);

    $scope.selectedAnalises = _.filter($scope.analises, function(aAnalise){ return aAnalise.nSerieDoEquipamento == $scope.selectedNSerie;  });
    console.log('selectedAnalises: ',$scope.selectedAnalises);
    console.log('first Analise n: ',_.first($scope.selectedAnalises));
    

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