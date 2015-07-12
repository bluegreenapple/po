var app = angular.module('ui.bootstrap.demo', ['ui.bootstrap','equipamentoService','diagnosticosServices']);
var moment = require('moment');


app.controller('ModalDemoCtrl', ['$scope','$http','Equipamentos', '$modal', '$log',function ($scope,$http,Equipamentos, $modal, $log) {

  $scope.formData = {};
  $scope.loading = true;

  // GET =====================================================================
  // when landing on the page, get all equipamentos and show them
  // use the service to get all the equipamentos
  Equipamentos.get()
    .success(function(data) {
      $scope.equipamentos = data;
      $scope.loading = false;
    });

  // DELETE ==================================================================
  // delete a equipamento after checking it
  $scope.deleteEquipamento = function(id) {
    $scope.loading = true;

    Equipamentos.delete(id)
      // if successful creation, call our get function to get all the new equipamentos
      .success(function(data) {
        $scope.loading = false;
        $scope.equipamentos = data; // assign our new list of equipamentos
      });
  };

  $scope.items = ['item1', 'item2', 'item3'];
  $scope.animationsEnabled = true;

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      windowClass: 'center-modal',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      // $scope.selected = selectedItem;
      $scope.equipamentos = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  
  $scope.openDiagnostico = function (aEquipamento) {
      
      var url = '/diagnosticos';   
      var newTab = window.open(url, '_blank'); // in new tab
      newTab.equipamento = aEquipamento;
            
  };


  $scope.openUpdate = function (aEquipamentoData) {

    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrlUpdate',
      windowClass: 'center-modal',
      resolve: {
        equipamentoData: function () {
          return aEquipamentoData;
        },
        equipamentoData: function () {
          return aEquipamentoData;
        },
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
  


}]);

app.controller('ModalInstanceCtrl',['$scope','$http','Equipamentos', '$modalInstance', 'items', function ($scope,$http,Equipamentos, $modalInstance, items) {
  $scope.verbo = 'Cadastrar';
  $scope.formData = {};
  $scope.loading = true;
// CREATE ==================================================================
  // when submitting the add form, send the text to the node API
  $scope.createEquipamento = function() {
    alert('I submit');
    // validate the formData to make sure that something is there
    // if form is empty, nothing will happen
    if ($scope.formData.tag != undefined) {
      $scope.loading = true;

      // call the create function from our service (returns a promise object)
      Equipamentos.create($scope.formData)

        // if successful creation, call our get function to get all the new equipamentos
        .success(function(data) {
          $scope.loading = false;
          $scope.formData = {}; // clear the form so our user is ready to enter another
          $scope.equipamentos = data; // assign our new list of equipamentos
          $modalInstance.close($scope.equipamentos);
        });
    }
  };

 

  $scope.ok = function () {
    $modalInstance.close($scope.equipamentos);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };


}]);

app.controller('ModalInstanceCtrlUpdate',['$scope','$http','Equipamentos', '$modalInstance', 'equipamentoData', function ($scope,$http,Equipamentos, $modalInstance, equipamentoData) {
  $scope.verbo = 'Editar';
  $scope.formData = equipamentoData;
  $scope.formData.dataDeFabricacao = new Date(equipamentoData.dataDeFabricacao);
  $scope.formData.dataDoUltimoReparo = new Date(equipamentoData.dataDoUltimoReparo);
  $scope.loading = true;
  
// CREATE ==================================================================
  // when submitting the add form, send the text to the node API
  $scope.updateEquipamento = function() {
    alert('I update');
    // validate the formData to make sure that something is there
    // if form is empty, nothing will happen
    if ($scope.formData.tag != undefined) {
      $scope.loading = true;
      
      // call the create function from our service (returns a promise object)
      Equipamentos.update($scope.formData)

        // if successful creation, call our get function to get all the new equipamentos
        .success(function(data) {
          $scope.loading = false;
          $scope.formData = {}; // clear the form so our user is ready to enter another
          $scope.equipamentos = data; // assign our new list of equipamentos
          $modalInstance.close($scope.equipamentos);
        });
    }
  };

 

  $scope.ok = function () {
    $modalInstance.close($scope.equipamentos);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);

