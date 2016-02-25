;(function() {
'use strict'

angular.module('conclaveModule')
	.controller('userProfile', userProfile);

userProfile.$inject = ['$scope', '$location', 'apiService', '$window', '$route']
function userProfile($scope, $location, apiService, $window, $route) {
	var vm = this;
	vm.postImg = null;
	$scope.edit = true;
	updateStatus();

	apiService.getEmail({user:$scope.username}).$promise.then(function(result) 
    {
    	console.log("get Email: for "+$scope.username+", "+result.email+", "+result.username)
		$scope.profileEmail = result.email;
	})
	apiService.getZipcode({user:$scope.username}).$promise.then(function(result) 
    {
    	console.log("get zipcode: for "+$scope.username+", "+result.zipcode+", "+result.username)
		$scope.profileZipcode = result.zipcode;
	})
	apiService.getPicture({user:$scope.username}).$promise.then(function(result) 
    {
    	console.log("get picture: for "+$scope.username+", "+result.picture+", "+result.username)
		if(!(angular.isUndefined(result.picture) || result.picture === null) )
          $scope.profilePicture = result.picture;
        else  
          $scope.profilePicture="//www.gravatar.com/avatar/b9547066abc69c1d7332c9f28858a6b8?d=mm&s=100"
	})

	$scope.updateUserProfile = function()
  	{
  		var vm = this;
  		
		if(!(angular.isUndefined($scope.zipcodeChange) || $scope.zipcodeChange === null) )
		{
			console.log("inside updateUserProfile, zipcode:"+$scope.zipcodeChange)
	    	apiService.putZipcode({"zipcode": $scope.zipcodeChange }).$promise.then(function(result){
	    		$scope.profileZipcode = $scope.zipcodeChange
	    	})
	    }
	    if(!(angular.isUndefined($scope.passwordChange) || $scope.passwordChange === null) )
		{
			console.log("inside updateUserProfile, password:"+$scope.passwordChange)
	    	apiService.putPassword({"password": $scope.passwordChange }).$promise.then(function(result){
	    
	    	})
	    }
		if(!(angular.isUndefined($scope.emailChange) || $scope.emailChange === null) )
		{
			console.log("inside updateUserProfile, email:"+$scope.emailChange)
		    apiService.putEmail({"email": $scope.emailChange }).$promise.then(function(result){
		    	$scope.profileEmail = $scope.emailChange
		    })
		}
		/*if(angular.isUndefined(vm.postImg) || vm.postImg === null )
		{
			console.log("inside updateUserProfile, vm.postImg:"+$scope.emailChange)
		    apiService.putPicture({"img": vm.postImg }).$promise.then(function(result){
		    
		    })
		}*/
  	}


  	function setFile(source) {
        vm.postImg = source.files[0]
        //console.log(source);
    }

	$scope.editUser = function()
	{
		$scope.edit = !$scope.edit;
	}

	  function updateStatus() {
	    apiService.getStatus().$promise.then(function(result) 
	    {

	      console.log('userProfile.js, inside get status in update status: ', result)

	      $scope.username = result.username
	      $scope.message = result.status
	      $scope.profileStatus = result.status
	      $scope.profileName = result.username//result.profiles[0]["username"]

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
}
})();

