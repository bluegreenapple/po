angular.module('analiseService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Analises', ['$http',function($http) {
		var analises = [];
		
		return {
			lastAnaliseForTagDoEquipamento: function(aTagDoEquipamento) {
				for (var i = analises.length -1; i >= 0; i--) {
					if (analises[i].tagDoEquipamento === aTagDoEquipamento) {
					  return analises[i];
					}
				}
				throw "Couldn't find any analise with tagDoEquipamento: " + aTagDoEquipamento;
		    },
			analisesForTagDoEquipamento: function(source,aTagDoEquipamento) {
				var list = [];
				for (var i = 0; i < source.length; i++) {
					if (source[i].tagDoEquipamento === aTagDoEquipamento) {
					   list.push(source[i]);
					}
				}
				return list;
		    },
			all: function() {
		      	return analises;
		    },

			get : function() {
				return $http.get('/api/analises')
					.success(function(data) {
						analises = data;
					});
			},
			getForEquipamentoTag : function(aEquipamentoTag) {
				var config = {
					headers: {
				        "tagDoEquipamento" : "aEquipamentoTag"
				    }
				};
				return $http.get('/api/analises',config);
			},
			create : function(analiseData) {
				return $http.post('/api/analises', analiseData);
			},
			delete : function(id) {
				return $http.delete('/api/analises/' + id);
			}
		}
	}]);