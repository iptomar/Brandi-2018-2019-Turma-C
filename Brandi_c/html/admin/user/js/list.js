	function init($scope,$http) {
		if(___user == null) {
			//user not defined goes to login page
			window.location = "/user/login";
		} else if(___user.type_user != ADMIN_TYPE) {
			//user type not admin goes to index
			window.location = "/";
		}
	}
	
	var lista=null;
    app.controller('listCtrl', async function($scope,$http) {
         $http.get(HOST+"/userlist",{           
            }).then(function(response){
				//show message
				lista= response.data.res.users;
				$scope.lista = lista;
            });
    });