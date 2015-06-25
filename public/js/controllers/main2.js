angular.module('analiseController', [])

	// inject the Analise service factory into our controller
	.controller('mainController', ['$scope','$http','Analises', function($scope, $http, Analises) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all analises and show them
		// use the service to get all the analises
		Analises.get()
			.success(function(data) {
				$scope.analises = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createAnalise = function() {
			alert('I submit');
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
					});
			}
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