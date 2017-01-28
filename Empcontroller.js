/**
 * Created by lcom64_one on 1/27/2017.
 */
angular
    .module('myApp')
    .controller('controller', controller);
/** @ngInject */
function controller($scope, $http) {
        var flag=0;
    //Load data
    $http.get('/Emp')
        .success(function(data) {
            $scope.datas = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    $scope.deleteUser = function(id) {
           $http.delete('/Emp/' + id)
               .success(function (data) {
                       $scope.datas = data;
                       console.log(data);
                         $http.get('/Emp')
                       .success(function(data) {
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
                $scope.formData={
                        name :  $scope.users.EmpName,
                       salary : $scope.users.EmpSalary,
                       dept : $scope.users.EmpDept
                }
                flag=1;
                console.log(data);
            });


    };
    $scope.createUser = function () {


        if(flag==1)
        {
            flag=0;

            $http.put('/Emp/'+ $scope._id ,$scope.formData)
                .success(function (data) {
                    console.log(data);
                })
        }
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