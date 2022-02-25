app.controller('loginController', function($scope, $rootScope){
      
    $scope.login = function(){
        var check = true;
        $rootScope.students.forEach(student => {
            if(student.username == $scope.username){
                if(student.password == $scope.password){
                    if(student.role=='false'){
                        Swal.fire({
                            icon: 'success',
                            title: 'Đăng nhập thanh công!',
                            text: 'Quay lại trang chủ!',
                            showConfirmButton: false,
                            closeOnClickOutside: false,
                            allowOutsideClick: false,
                            timer: 1600
                        });
                        $rootScope.indexStudent = student.index;
                        $rootScope.student = student;
                        window.location.href = '#!index';
                        check = false;
                        $rootScope.flag = true;
                        $rootScope.st = true;
                        return;
                    } else {
                        Swal.fire({
                            icon: 'success',
                            title: 'Đăng nhập thanh công!',
                            text: 'Quay lại trang chủ!',
                            showConfirmButton: false,
                            closeOnClickOutside: false,
                            allowOutsideClick: false,
                            timer: 1600
                        });
                        $rootScope.indexStudent = student.index;
                        $rootScope.student = student;
                        window.location.href = '#!manager-user';
                        check = false;
                        $rootScope.flag = false;
                        $rootScope.st = true;
                        return;
                    }
                    
                };
            };
        });
        if(check == true){
            Swal.fire({
                icon: 'error',
                title: 'Đăng nhập thất bại',
                text: 'Vui lòng thử lại'
            })
        }
    }
})