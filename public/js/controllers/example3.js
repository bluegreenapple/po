var app = angular.module('ui.bootstrap.demo3', ['ui.bootstrap','analiseService','equipamentoService','diagnosticosServices']);

app.controller('ModalDemoCtrl3', ['$scope','$http','Analises','DuvalService', '$modal', '$log',function ($scope,$http,Analises,DuvalService, $modal, $log) {

  $scope.loading = true;

  // GET =====================================================================
  // when landing on the page, get all analises and show them
  // use the service to get all the analises
  Analises.get()
    .success(function(data) {
      $scope.analises = data;

      Equipamentos.getBytags(analises.tag)
        .success(function(data) {
          $scope.equipamentos = data;
          $scope.loading = false;
        });
    });
  
  // $scope.getTableN = function() {
  //   return analises.length;
  // };

  $scope.diagnosticoDuval = function(aAnalise) {
      return "Duval: " + DuvalService.diagnostico(aAnalise.ch4,aAnalise.c2h2,aAnalise.c2h6);
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
