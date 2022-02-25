app.controller('startquizController', function($scope, $routeParams, $rootScope){
    $rootScope.subjects.forEach(subject => {
        if(subject.Id == $routeParams.id){
            $scope.subject = angular.copy(subject);
            return;
        }
    });

    $scope.test = function(){
        //console.log("start quiz func >>>", $rootScope.student);
        if($rootScope.student == null){
            Swal.fire({
                icon: 'error', 
                title: 'Bạn chưa đăng nhập!',
                text: 'Vui lòng quay lại sau khi đăng nhập'
            }) 
        } else {
            Swal.fire({
                title: 'Bắt đầu thi!',
                text: 'Are you ready?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes',
                cancelButtonText: 'No'
            }).then((result)=>{
                console.log(result);
                if(result.value){
                    window.location.href = "#!quiz/"+$scope.subject.Id;
                }
            })
        }
    }
})