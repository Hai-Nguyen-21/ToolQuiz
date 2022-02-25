app.controller('updateacountController', function($rootScope, $scope, $http){
    $scope.updateProfile = function(id){
        $rootScope.students[$rootScope.indexStudent] = angular.copy($rootScope.student);
        $http.put($rootScope.apiStudents+'/'+id, $rootScope.student).then(function(response){
            if(response.data){
                Swal.fire({
                    icon: 'success',
                    title: 'Cập nhật thông tin thành công'
                }) 
                window.location.href = "#!index";
            }
        }, function(response){
            //console.log(response);
            Swal.fire({
                icon: 'error',
                title: 'Cập nhật thông tin thất bại'
            }) 
        });
        
    }

    $scope.changePass = function(id){
        if($rootScope.student.password == $scope.oldpassword){
            if($rootScope.student.password == $scope.studentR.newpassword){
                Swal.fire({
                    icon: 'error',
                    title: 'Mật khẩu mới trùng với mật khẩu cũ',
                })
            } else {
                $rootScope.student.password = $scope.studentR.password;
                //console.log($scope.studentR.newpassword);
                $rootScope.students[$rootScope.indexStudent] = angular.copy($rootScope.student);
                $http.put($rootScope.apiStudents+'/'+id, $rootScope.student).then(function(res){
                    //console.log(res.data);
                    if(res.data){
                        Swal.fire({
                            icon: 'success',
                            title: 'Đổi mật khẩu thành công',
                            text: 'Bạn có muốn quay lại trang chủ không?',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Yes',
                            cancelButtonText: 'No'
                        }).then((result) => {
                            if (result.value) {
                                window.location.href = "#!index";
                            }
                        })
                    }
                }, function(response){
                    Swal.fire({
                        icon: 'error',
                        title: 'Cập nhật thông tin thất bại'
                    })
                });
                
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Mật khẩu cũ không đúng'
            })
        }
        $scope.oldpassword = '';
        $scope.studentR.password = '';
        $scope.confirm_newpassword = '';
    }

    $http.get($rootScope.apiHistory).then(function (response) {
        // response.data is string => should convert to array
        // using function eval of Javascript
        var history = eval(response.data);
        for(let i = 0; i < history.length; i++){
            if(history[i].idStudent == $rootScope.student.id){
                $rootScope.histories.push(history[i]);
            }
        }
    })
})