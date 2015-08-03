var app = angular.module('ui.bootstrap.demo2', ['ui.bootstrap','analiseService','equipamentoService']);
app.controller('ModalDemoCtrl2', ['$scope','$http','Analises', '$modal', '$log',function ($scope,$http,Analises, $modal, $log) {

  
  $scope.loading = true;

  // GET =====================================================================
  // when landing on the page, get all analises and show them
  // use the service to get all the analises
  Analises.get()
    .success(function(data) {
      $scope.analises = data;
      $scope.loading = false;
    });

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

  


  $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'myModalContent2.html',
      controller: 'ModalInstanceCtrl2',
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
      $scope.analises = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.openUpdate = function (aAnaliseData) {

    var modalInstance = $modal.open({
      templateUrl: 'myModalContent2.html',
      controller: 'ModalInstanceCtrlUpdate2',
      windowClass: 'center-modal',
      resolve: {
        analiseData: function () {
          return aAnaliseData;
        },
      }
    });

    modalInstance.result.then(function (selectedItem) {
      // $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };


}]);

app.controller('ModalInstanceCtrl2',['$scope','$http','Analises','Equipamentos', '$modalInstance', 'items', function ($scope,$http,Analises,Equipamentos,  $modalInstance, items) {
  $scope.verbo = 'Cadastrar';
  $scope.formData = {};
  $scope.loading = true;

  //get tags for populating tag selector
  Equipamentos.getAllTags()
        .success(function(data) {
          $scope.tags = data;
        }); 
  
// CREATE ==================================================================
  // when submitting the add form, send the text to the node API
  $scope.createAnalise = function() {
    // alert('I submit');
    // validate the formData to make sure that something is there
    // if form is empty, nothing will happen
    if ($scope.formData.tagDoEquipamento != undefined) {
      $scope.loading = true;

      // call the create function from our service (returns a promise object)
      Analises.create($scope.formData)

        // if successful creation, call our get function to get all the new analises
        .success(function(data) {
          $scope.loading = false;
          $scope.formData = {}; // clear the form so our user is ready to enter another
          $scope.analises = data; // assign our new list of analises
          $modalInstance.close($scope.analises);
        });
    }
  };

 

  $scope.ok = function () {
    $modalInstance.close($scope.analises);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);

app.controller('ModalInstanceCtrlUpdate2',['$scope','$http','Analises','Equipamentos', '$modalInstance', 'analiseData', function ($scope,$http,Analises,Equipamentos, $modalInstance, analiseData) {
  $scope.verbo = 'Editar';
  $scope.formData = analiseData;
  $scope.formData.dataDaAnalise = new Date(analiseData.dataDaAnalise);
  $scope.loading = true;
  
  //get tags for populating tag selector
  Equipamentos.getAllTags()
        .success(function(data) {
          $scope.tags = data;
        }); 


// CREATE ==================================================================
  // when submitting the add form, send the text to the node API
  $scope.updateAnalise = function() {
    // alert('I update');
    // validate the formData to make sure that something is there
    // if form is empty, nothing will happen
    if ($scope.formData.tagDoEquipamento != undefined) {
      $scope.loading = true;
      
      // call the create function from our service (returns a promise object)
      Analises.update($scope.formData)

        // if successful creation, call our get function to get all the new analises
        .success(function(data) {
          $scope.loading = false;
          $scope.formData = {}; // clear the form so our user is ready to enter another
          $scope.analises = data; // assign our new list of analises
          $modalInstance.close($scope.analises);
        });
    }
  };

 

  $scope.ok = function () {
    $modalInstance.close($scope.analises);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);
