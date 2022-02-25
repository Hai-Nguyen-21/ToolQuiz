app.controller('forgotpasswordController', function ($scope, $rootScope) {
    $scope.getPass = function () {
        var check = true;

        for(const student of $rootScope.students){
            if(student.email == $scope.email && student.username == $scope.username){
                Swal.fire({
                    icon: 'success',
                    title: 'Lấy lại mật khẩu thành công!',
                    text: 'Mật khẩu của bạn là: ' + student.password,
                });
                check= false;
                return;
            }
        }

        if (check) {
            Swal.fire({
                icon: 'error',
                title: 'Lấy lại mật khẩu thất bại, vui lòng thử lại!',
                text: 'Vui lòng nhập lại thông tin'
            })
        }
    }
})