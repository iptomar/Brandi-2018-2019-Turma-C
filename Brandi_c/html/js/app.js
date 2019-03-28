const HOST = "/api";
const ADMIN_TYPE = "Admin";
const app = angular.module('brandic', []);
var ___user=null;
async function checkAuth($http){
	if(___user != null) return;
	await $http.get(HOST+"/auth",{}).then(function(response){
		if(response.data.error == "0") {
			___user = response.data.res;
		}
	});
}

function removeUserData() {
	___user=null;
}
