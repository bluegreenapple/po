var app = angular.module('appHist', ['ui.bootstrap','analiseService','equipamentoService','smart-table','chart.js']);
var _ = require('underscore');

app.controller('HistoricoController', ["limitToFilter","$filter", "$http", '$scope','Analises','Equipamentos' ,function (limitToFilter,$filter,$http,$scope, Analises,Equipamentos) {

  $scope.loading = true;
  $scope.nSeries = [];
  $scope.allAnalises = [];

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
          $scope.allAnalises = data2;
          $scope.loading = false;
          console.log('analises0: '+ _.first(data2).nSerieDoEquipamento);
        });

    });


  $scope.selectedAnalises = [];
  $scope.labels = [];
  $scope.data = [];
  $scope.changedValue = function() {
      
    $scope.equipamento = _.find($scope.equipamentos, function(aEquipamento){ return aEquipamento.nSerie == $scope.selectedNSerie;  });

    //selectedAnalises must always return the same array otherwise an infinite loop will be triggered
    console.log('before',$scope.selectedAnalises);
    $scope.selectedAnalises.length = 0;
    for (var i = 0; i < $scope.allAnalises.length; i++) {
      if ($scope.allAnalises[i].nSerieDoEquipamento == $scope.selectedNSerie) {
          $scope.selectedAnalises.push($scope.allAnalises[i]);    
      };
    };
    console.log('after',$scope.selectedAnalises);
    
    $scope.labels.length = 0;
    $scope.data.length = 0;
    var o2 = [];
    var h2 = [];
    var n2 = [];
    var ch4 = [];

    for (var i = 0; i < $scope.selectedAnalises.length; i++) {
      $scope.labels.push($scope.selectedAnalises[i].dataDaAnalise);    
      o2.push($scope.selectedAnalises[i].o2);        
      h2.push($scope.selectedAnalises[i].h2);        
      n2.push($scope.selectedAnalises[i].n2);        
      ch4.push($scope.selectedAnalises[i].ch4);  
    };
    $scope.data.push(o2);
    $scope.data.push(h2);
    $scope.data.push(n2);
    $scope.data.push(ch4);

    if ($scope.equipamento == undefined) {
      $scope.loading = true;
    }
    else{
      $scope.loading = false;
      console.log('changedValue new nSerie: '+$scope.equipamento.nSerie);
    }

  };   

  // if(!angular.isUndefined(window.equipamento)){
  //   $scope.selectedNSerie = window.equipamento.nSerie;
  //   console.log('nSerieFromWindow: '+window.equipamento.nSerie);
  //   $scope.changedValue;
  // }
  
  // $scope.change = function(){
  //   $scope.selectedNSerie = window.equipamento.nSerie;
  //   $scope.changedValue;
  // }

  
  // $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['H2', 'O2', 'N2', 'CH4'];
  // $scope.data = [
  //   [65, 59, 80, 81, 56, 55, 40],
  //   [28, 48, 40, 19, 86, 27, 90]
  // ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };

}]);