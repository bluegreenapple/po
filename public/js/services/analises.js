angular.module('analiseService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Analises', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/analises');
			},
			create : function(analiseData) {
				return $http.post('/api/analises', analiseData);
			},
			delete : function(id) {
				return $http.delete('/api/analises/' + id);
			}
		}
	}]);