/**
 * Created by lcom64_one on 1/28/2017.
 */
angular.module('datepickerBasicUsage', ['ngMaterial', 'ngMessages']).controller('AppCtrl', function () {
    this.myDate = new Date();
    this.isOpen = false;
});
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
                    dept: $scope.users.EmpDept,
                    date:$scope.users.EmpJdate
                }
                $scope.flag = 1;
                console.log(data);
            });


    };

    $scope.photoUpload = function (files) {
        $scope.imgFile = files[0];
    };


    $scope.createUser = function () {

        var userData = {
            EmpName: $scope.formData.name,
            //      EmpImage: $scope.imgFile,
            EmpSalary: parseInt($scope.formData.salary),
            EmpDept: $scope.formData.dept,

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

            var file = $scope.myFile;
            var uploadUrl = "/Emp";
            var fd = new FormData();

            fd.append('EmpName', $scope.formData.name);
            fd.append('EmpImage', file);
            fd.append('EmpSalary', parseInt($scope.formData.salary));
            fd.append('EmpDept', $scope.formData.dept);
            fd.append('Empgender', $scope.formData.gender);
            fd.append('EmpJdate', $scope.formData.date);

            $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
                .success(function () {
                    $scope.formData.name = "";
                    $scope.formData.salary = "";
                    $scope.formData.date = "";
                    console.log('Data inserted');
                    console.log("success!!");
                })
                .error(function () {
                    console.log("error!!");
                });
        }

    };
}