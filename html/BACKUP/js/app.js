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
		/*/user/info*/
		if(response.data.error == "0") {
			___user = response.data.res;
			//console.log(___user);
		}
	});
}

function removeUserData($scope) {
	//removes user data
	___user=null;
}

	function formatedDate(date){
		return date.getYear()+"-"+date.getMonth()+"-"+date.getDay();
	}

app.controller('app', async function($scope,$http) {
		//fazer menu em angular
		await checkAuth($http);
		if(___user != null) {
			if(___user.type_user == ADMIN_TYPE) {
				document.querySelector("#butContainer").insertAdjacentHTML('afterbegin','<a 	id="signupBut" class="btn btn-light action-button"  	href="/signup" 	role="button"		>Sign Up</a>');
			}
			document.querySelector("#butContainer").insertAdjacentHTML('afterbegin','<a href="../ficha/" >Ficha </a><a href="../listUser/" >Lista Users </a><a href="../dadosPessoais" >Dados Pessoais </a><span>Welcome, '+___user.full_name+'</span><a 	 id="logoutBut" class="btn btn-light action-button" 	href="/logout" 	role="button" 		>Log Out</a>');	
		}else {
			document.querySelector("#butContainer").insertAdjacentHTML('afterbegin','<a 	 id="loginBut" class="btn btn-light action-button"  	href="/login"		role="button"		>Log In</a>');	
		}
		init($scope,$http);
});
	
	
function getScopeOf(controller) {
	return angular.element(document.querySelector('[ng-controller="'+controller+'"]')).scope();
}