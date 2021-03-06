var app = angular.module('ui.bootstrap.demo3', ['ui.bootstrap','analiseService','equipamentoService','diagnosticosServices','smart-table','xeditable']);

var _ = require('underscore');

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});


app.controller('ModalDemoCtrl3', ['$scope','$filter','$http','Analises','Equipamentos','DuvalService','RogersService', 'DornemburgService','LaborelecService','Iec156Service', '$modal', '$log',function ($scope,$filter,$http,Analises,Equipamentos,DuvalService,RogersService,DornemburgService,LaborelecService,Iec156Service, $modal, $log) {

  $scope.loading = true;

  // GET =====================================================================
  // when landing on the page, get all analises and show them
  // use the service to get all the analises
  
  
  Analises.get()
    .success(function(data) {
      // console.log('data: '+ data);
      //first sort data by most recent date (descending order)
      $scope.analises = _.sortBy(data, 'dataDaAnalise').reverse();

      //(optional) second only take the first (most recent) Analise for each nSerieDoEquipamento
      $scope.analises = _.uniq($scope.analises,false, function(analise){ return analise.nSerieDoEquipamento; });
      // console.log('analises: '+ $scope.analises);

      //third get the tags array for requesting the equipamentos,then create an object with it for stringify
      var nSeries = _.pluck($scope.analises, 'nSerieDoEquipamento');
      nSeries = { "nSerie": nSeries};
      // console.log('obj: '+ nSeries);
      
      //get equipamentos
      Equipamentos.getByNSeries(nSeries)
        .success(function(data2) {
          // alert(data2[0].nSerie);
          $scope.equipamentos = data2;
          $scope.loading = false;
          // console.log('equipamentos: '+ data2);
        });
    });
  
  $scope.updateAnalise = function(aAnalise) {  
    // update the Analise
    Analises.update(aAnalise);
  };

  $scope.equipamento = function(aAnalise) {
      return _.findWhere($scope.equipamentos, {nSerie: aAnalise.nSerieDoEquipamento});
  };

  $scope.getters = {
      tag: function (aAnalise) {
          return $scope.equipamento(aAnalise).tag;
      }
      ,
      local: function (aAnalise) {
          return $scope.equipamento(aAnalise).local;
      },
      tipo: function (aAnalise) {
          return $scope.equipamento(aAnalise).tipo;
      },
      emOperacao: function (aAnalise) {
          return $scope.equipamento(aAnalise).emOperacao;
      },
  };

  $scope.diagnosticoDuval = function(aAnalise) {
      return "Duval: " + DuvalService.diagnostico(aAnalise.ch4,aAnalise.c2h2,aAnalise.c2h6);
  };

  $scope.diagnosticoRogers = function(aAnalise) {
      return "Rogers: " + RogersService.diagnostico(aAnalise.h2,aAnalise.ch4,aAnalise.c2h2,aAnalise.c2h4,aAnalise.c2h6);
  };  

  $scope.diagnosticoDornemburg = function(aAnalise) {
      return "Dornemburg: " + DornemburgService.diagnostico(aAnalise.h2,aAnalise.ch4,aAnalise.c2h2,aAnalise.c2h4,aAnalise.c2h6);
  };

  $scope.diagnosticoIec156 = function(aAnalise) {
      return "Iec60599: " + Iec156Service.diagnostico(aAnalise.h2,aAnalise.ch4,aAnalise.c2h2,aAnalise.c2h4,aAnalise.c2h6).diagnostico;
  };

  $scope.diagnosticoLaborelec = function(aAnalise) {
      return "Laborelec: " + LaborelecService.diagnostico(aAnalise.h2,aAnalise.co,aAnalise.ch4,aAnalise.c2h2,aAnalise.c2h4,aAnalise.c2h6,aAnalise.tgg).diagnostico;
  };

  $scope.diagDuvalClass = function(aAnalise) {
      return DuvalService.diagnosticoClass(aAnalise.ch4,aAnalise.c2h2,aAnalise.c2h6);
  };

  $scope.diagRogersClass = function(aAnalise) {
        return RogersService.diagnosticoClass(aAnalise.h2,aAnalise.ch4,aAnalise.c2h2,aAnalise.c2h4,aAnalise.c2h6);
  };

  $scope.diagDornemburgClass = function(aAnalise) {
    // return 'dornemburg_01';
      return DornemburgService.diagnosticoClass(aAnalise.h2,aAnalise.ch4,aAnalise.c2h2,aAnalise.c2h4,aAnalise.c2h6);
  };

  $scope.diagIec156Class = function(aAnalise) {
      return Iec156Service.diagnosticoClass(aAnalise.h2,aAnalise.ch4,aAnalise.c2h2,aAnalise.c2h4,aAnalise.c2h6);
  };

  $scope.diagLaborelecClass = function(aAnalise) {
      return LaborelecService.diagnosticoClass(aAnalise.h2,aAnalise.co,aAnalise.ch4,aAnalise.c2h2,aAnalise.c2h4,aAnalise.c2h6,aAnalise.tgg);
  };

  // DELETE ==================================================================
  // delete a analise after checking it
  $scope.deleteAnalise = function(id) {
    $scope.loading = true;

    Analises.delete(id)
      // if successful creation, call our get function to get all the new analises
      .success(function(data) {
        $scope.loading = false;
        $scope.analises = data; // assign our new list of analises
      });
  };


}]);
