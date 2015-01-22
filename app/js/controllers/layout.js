var homeControllerModule = angular.module('homeControllerModule', []);

homeControllerModule.controller('homeController', ['$scope', '$http', 'apiService', function($scope, $http, apiService) {

  $scope.posts = [];
  $scope.tags = [];

  // $http.get('http://localhost:3000/posts')
  // above returns a promise object
  apiService.get('posts')
    .success(function(data){
      $scope.posts = data;
    });

  apiService.get('tags')
  .success(function(data){
    $scope.tags = data;
  });

  $scope.getTagName = function(id) {
    var ret = ""; // loops through all of the tags in $scope.tags
    for (i = 0; i < $scope.tags.length; i++){
      if(id == $scope.tags[i].id) {
        ret = $scope.tags[i].name;
      }
    }
    return ret;
  };

  $scope.newPost = {'tag_ids': []};

  $scope.toggleId = function(id) {
    i = $scope.newPost.tag_ids.indexOf(id);

    if(i == -1) {

      $scope.newPost.tag_ids.push(id);

    } else {
      $scope.newPost.tag_ids.splice(i, 1);
    }
  };

  $scope.submitNewPost = function() {
    apiService.postPost($scope.newPost);
    $scope.posts.push($scope.newPost);
    // // $scope.posts.push(postToPush);
  };

  $scope.tagArray = [];

  $scope.addTag = function(id) {
    i = $scope.tagArray.indexOf(id);
    if(i == -1) {
      $scope.tagArray.push(id);
    } else {
      $scope.tagArray.splice(i, 1);
    }
  };

}]);

homeControllerModule.filter('selectedTags', function() {
  return function(posts, tagArray) {
    // console.log(posts);
    // console.log(tagArray);
    return posts.filter(function(post) {
      for (var i in posts) {

        // shows all posts if no tags have been added to the array
        if (tagArray.length === 0) {
          return true;
        } else {

          // remember that .indexOf returns -1 if the item is not in the array.
          // this filter returns true if the tag IS in the array.
          if (tagArray.indexOf(post.tag_ids[i]) != -1) {
            return true;
          }
        }
      }

      // returns false if it hasn't already returned true
      return false;

    });
  };
});
