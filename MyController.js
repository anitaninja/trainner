angular
    .module('app')
    .controller('MyController',MyController);

/** @ngInject */
function MyController($scope){
    $scope.name='ruta';
}