(function() {
  
angular.module('conclaveModule')
  .controller('conclaveCtrl', conclaveCtrl)
 
conclaveCtrl.$inject = ['apiService', '$location','$scope','$window']
function conclaveCtrl(apiService, $location, $scope, $window) {
  console.log(":FIRST : "+$location.path()+", "+$location.absUrl());

  $scope.signInFormStatus = true;
  $scope.toggleRegStatus = false;
  $scope.toggleCreateAccountStatus = true;
  $scope.isCollapsed =true;

  $scope.toggleReg = function() {
        $scope.toggleRegStatus = !$scope.toggleRegStatus;
  }

    //clear search for posts
  $scope.clearSearch = function()
  {
    $scope.postSearch = "";
  } 

  //clear for write posts
  $scope.clearAddPost = function()
  {
    $scope.addPostContent = "";
    $scope.addPostContentImage   = "";
  }


  $scope.updateMyStatus = function()
  {
    document.getElementById("myStatus").value = document.getElementById("updatedStatus").value;
    $scope.myStatus=document.getElementById("updatedStatus").value;
  }


  var vm = this
  vm.login = login
  vm.logout = logout
  vm.register = register
  
  if($location.absUrl().indexOf("app/main")==-1)
    {
      console.log("inside if, "+$location.absUrl())
      sample()      
    }
  else{
    console.log("inside else, "+$location.absUrl())
    updateStatus()
    getMainPosts()
    //getMainPicture()

    
  }

  function login() {
    console.log("log in for : "+$scope.usernameLogin)
    apiService.login({"username":$scope.usernameLogin, "password":$scope.password})
      .$promise.then(function(result) {
          console.log('LogIn', result)
          //updateStatus()
          $window.location.href = "app\\main.html";
      },
      function()
      {
        $scope.messageLogin = "Wrong username or password"
      })
  }

    function register() {
      console.log("inside register, "+$scope.user_name)
    apiService.register({"username": $scope.user_name, "email":$scope.eMail, "zipcode":$scope.zipcode, "password":$scope.passw2})
      .$promise.then(function(result) {
          console.log('Register', result)
          $window.location.href = 'index.html';
      })
  }
  
  function logout()
  {
    console.log("before logout")

    apiService.logout().$promise.then(function(result) {
      console.log('LogOut', result)
      if($location.absUrl().indexOf("app")==-1)
        $window.location.href = 'index.html';
      else
       $window.location.href = '..\\index.html';
    },
    function(result)
    {
      console.log("logout failed"+result);
    })
    if($location.absUrl().indexOf("app")==-1)
        $window.location.href = 'index.html';
    else
       $window.location.href = '..\\index.html';

  }
  
  //things to be updated on a page upon refresh
  function updateStatus() {
    apiService.getStatus().$promise.then(function(result) 
    {

      console.log('inside get status in update status: ', result)


      $scope.username = result.username
      $scope.message = result.status
      $scope.profileStatus = result.status
      $scope.profileName = result.username//result.profiles[0]["username"]

      //called here so that username is initialized
      getFollowing()

      //also load profile picture here
      loadProfilePicture()

      //user is logged in and page is not main, return to main page
      if($location.absUrl().indexOf("app/main")==-1)
      $window.location.href = "app\\main.html";
    }, function(error) {
      console.log('User not logged in', error)
      //if user is not logged in, make sure he is in login page
      if($location.absUrl().indexOf("app")==-1)
        $window.location.href = 'index.html';
      else
       $window.location.href = '..\\index.html';
    })
  }

  function loadProfilePicture()
  {
    apiService.getPicture({user:$scope.username}).$promise.then(function(result) 
      {
        console.log("get picture: for "+$scope.username+", "+result.picture+", "+result.username)
        if(!(angular.isUndefined(result.picture) || result.picture === null) )
          $scope.profilePicture = result.picture;
        else  
          $scope.profilePicture="//www.gravatar.com/avatar/b9547066abc69c1d7332c9f28858a6b8?d=mm&s=100"
      })

  }

  function sample()
  {
    apiService.sample().$promise.then(function(result){
    console.log("sample called, result: ", result.posts)
    $scope.samplePosts = result.posts;
    })
  }

  function getMainPosts()
  {
    apiService.posts().$promise.then(function(result){
    console.log("posts: ", result)
    $scope.mainPosts = result.posts;
    updateStatus()
    })
  }


  function getMainPicture()
  {
    apiService.picture().$promise.then(function(result){
    console.log("picture: ", result)
    $scope.mainPicture = result.picture;
    updateStatus()
    })
  }

  function getFollowing()
  {
      console.log("inside getFollowing for "+$scope.username)
      apiService.getFollowing({user:$scope.username}).$promise.then(function(result){
        console.log("followers: "+result.following);
        $scope.followers = result.following;

      })
  }

  $scope.putFollowing = function()
  {
      console.log("inside putFollowing for: "+$scope.addUsername)
      apiService.putFollowing({user:$scope.addUsername}).$promise.then(function(result){
        console.log("followers: "+result.following);
        $scope.followers = result.following;

      })
  }

  $scope.deleteFollowingUser = function()
  {
      console.log("inside deleteFollowing for: "+$scope.addUsername)
      apiService.deleteFollowing({user:$scope.addUsername}).$promise.then(function(result){
        console.log("followers: "+result.following);
        $scope.followers = result.following;

      })
  }

  $scope.editStatusFunc = function()
  {
    console.log("status:"+$scope.editedStatus)
    apiService.updateStatus({"status": $scope.editedStatus }).$promise.then(function(result){
    console.log("user status updated to: ", result)
    $scope.message = $scope.editedStatus;
    //updateStatus()
    })
  }

  $scope.setFile = function(pic){
        apiService.upload({'image':pic.files[0]}).$promise.then(function(result){
            window.alert("uploaded");
        })
  }

}  
  
})();