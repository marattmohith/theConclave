(function() {
  angular.module('conclaveModule', ['ngRoute', 'ngResource'])
    .config(config)

var test = "hello";

function config($routeProvider) {
	$routeProvider
	.when('/posts', {
		templateUrl: 'mainPageTabs/posts.html',
		controller: 'userPosts'
	})
	.when('/profile', {
		templateUrl: 'mainPageTabs/profile.html',
		controller: 'userProfile'
	})
	.otherwise({
	  		redirectTo: '/posts'
	})
}

})();