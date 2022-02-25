app.controller('managerController', function($rootScope, $scope, $http){
    $scope.studentM = {};
    $scope.addUser = function(){
        if($rootScope.student == null){
            Swal.fire({
                icon: 'warning',
                title: 'Vui lòng đăng nhập',
                text: 'Quay lại sau khi đăng nhập!',
                showConfirmButton: false,
                closeOnClickOutside: false,
                allowOutsideClick: false,
                timer: 1600
            });
            window.location.href = '#!login';
        } else {
            $http.post($rootScope.apiStudents, {
                'username': $scope.studentM.username,
                'password': $scope.studentM.password,
                'fullname': $scope.studentM.fullname,
                'email': $scope.studentM.email,
                'gender': $scope.studentM.gender,
                'birthday': $scope.studentM.birthday,
                'schoolfee': Number($scope.studentM.schoolfee),
                'marks': 0,
                'role': $scope.studentM.role
            })
            $scope.studentM = {};
            Swal.fire({
                icon: 'success',
                title: 'Thêm tài khoản thành công!',
                showConfirmButton: false,
                closeOnClickOutside: false,
                allowOutsideClick: false,
                timer: 1600
            });
        }
    }

    $scope.studentU = {}
    $scope.sendInfo = function(id){
        //console.log(id-1);
        $rootScope.students.forEach(student => {
            if(student.id == id){
                $scope.studentU = angular.copy(student);
            }
        });
        $scope.idD = id;
    }

    $scope.update = function(id){
        $http.put($rootScope.apiStudents+'/'+id, {
            'username': $scope.studentU.username,
            'fullname': $scope.studentU.fullname,
            'email': $scope.studentU.email,
            'gender': $scope.studentU.gender,
            'birthday': $scope.studentU.birthday,
            'schoolfee': Number($scope.studentU.schoolfee),
            'marks': 0,
            'role': $scope.studentU.role
        })
        $scope.studentM = {};
        Swal.fire({
            icon: 'success',
            title: 'Sửa tài khoản ' + $scope.studentU.fullname + ' thành công!',
            showConfirmButton: false,
            closeOnClickOutside: false,
            allowOutsideClick: false,
            timer: 1600
        });
    }

    $scope.delete = function(id){
        //$rootScope.students.splice(id)
        console.log('delete ' + id);
        $http.delete($rootScope.apiStudents+'/'+id);
        Swal.fire({
            icon: 'success',
            title: 'Xóa tài khoản thành công!',
            showConfirmButton: false,
            closeOnClickOutside: false,
            allowOutsideClick: false,
            timer: 1600
        });
    }

})