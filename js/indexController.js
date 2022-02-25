app.controller('indexController', function($scope, $rootScope){
    $scope.count = 0;
    $scope.pageCount = Math.ceil($rootScope.subjects.length / 3);
    $scope.prev = function(){
        if($scope.count > 0){
            $scope.count -= 3;
        }
    }
    $scope.next = function(){
        if($scope.count < ($scope.pageCount - 1) * 3){
            $scope.count += 3;
        }
    }
})