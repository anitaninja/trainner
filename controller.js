/**
 * Created by lcom64_one on 1/27/2017.
 */
angular
    .module('myApp')
    .controller('controller', controller);
/** @ngInject */
function controller($scope, $http) {

    //Load data
    $http.get('/Emp')
        .success(function(data) {
            $scope.datas = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    $scope.deleteUser = function (id) {
           $http.delete('/Emp/' + id)
               .success(function (data) {
                       $scope.datas = data;
                       console.log(data);
                   })
                .error(function (data) {
                    console.log('Error: ' + data);
                    });
    };
    $scope.createUser = function () {

        // Grabs all of the text box fields
        var userData = {
            EmpName: $scope.formData.name,
            EmpSalary: $scope.formData.salary,
            EmpDept: $scope.formData.dept

        };


        // Saves the user data to the db
        $http.post('/Emp', userData)
            .success(function (data) {

                $scope.formData.name = "";
                $scope.formData.salary = "";
                $scope.formData.dept = "";

                console.log('Data inserted');

            })
            .error(function (data) {
                console.log('Error: ' + data);
            });

    };
}