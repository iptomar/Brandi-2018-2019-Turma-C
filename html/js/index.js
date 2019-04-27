
app.controller('indexCtrl', async function($scope,$http) {
		
		await checkAuth($http);
		if(___user != null && ___user.type_user == ADMIN_TYPE) {
				//show signup button
				$scope.buttonSignUp=true;
		}
        //desenha botoes WIP
        $scope.desenhaBut = function() {
            
            $http.get(HOST+"/auth",{})//
			.then(function(response){
				if(response.data.error == "1") {
					//nao autenticado
					$scope.buttonLogin=true;
					$scope.buttonLogout=false;
                }
				else {
					// autenticado
					$scope.buttonLogout=true;
					$scope.buttonLogin=false;
				}
            });

            
        };
    });
	
	
							