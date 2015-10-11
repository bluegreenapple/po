var analService = angular.module('analiseService', []);
var Qs = require('qs');
	// super simple service
	// each function returns a promise object 
analService.factory('Analises', ['$http',function($http) {
		
		return {
			
			all: function() {
		      	return analises;
		    },

			get : function() {
				return $http.get('/api/analises')
					.success(function(data) {
						analises = data;
					});
			},
			getByTag : function(aTag) {
				var queryString = Qs.stringify({"tag": aTag});
				console.log("queryString: /api/analises/tag/" + queryString);
				return $http.get('/api/analises/tag/' + queryString);
			},
			getByTags : function(aTags) {
				var queryString = Qs.stringify({"tag": aTags});
				console.log(queryString);
				return $http.get('/api/analises/tags/' + queryString);
			},
			getByNSerie : function(aNSerie) {
				var queryString = Qs.stringify({"nSerie": aNSerie});
				console.log("queryString: /api/analises/nserie/" + queryString);
				return $http.get('/api/analises/nserie/' + queryString);
			},
			getByNSeries : function(aNSeries) {
				var queryString = Qs.stringify({"nSerie": aNSeries});
				console.log(queryString);
				return $http.get('/api/analises/nseries/' + queryString);
			},
			create : function(analiseData) {
				return $http.post('/api/analises', analiseData);
			},
			update : function(analiseData) {
				return $http.put('/api/analises/',analiseData);
			},
			delete : function(id) {
				return $http.delete('/api/analises/' + id);
			}
		}
	}]);