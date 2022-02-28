app.controller('feedbackController', function($scope, $rootScope, $http){

    $scope.send = function(){
        $http.post($rootScope.apiMail, {
            'id_student': $rootScope.student.id,
            'fullname': $scope.feedback.fullname,
            'email': $scope.feedback.email,
            'subject': $scope.feedback.subject,
            'note': $scope.feedback.note,
            'time': new Date().toLocaleString(),
            'status': true,
        }).then(function(res){
            console.log(res);
        })
        $scope.feedback = {};
        Swal.fire({
            icon: 'success',
            title: 'Gửi feedback thành công!',
            text: 'Bạn hãy đợi liên lạc từ phòng Đào tạo nhé!',
            showConfirmButton: false,
            closeOnClickOutside: false,
            allowOutsideClick: false,
            timer: 1600
        });
    }
})