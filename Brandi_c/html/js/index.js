
app.controller('indexCtrl', async function($scope,$http) {
		
		await checkAuth($http);
		if(___user != null && ___user.type_user == ADMIN_TYPE) {
			
		}
        
        $scope.desenhaBut = function() {
            
            $http.post(HOST+"/auth",{
                email: $scope.email,
                password: $scope.password
            }).then(function(response){
				if(response.data.error == "1") {
					$scope.mensagem=response.data.message;
                }else {
					window.location="../";
				}
            })

            
        };
    });