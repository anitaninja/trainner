/**
 * Created by lcom64_one on 1/28/2017.
 */
angular
    .module('myApp')
    .controller('controller', controller);
/** @ngInject */
function controller($scope, $http) {
    $scope.flag = 0;

    //Load data
    $http.get('/Emp')
        .success(function (data) {
            $scope.datas = data;
        })
        .error(function (data) {
            console.log('Error: ' + data);
        });
    $scope.deleteUser = function (id) {
        $http.delete('/Emp/' + id)
            .success(function (data) {
                $scope.datas = data;
                console.log(data);
                $http.get('/Emp')
                    .success(function (data) {
                        $scope.datas = data;
                    })
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    $scope.updateUser = function (id) {

        $http.get('/Emp/' + id)
            .success(function (data) {
                $scope.users = data;
                console.log(data);
                $scope.formData = {
                    _id: $scope.users._id,
                    name: $scope.users.EmpName,
                    salary: $scope.users.EmpSalary,
                    dept: $scope.users.EmpDept
                }
                $scope.flag = 1;
                console.log(data);
            });


    };
    $scope.createUser = function () {

        console.log($scope.formData.pic);
        // Grabs all of the text box fields
        var userData = {
            EmpName: $scope.formData.name,
            EmpImage: $scope.formData.pic,
            EmpSalary: parseInt($scope.formData.salary),
            EmpDept: $scope.formData.dept

        };
        if ($scope.flag == 1) {
            $scope.flag = 0;

            $http.put('/Emp/' + $scope.formData._id, userData)
                .success(function (data) {
                    console.log(data);
                    console.log('Data updated');
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
        }
        else {
            // Saves the user data to the db
            $http.post('/Emp', userData)
                .success(function (data) {
                    $scope.formData.name = "";
                    $scope.formData.salary = "";
                    $scope.formData.dept = "";
                    console.log('Data inserted');
                    console.log(data);
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
        }

    };
}