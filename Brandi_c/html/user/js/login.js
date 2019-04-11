
	function init($scope,$http) {
		if(___user != null) {
			window.location = "/";
		}
	}

    app.controller('loginCtrl', async function($scope,$http) {
        $scope.login = function() {
            $http.post(HOST+"/auth",{
				/*/user/auth*/
                email: $scope.email,
                password: $scope.password
            }).then(function(response){
				if(response.data.error == "1") {
					$scope.mensagem=response.data.message;
                }else {
					window.location="/";
				}
            })

            
        };
		
    });   