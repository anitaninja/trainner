/**
 * Created by lcom64_one on 2/6/2017.
 */
    // create the module and name it scotchApp
var scotchApp = angular.module('scotchApp', ['ngRoute']);

scotchApp.config([ '$routeProvider',
    function($routeProvider, $locationProvider) {


        $routeProvider.when('/', {
                templateUrl : 'pages/home.html',
                controller  : 'mainController'
        })
        $routeProvider.when('/about', {
            templateUrl : 'pages/about.html',
            controller : 'LoginController'
        })
        $routeProvider.when('/homeuser', {
            templateUrl : 'pages/homeuser.html',
            controller  : 'homeuserController'
        })
        $routeProvider.when('/deshbord', {
            templateUrl : 'pages/deshbord.html',
            controller  : 'deshbordController'
        })



        // $locationProvider.when('/about', {
        //     templateUrl : 'pages/about.html',
        //     controller  : 'aboutController'
        // });
    }
]);

// create the controller and inject Angular's $scope

scotchApp.controller('mainController', function($scope) {
    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
});

scotchApp.controller('LoginController', function($scope,$location) {
    $scope.login = function() {
        var username = $scope.user.name;
        var password = $scope.user.password;
        if (username == "admin" && password == "admin") {
            $location.path("/deshbord" );
        } else {
            alert('invalid username and password');
        }
    };
});

scotchApp.controller('deshbordController', function($scope,$http) {

    $http({
        method: 'GET',
        url: 'http://localhost:3000/Emp'
    }).then(function (data) {
        $scope.datas = data.data;
    }, function (error) {
        console.log('Error: ');
    });

});

scotchApp.controller('userentryController', function($scope) {
    $scope.message = 'userentryController';
});


scotchApp.controller('homeuserController', function($scope) {
    $scope.message = 'homeuserController';
});