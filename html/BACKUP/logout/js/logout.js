function init($scope,$http) {
            $http.get(HOST+"/logout",{
                
            }).then(function(response){
				
					$scope.mensagem=response.data.message;
					document.querySelector("#butContainer").innerHTML="";
            });
}