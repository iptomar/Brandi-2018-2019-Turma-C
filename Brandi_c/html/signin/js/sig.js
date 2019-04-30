
    app.controller('signInCtrl', async function($scope,$http) {
		await checkAuth($http);
		if(___user == null) {
			window.location = "../login/login";
		} else if(___user.type_user != ADMIN_TYPE) {
			window.location = "../";
		}
        $scope.email = "teste123456@ipt.pt";
        $scope.password = "123456";
		$scope.fullname = "Manuel Mircolino dos Santos";
        $scope.address = "No Coracao de todo o verdadeiro portugues";
		$scope.dateCamp = new Date();
        $scope.cellphone = 900000000;
        $scope.usertypeid = 1;
	//$scope.names=["Admin", "User"];
        $scope.signIn = function() {
           
			let date =  new Date($scope.dateCamp);
			let dateStr = date.getYear()+"-"+ date.getMonth()+"-"+date.getDay();
            $http.post(HOST+"/register",{
                email: $scope.email,
                password: $scope.password,
				fullname: $scope.fullname,
				address: $scope.address,
				birthday: dateStr,
				cellphone: $scope.cellphone,
				usertypeid: $scope.usertypeid
				
            }).then(function(response){
                console.log(response);
				$scope.mensagem=response.data.message;
                
            })

            
        };
    });