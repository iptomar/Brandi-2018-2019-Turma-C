
    app.controller('signUpCtrl', async function($scope,$http) {
		//can be commented, test purposes
        $scope.email = "teste123456@ipt.pt";
        $scope.password = "123456";
		$scope.fullname = "Manuel Mircolino dos Santos";
        $scope.address = "No Coracao de todo o verdadeiro portugues";
		let data= new Date()
		$scope.dateCamp = data;
        $scope.cellphone = 900000000;
		//select array of objects
		$scope.names=[{tipo:"Admin", valor:1}, {tipo:"User",valor:2}];
		
		//updates credentials
		await checkAuth($http, $scope);
		
		if(___user == null) {
			//user not defined goes to login page
			window.location = "../login/login";
		} else if(___user.type_user != ADMIN_TYPE) {
			//user type not admin goes to index
			window.location = "../";
		}
		
        $scope.signup = function() {
			//handles the posting of the form data
			let date =  new Date($scope.dateCamp);
			let dateStr = date.getYear().toString()+"-"+ date.getMonth().toString()+"-"+date.getDay().toString();
            $http.post(HOST+"/register",{
                email: $scope.email,
                password: $scope.password,
				fullname: $scope.fullname,
				address: $scope.address,
				birthday: dateStr,
				cellphone: $scope.cellphone,
				usertypeid: $scope.usertypeid.valor
				
            }).then(function(response){
				//show message
                console.log(response);
				$scope.mensagem=response.data.message;
                
            })

            
        };
    });