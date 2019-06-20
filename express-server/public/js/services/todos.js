angular.module('todoService', [])

	// super simple service
	// each function returns a promise object
	.factory('Todos', ['$http', function ($http) {
		return {
			get: function () {
				return $http.get('/api/todos');
			},
			create: function (user) {
				return $http.post('/api/todos', user);
			},
			delete: function (id) {
				return $http.delete('/api/todos/' + id);
			}
		}
	}]);
