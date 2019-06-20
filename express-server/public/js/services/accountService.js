angular.module('scutbank', [])
    .factory('Accounts', ['$http', ($http) => {
      return {
        get: () => {
          return $http.get('/api/getAccounts');
        },
        create: (user) => {
          return $http.post('/api/regist', user);
        },
        login: (user) => {
          return $http.post('/api/login', user);
        },
        trans: () => {
          return $http.post('/api/trans');
        },
      };
    }]);
