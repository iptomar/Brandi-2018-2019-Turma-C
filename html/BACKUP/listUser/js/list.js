
var lista=null;
    app.controller('listCtrl', async function($scope,$http) {
		
		
		//updates credentials
		await checkAuth($http, $scope);
		
		if(___user == null) {
			//user not defined goes to login page
			window.location = "../login";
		} else if(___user.type_user != ADMIN_TYPE) {
			//user type not admin goes to index
			window.location = "../";
		}
		
         $http.get(HOST+"/userlist",{           
            }).then(function(response){
				//show message
                console.log(response);
				lista= response.data.res.users;
				$scope.lista = lista;
                
            });
    });