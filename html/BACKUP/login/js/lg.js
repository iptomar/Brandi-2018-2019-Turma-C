	function init($scope,$http) {
		if(___user != null) {
			window.location = "../index";
		}
		document.querySelector("#butContainer").innerHTML="";
	}

    app.controller('loginCtrl', async function($scope,$http) {
		
        /*$scope.email = "teste123456@ipt.pt";
        $scope.password = "123456";*/
        $scope.login = function() {
            //alert("Username: "+ $scope.email+" \nPassword: "+$scope.password);
            $http.post(HOST+"/auth",{
				/*/user/auth*/
                email: $scope.email,
                password: $scope.password
            }).then(function(response){
				if(response.data.error == "1") {
					$scope.mensagem=response.data.message;
					//window.location="../index";
                }else {
					window.location="../index";
				}
            })

            
        };
		
    });   