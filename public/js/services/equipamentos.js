angular.module('equipamentoService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Equipamentos', ['$http',function($http) {
		var equipamentos = [];

		return {
			equipamentoForEquipamentoId: function(id) {
				for (var i = 0; i < equipamentos.length; i++) {
					if (equipamentos[i].id === id) {
					  return equipamentos[i];
					}
				}
				throw "Couldn't find equipamento with id: " + id;
		    },
			equipamentoForTagDoEquipamento: function(source,tag) {
				for (var i = 0; i < equipamentos.length; i++) {
					if (equipamentos[i].tag === tag) {
					  return equipamentos[i];
					}
				}
				throw "Couldn't find equipamento with tag: " + tag;
		    },
			all: function() {
		      	return analises;
		    },
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