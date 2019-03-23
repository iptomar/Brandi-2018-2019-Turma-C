
var app = angular.module('brandic', []);
    app.controller('submitCab1Ctrl', function($scope,$http) {
        $scope.designation = "objecto";
        $scope.procLCRMid = 0;
		$scope.procCEARCid = 0;
        $scope.coordenador = "Fernando dos Santos Antunes";
		
        
        $scope.subFich = function() {
            //alert("Username: "+ $scope.email+" \nPassword: "+$scope.password);
			let date=$scope.byear+"-"+$scope.bmonth+"-"+$scope.bday;
            $http.post(HOST+"/register",{
                designation: $scope.designation,
                procLCRMid: $scope.procLCRMid,
				procCEARCid: $scope.procCEARCid,
				coordenador: $scope.coordenador
				
            }).then(function(response){
                console.log(response);
				response.data.error==1?
					$scope.mensagem=response.data.message
						:$scope.mensagem=response.data.message;
                
            })

            
        };
    });