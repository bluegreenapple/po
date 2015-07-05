var app = angular.module('ui.bootstrap.demo3', ['ui.bootstrap','analiseService','equipamentoService','diagnosticosServices']);

var _ = require('underscore');

app.filter('searchFor', function(){
    return function(arr, searchString){
        if(!searchString){
            return arr;
        }
        var result = [];
        searchString = searchString.toLowerCase();
        angular.forEach(arr, function(item){
            if(item.title.toLowerCase().indexOf(searchString) !== -1){
            result.push(item);
        }
        });
        return result;
    };
});

app.controller('ModalDemoCtrl3', ['$scope','$http','Analises','Equipamentos','DuvalService', '$modal', '$log',function ($scope,$http,Analises,Equipamentos,DuvalService, $modal, $log) {

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
      $scope.analises = _.uniq($scope.analises,true, function(analise){ return analise.tagDoEquipamento; });
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
      return _.findWhere($scope.equipamentos, {tag: aAnalise.tagDoEquipamento});
  };

  $scope.diagnosticoDuval = function(aAnalise) {
      return "Duval: " + DuvalService.diagnostico(aAnalise.ch4,aAnalise.c2h2,aAnalise.c2h6);
  };

  
  $scope.customFilter = function(element) {
  return element.name.match() $scope.equipamento(element).tipo  

  return element.name.match(/^Ma/) ? true : false;
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
