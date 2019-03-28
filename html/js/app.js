//link local
const HOST = "/api";
//const para comparacao
const ADMIN_TYPE = "Admin";

const app = angular.module('brandic', []);

//saves user info (is null if not authenticated)
var ___user=null;

//changes ___user value to match auth state 
async function checkAuth($http, $scope){
	if(___user != null) return;
	await $http.get(HOST+"/auth",{}).then(function(response){
		if(response.data.error == "0") {
			___user = response.data.res;
			
		}
	});
}

function removeUserData($scope) {
	//removes user data
	___user=null;
	
}

