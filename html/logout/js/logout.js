    app.controller('logoutCtrl', async function($scope,$http) {
		
		
        
        $scope.logout = function() {
            $http.get(HOST+"/logout",{
                
            }).then(function(response){
				
					$scope.mensagem=response.data.message;
					
            })

            
        };
		
    });   