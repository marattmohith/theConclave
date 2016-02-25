;(function() {
'use strict'

angular.module('conclaveModule')
	.controller('userPosts', userPosts);

userPosts.$inject = ['$scope', '$location', 'apiService', '$window', '$route', '$q']
function userPosts($scope, $location, apiService, $window, $route, $q) 
{
	var vm = this;
	vm.postImg = null;
	$scope.edit = true;

	
	$scope.publishPost = function() {
        //Verify post content, if nothing, do nothing
        if ((!$scope.addPostContent || $scope.addPostContent == "") && vm.postImg == null) {
            return;
        }

        upLoadPost().then(function(newPost){
            $scope.mainPosts.splice(0, 0, newPost[0]);
        })

        $scope.addPostContent = '';
        vm.postImg = null;
    }

    function upLoadPost() {
        var newPost = []
        return apiService.publishPost({body: $scope.addPostContent, img: vm.postImg}).$promise.then(function(result) {
            result.posts.forEach(function(post) {
                newPost.push(post)
            })
            return $q.when(newPost);
        })
    }

  	$scope.setFile = function(source) {
        vm.postImg = source.files[0]
    }

	function getMainPosts()
    {
	    apiService.posts().$promise.then(function(result){
	    console.log("posts: ", result)
	    $scope.mainPosts = result.posts;
	    updateStatus()
    })
  }

  //things to be updated on a page upon refresh
  function updateStatus() {
    apiService.getStatus().$promise.then(function(result) 
    {

      console.log('status', result)
      var status =  "today is a great day!";//result.statuses[0]
      vm.message = 'Logged in as ' + status.username + ' with status "' + status.status + '"'
      $scope.username = status.username;
      //user is logged in and page is not main, return to main page
      if($location.absUrl().indexOf("app/main")==-1)
      $window.location.href = "app\\main.html";
    }, function(error) {
      console.log('User not logged in', error)
      vm.message = 'Not Logged In'
      //if user is not logged in, make sure he is in login page
      if($location.absUrl().indexOf("app")==-1)
        $window.location.href = 'index.html';
      else
       $window.location.href = '..\\index.html';
    })
  }


}
})();

