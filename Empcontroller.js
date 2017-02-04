/**
 * Created by lcom64_one on 1/28/2017.
 */

angular.module('app',[])
    .controller('registerController', registerController);
/** @ngInject */

registerController.$inject = ['$scope', '$http'];
function registerController($scope, $http) {
    $scope.flag = 0;
    //Load State
    $scope.loadState=function(){

        $http({
            method: 'GET',
            url: '/State'
        }).then(function (data){

            $scope.slists = data.data;
            console.log($scope.slists)
        },function (error){
            console.log('Error: ' + $scope.slists);
        });
    }

    $scope.loadState();
    //Load city

    $http({
        method: 'GET',
        url: '/City'
    }).then(function (data){
        $scope.clists = data;
    },function (error){
        console.log('Error: ' + data);
    });

    //Load data
    $http({
        method: 'GET',
        url: '/Emp'
    }).then(function (data){
        $scope.datas = data.data;
        debugger
    },function (error){
        console.log('Error: ');
    });

    //Load State
    $scope.FillCity = function (id) {
        $http({
            method: 'GET',
            url: '/filter/'+id
        }).then(function (data){
            $scope.citys = data;
        },function (error){
            console.log('Error: ' + data);
        });
    };
    $scope.deleteUser = function (id) {

        $http({
            method: 'DELETE',
            url: '/Emp/'+id
        }).then(function (data){
            $scope.datas = data;
        },function (error){
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
                    date: $scope.users.EmpJdate
                }
                $scope.flag = 1;
                console.log(data);
            });


    };

    $scope.photoUpload = function (files) {
        $scope.imgFile = files[0];
    };


    $scope.createUser = function () {

        var file = $scope.myFile;
        var uploadUrl = "/Emp";
        var fd = new FormData();

        fd.append('EmpName', $scope.formData.name);
        fd.append('EmpImage', file);
        fd.append('EmpEmail', $scope.formData.email);
        fd.append('EmpState', $scope.formData.State);
        fd.append('EmpCity', $scope.formData.city);
        fd.append('Empgender', $scope.formData.gender);
        fd.append('EmpBOD', $scope.formData.date);
        fd.append('EmpActive', $scope.formData.active);

        if ($scope.flag == 1) {
            $scope.flag = 0;

            $http.put('/Emp/' + $scope.formData._id, fd)
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
            fd.append('EmpEmail', $scope.formData.email);
            fd.append('EmpState', $scope.formData.state);
            fd.append('EmpCity', $scope.formData.city);
            fd.append('Empgender', $scope.formData.gender);
            fd.append('EmpBOD', $scope.formData.date);
            fd.append('EmpActive', $scope.formData.active);

            $http({
                method: 'POST',
                url: '/Emp'
            }).then(function (success){
                $scope.datas = data;
            },function (error){
                console.log('Error: ' + data);
            });

            $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
                .success(function () {
                    $scope.formData.name = "";
                    $scope.formData.email = "";
                    $scope.formData.state = "";
                    $scope.formData.city = "";
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