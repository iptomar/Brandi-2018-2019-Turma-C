	
	function init($scope,$http) {
		if(___user == null) {
			window.location = "/";
		}
		//get Other Scope
		var $dadosScope = getScopeOf('dadosCtrl');
        $dadosScope.email = ___user.email;
        $dadosScope.full_name = ___user.full_name;
        $dadosScope.address = ___user.address;
        $dadosScope.type_user = ___user.type_user;
		$dadosScope.$apply();
	}

    app.controller('dadosCtrl', async function($scope,$http) {
		
    });