
var app = angular.module('brandic', []);
    app.controller('submitCab1Ctrl', function($scope,$http) {
        /*$scope.designation = "objecto";
        $scope.procLCRMid = 0;
		$scope.procCEARCid = 0;
        $scope.coordenador = "Fernando dos Santos Antunes";
		$scope.procLCRMdate= new Date();
		$scope.procLCRMentrydate= new Date();
		$scope.procCEARCdate= new Date();
		$scope.procCEARCentrydate= new Date();*/
		
        
        $scope.subFich = function() {
            //alert("Username: "+ $scope.email+" \nPassword: "+$scope.password);
			let date1=new Date($scope.procLCRMdate);
			let procLCRMdate_formated=formated(date1);
			date1=new Date($scope.procLCRMentrydate);
			let procLCRMentrydate_formated=formated(date1);
			date1=new Date($scope.procCEARCdate);
			let procCEARCdate_formated=formated(date1);
			date1=new Date($scope.procCEARCentrydate);
			let procCEARCentrydate_formated=formated(date1);
			
			
            $http.post(HOST+"/naoTaFeito",{
                designation: $scope.designation,
                procLCRMid: $scope.procLCRMid,
				procCEARCid: $scope.procCEARCid,
				coordenador: $scope.coordenador,
				procLCRMdate: procLCRMdate_formated,
				procLCRMentrydate: procLCRMentrydate_formated,
				procCEARCdate: procCEARCdate_formated,
				procCEARCentrydate:procCEARCentrydate_formated
				
            }).then(function(response){
                console.log(response);
				response.data.error==1?
					$scope.mensagem=response.data.message
						:$scope.mensagem=response.data.message;
                
            })

            
        };
    });
	function formated(date){
		return date.getDay()+"-"+date.getMonth()+"-"+date.getYear();
	}