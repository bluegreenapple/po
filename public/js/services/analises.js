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
				var queryString = Qs.stringify(aTag);
				return $http.get('/api/analises/tag/' + queryString);
			},
			getByTags : function(aTags) {
				var queryString = Qs.stringify(aTags);
				console.log(queryString);
				return $http.get('/api/analises/tags/' + queryString);
			},
			create : function(analiseData) {
				return $http.post('/api/analises', analiseData);
			},
			delete : function(id) {
				return $http.delete('/api/analises/' + id);
			}
		}
	}]);