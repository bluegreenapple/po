angular.module('ui.bootstrap.demo', ['ui.bootstrap','equipamentoService']);
angular.module('ui.bootstrap.demo').controller('ModalDemoCtrl', function ($scope, $modal, $log) {

  $scope.items = ['item1', 'item2', 'item3'];

  $scope.animationsEnabled = true;

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };


});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

// angular.module('ui.bootstrap.demo').controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

//   $scope.items = items;
//   $scope.selected = {
//     item: $scope.items[0]
//   };

//   $scope.ok = function () {
//     $modalInstance.close($scope.selected.item);
//   };

//   $scope.cancel = function () {
//     $modalInstance.dismiss('cancel');
//   };
// });
angular.module('ui.bootstrap.demo').controller('ModalInstanceCtrl',['$scope','$http','Equipamentos', '$modalInstance', 'items', function ($scope,$http,Equipamentos, $modalInstance, items) {

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
        });
    }
  };

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);
