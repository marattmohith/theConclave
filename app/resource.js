  (function() {
    angular.module('conclaveModule')
      .constant('apiURL', 'http://localhost:8000')//https://conclaveserver.herokuapp.com')//
      .factory('apiService', apiService)

  function apiService($resource, apiURL, $http) {
    $http.defaults.withCredentials = true

    function resourceUploadFile(data)  {
          var fd = new FormData() 
          fd.append('image', data.img)
          fd.append('body', data.body)
          return fd;
      }
  	return $resource(apiURL + '/:endpoint/:user/:id/:users', { }, 
  		{
  			login    : { method:'POST', params: {endpoint: 'login'  } },
  			logout   : { method:'PUT' , params: {endpoint: 'logout' } },
  			getStatus: { method:'GET' , params: {endpoint: 'status' } },
        sample   : { method:'GET' , params: {endpoint: 'sample' } },
        posts    : { method:'GET' , params: {endpoint: 'posts' } },
        getPicture  : { method:'GET' , params: {endpoint: 'picture' } },
        updateStatus: { method:'PUT', params: {endpoint: 'status' } },
        getEmail : { method:'GET' , params: {endpoint: 'email' } },
        getZipcode : { method:'GET' , params: {endpoint: 'zipcode' } },
        putPassword : { method:'PUT' , params: {endpoint: 'password' } },
        putZipcode : { method:'PUT' , params: {endpoint: 'zipcode' } },
        putEmail : { method:'PUT' , params: {endpoint: 'email' } },
        putPicture : { method:'PUT' , params: {endpoint: 'picture' } },
        publishPostFull: { 
          method: 'POST', 
          headers: { 'Content-Type': undefined },
          transformRequest: resourceUploadFile,
          params : {endpoint: 'post'}
        },
        publishPost  : { method: 'POST', params: {endpoint: 'post'    } },
        getFollowing : { method: 'GET', params:{endpoint: 'following'}},
        putFollowing : { method: 'PUT', params:{endpoint: 'following'}},
        deleteFollowing : { method: 'DELETE', params:{endpoint: 'following'}},
        updatePost: { method: 'PUT', params:{endpoint: 'posts'}},
        register: { method: 'POST', params:{endpoint: 'register'}},
      })		
  }
  
  })();
  
