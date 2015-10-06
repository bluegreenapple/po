var app = angular.module('ui.bootstrap.demo3', ['ui.bootstrap','analiseService','equipamentoService','diagnosticosServices','smart-table']);

var _ = require('underscore');

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

      //(optional) second only take the first (most recent) Analise for each tagDoEquipamento
      $scope.analises = _.uniq($scope.analises,false, function(analise){ return analise.tagDoEquipamento; });
      // console.log('analises: '+ $scope.analises);

      //third get the tags array for requesting the equipamentos,then create an object with it for stringify
      var tags = _.pluck($scope.analises, 'tagDoEquipamento');
      tags = { "tag": tags};
      // console.log('obj: '+ tags);
      
      //get equipamentos
      Equipamentos.getByTags(tags)
        .success(function(data2) {
          // alert(data2[0].tag);
          $scope.equipamentos = data2;
          $scope.loading = false;
          // console.log('equipamentos: '+ data2);
        });
    });
  

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
      var duval = $scope.diagnosticoDuval(aAnalise);
      if (duval == 'Duval: Pontos Quentes') {
        return 'duval_01';
      } else if (duval == 'Duval: Arcos de Alta Energia') {
        return 'duval_02';
      } else if (duval == 'Duval: Arcos de Baixa Energia') {
        return 'duval_03';
      }
      return 'duval_00';
  };

  $scope.diagRogersClass = function(aAnalise) {
        return RogersService.diagnosticoClass(aAnalise.h2,aAnalise.ch4,aAnalise.c2h2,aAnalise.c2h4,aAnalise.c2h6);
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
