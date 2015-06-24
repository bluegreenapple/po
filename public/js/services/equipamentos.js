angular.module('equipamentoService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Equipamentos', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/equipamentos');
			},
			create : function(equipamentoData) {
				return $http.post('/api/equipamentos', equipamentoData);
			},
			delete : function(id) {
				return $http.delete('/api/equipamentos/' + id);
			}
		}
	}]);