/**
 * Created by lcom64_one on 1/28/2017.
 */

angular.module('app', ['ui.bootstrap'])
    .controller('registerController', registerController)
    .controller('ModalInstanceCtrl', ModalInstanceCtrl);
/** @ngInject */

registerController.$inject = ['$scope', '$http','$modal']
function registerController($scope, $http,$modal) {
    $scope.flag = 0;
    //Load State
    $scope.loadState = function () {

        $http({
            method: 'GET',
            url: '/State'
        }).then(function (data) {

            $scope.slists = data.data;
            console.log($scope.slists)
        }, function (error) {
            console.log('Error: ' + $scope.slists);
        });
    }

    $scope.loadState();
    //Load city

    $http({
        method: 'GET',
        url: '/City'
    }).then(function (data) {
        $scope.clists = data;
    }, function (error) {
        console.log('Error: ' + data);
    });

    //Load data
    $http({
        method: 'GET',
        url: '/Emp'
    }).then(function (data) {
        $scope.datas = data.data;
    }, function (error) {
        console.log('Error: ');
    });

    //Load State
    $scope.FillCity = function (id) {
        $http({
            method: 'GET',
            url: '/filter/' + id
        }).then(function (data) {
            $scope.citys = data.data;
        }, function (error) {
            console.log('Error: ');
        });
    };
    $scope.deleteUser = function (id) {

        $http({
            method: 'DELETE',
            url: '/Emp/' + id
        }).then(function (data) {
            $scope.datas = data;
        }, function (error) {
            console.log('Error: ' + data);
        });
    };
    $scope.updateUser = function (users) {

            var modalInstance = $modal.open({
            templateUrl: 'Edit.html',
            controller: ModalInstanceCtrl,
            resolve: {
                users: function () {
                    debugger
                    return users;
                }
            }
        });


    };
    $scope.photoUpload = function (files) {
        $scope.imgFile = files[0];
    };

    $scope.photoUpload = function (files) {
        $scope.imgFile = files[0];
    };
    $scope.createUser = function () {

        var file = $scope.myFile;
        var uploadUrl = "/Emp";
        var fd = new FormData($scope.formData.state);

            var file = $scope.myFile;
            var uploadUrl = "/Emp";
            var fd = new FormData();

            fd.append('EmpName', $scope.formData.name);
            fd.append('EmpImage', file);
            fd.append('EmpEmail', $scope.formData.email);
            fd.append('EmpState', 'Panjab');
            fd.append('EmpCity', $scope.formData.city);
            fd.append('Empgender', $scope.formData.gender);
            fd.append('EmpBOD', $scope.formData.date);
            fd.append('EmpActive', $scope.formData.active);


            $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).then(function (success) {
                $scope.formData.name = "";
                $scope.formData.email = "";
                $scope.formData.state = "";
                $scope.formData.city = "";
                $scope.formData.date = "";
                $scope.datas = success.data;
                console.log('Data inserted');
                //console.log(success.data);
            }, function (error) {
                console.log('Error: ');
            });



    };
}

ModalInstanceCtrl.$inject = ['$scope','$http','$modalInstance','users']
function ModalInstanceCtrl ($scope, $http, $modalInstance, users)
{
    $scope.formdata=[];
    $scope.formdata=users?angular.copy(users):{};
    alert($scope.formdata.EmpName);
    $scope.update = function () {

        var fd = new FormData();

        fd.append('EmpName', $scope.formdata.EmpName);
        fd.append('EmpImage', file);
        fd.append('EmpEmail', $scope.formdata.EmpEmail);
        fd.append('EmpState', 'Panjab');
        fd.append('EmpCity', $scope.formdata.EmpCity);
        fd.append('Empgender', $scope.formdata.Empgender);
        fd.append('EmpBOD', $scope.formdata.EmpBOD);
        fd.append('EmpActive', $scope.formdata.EmpActive);

        Upload.upload(fd,{
            url: '/Upload_Image/EmpProfilePic/' + $scope._id,
            method: 'PUT'
        }).then(function (response) {

            $scope.formData=response.data

            $modalInstance.dismiss();


        })
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};


