var equipService = angular.module('equipamentoService', []);
var Qs = require('qs');

	// super simple service
	// each function returns a promise object 
equipService.factory('Equipamentos', ['$http',function($http) {
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
		      	return equipamentos;
		    },
			get : function() {
				return $http.get('/api/equipamentos');
			},
			getByTag : function(aTag) {
				var queryString = Qs.stringify(aTag);
				return $http.get('/api/equipamentos/tag/' + queryString);
			},
			getByTags : function(aTags) {
				var queryString = Qs.stringify(aTags);
				console.log(queryString);
				return $http.get('/api/equipamentos/tags/' + queryString);
			},
			getAllTags : function() {
				return $http.get('/api/equipamentos/tags/');
			},
			create : function(equipamentoData) {
				return $http.post('/api/equipamentos', equipamentoData);
			},
			update : function(equipamentoData) {
				return $http.put('/api/equipamentos/',equipamentoData);
			},
			delete : function(id) {
				return $http.delete('/api/equipamentos/' + id);
			}
		}
	}]);