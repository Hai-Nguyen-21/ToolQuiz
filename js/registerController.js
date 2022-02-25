app.controller('registerController', function($rootScope, $scope, $http){

    $scope.register = function(){
        $http.post($rootScope.apiStudents, {
            'username': $scope.studentR.username,
            'password': $scope.studentR.password,
            'fullname': $scope.studentR.fullname,
            'email': $scope.studentR.email,
            'gender': $scope.studentR.gender,
            'birthday': $scope.studentR.birthday,
            'schoolfee': Number($scope.studentR.schoolfee),
            'marks': 0,
            'role': 0 // 0 là GV, 1 là sinh viên

        }).then(function(res){
            console.log(res);
        })
        $scope.studentR = {};
        $scope.confirm_password = '';
        Swal.fire({
            icon: 'success',
            title: 'Đăng ký thành công!',
            text: 'Quay lại trang chủ!',
            showConfirmButton: false,
            closeOnClickOutside: false,
            allowOutsideClick: false,
            timer: 1600
        });
        window.location.href = "#!index";
    }
})