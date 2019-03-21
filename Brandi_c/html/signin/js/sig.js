var app = angular.module('brandic', []);
    app.controller('signInCtrl', function($scope,$http) {
        $scope.email = "teste123456@ipt.pt";
        $scope.password = "123456";
		$scope.fullname = "Antonio Oliveira Salazar";
        $scope.address = "No Coracao de todo o verdadeiro portugues";
		
        $scope.cellphone = 666;
        
        $scope.signIn = function() {
            //alert("Username: "+ $scope.email+" \nPassword: "+$scope.password);
			let date=$scope.byear+"-"+$scope.bmonth+"-"+$scope.bday;
            $http.post(HOST+"/api/register",{
                email: $scope.email,
                password: $scope.password,
				fullname: $scope.fullname,
				address: $scope.address,
				birthday: date,
				cellphone: $scope.cellphone,
				usertypeid: $scope.usertypeid
				
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