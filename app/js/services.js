var servicesModule = angular.module('servicesModule', []);

servicesModule.factory('apiService', ['$http', function($http){
  var url = 'http://localhost:3000/';

  return {
    get: function(page){
      return $http.get(url + page);
    },
    postPost: function(newPost){
      $http.post(url + 'posts',
        {
          post: {
            title: newPost.title,
            content: newPost.content
          }
        }
      );
    }
  };
}]);
