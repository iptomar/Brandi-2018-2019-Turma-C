var app = angular.module('brandic', []);
    app.controller('loginCtrl', function($scope,$http) {
        $scope.email = "teste123456@ipt.pt";
        $scope.password = "123456";
        $scope.login = function() {
            //alert("Username: "+ $scope.email+" \nPassword: "+$scope.password);
            $http.post(HOST+"/auth",{
                email: $scope.email,
                password: $scope.password
            }).then(function(response){
                console.log(response);
                if(response.data.error==1){
                    $scope.mensagem=response.data.message;
                }if(response.data.error==0){
                    $scope.mensagem=response.data.message;
                }
            })

            
        };
    });