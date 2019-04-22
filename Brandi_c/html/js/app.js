//link local
const HOST = "http://brandic.devll.eu:61080/api";
//const para comparacao
const ADMIN_TYPE = "Admin";

const app = angular.module('brandic', []);

//saves user info (is null if not authenticated)
var ___user=null;


//changes ___user value to match auth state 
async function checkAuth($http, $scope){
	if(___user != null) return;
	try {
		await $http.get(HOST+"/auth",{}).then(function(response){
			/*/user/info*/
			if(response.data.error == "0") {
				___user = response.data.res;
				//console.log(___user);
			}
		});
	}catch {
		___user = null;
	}
}

function removeUserData($scope) {
	//removes user data
	___user=null;
}

function formatedDate(date){
	return date.getYear()+"-"+date.getMonth()+"-"+date.getDay();
}

app.controller('globalController', function($scope,$http) {
		$scope.global = {} //global variables
		$scope.global.defaultTemplate="/templates/default";
		$scope.global.header="/templates/header";
		$scope.global.admin="";
});

app.controller('menuController', async function ($scope, $http) {
		$scope.global.menu = document.querySelector("#navbarmenu");
		//verificamos o estado da autenticação
		await checkAuth($http);
		if(___user != null) {
			if(___user.type_user == ADMIN_TYPE) {
				$scope.global.menuAdmin = document.querySelector("#adminMenu");
				$scope.global.menuAdmin.innerHTML=
					`<li class="nav-item dropdown">
						<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						  Administrador
						</a>
						<div class="dropdown-menu" aria-labelledby="navbarDropdown">
						  <a class="dropdown-item" href="/admin/user/list">Listar Utilizadores</a>
						  <a class="dropdown-item" href="/admin/user/signup">Registar Utilizadores</a>
						  <a class="dropdown-item" href="#">Tipos de utilizador</a>
						  <div class="dropdown-divider"></div>
						  <a class="dropdown-item" href="#">Categorias</a>
						</div>
					</li>`
				;
			}
			//botao de logout com pedido do mesmo
			$scope.global.btLogOut = document.createElement("button");
			$scope.global.btLogOut.classList.add("btn", "btn-outline-success", "my-2", "my-sm-0");
			$scope.global.btLogOut.innerHTML = "Log out";
			$scope.global.btLogOut.onclick= function() {
				$http.get(HOST+"/logout",{        
				}).then(function(response){
					window.location ="/";
				}).catch(function(response) {
					
				});
			};
			$scope.global.menu.append($scope.global.btLogOut);
			$scope.global.menu.insertAdjacentHTML('afterbegin','<span style="margin-right: 10px;">Welcome, <a href="/user/info">'+___user.full_name.split(" ")[0]+'</a></span>');
		}else {
			$scope.global.menu.insertAdjacentHTML('afterbegin','<a class="btn btn-outline-success my-2 my-sm-0" href="/user/login">Log in</a>');
		}
		//depois do menu estar carregado e a verificação do utilizador estar feita,
		//chama-mos a função de init utilizada por outras páginas
		init($scope,$http);
});
	
function clearMenuBar() {
	getScopeOf("globalController").global.menu.innerHTML = "";
}
	
function getScopeOf(controller) {
	return angular.element(document.querySelector('[ng-controller="'+controller+'"]')).scope();
}
