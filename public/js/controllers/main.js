var equipControllers = angular.module('equipamentoController', ['ui.bootstrap']);

	// inject the Equipamento service factory into our controller
equipControllers.controller('mainController', ['$scope','$http','Equipamentos', function($scope, $http, Equipamentos) {
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
}]);

equipControllers.controller('ModalController', ['$scope','$window', function($scope, $window) {
	$scope.open = function (size) {
		alert('open called');

	    var modalInstance = $modal.open({
	      animation: true,
	      templateUrl: 'indexLogin.html',
	      // controller: 'modalController  ',
	      size: size,
	      // resolve: {
	      //   items: function () {
	      //     return $scope.items;
	      //   }
	      // }
	    });

	    // modalInstance.result.then(function (selectedItem) {
	    //   $scope.selected = selectedItem;
	    // }, function () {
	    //   $log.info('Modal dismissed at: ' + new Date());
	    // });
    };
}]);