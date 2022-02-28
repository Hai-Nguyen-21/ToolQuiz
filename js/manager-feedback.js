app.controller('managerfeedbackController', function($scope, $rootScope, $http){

    $scope.mailR = {}
    $scope.sendInfo = function(id){
        $rootScope.mails.forEach(mail => {
            if(mail.id == id){
                $scope.mailR = angular.copy(mail);
            }
        });
        $scope.fn = $scope.mailR.fullname;
        $scope.subject = $scope.mailR.subject;
        $scope.note = $scope.mailR.note;
    }

    $scope.read = function(id){
        $http.put($rootScope.apiMail+'/'+id, {
            'status': false
        })
    }
})