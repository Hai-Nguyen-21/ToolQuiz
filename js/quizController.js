app.controller('quizController', function($rootScope, $scope, $interval, $http, $routeParams){
    // get subject 
    $rootScope.subjects.forEach(subject => {
        if(subject.Id == $routeParams.id){
            $scope.subject = angular.copy(subject);
            return;
        }
    });

    $http.get('db/Quizs/'+ $routeParams.id+'.js').then(function(response){
        $scope.questions = response.data;
        if($scope.questions.length > 20){
            $scope.questions.length = 20;
            shuffleArray($scope.questions);
        } else {
            return false;
        }
    })

    function shuffleArray(array) {
        var m = array.length,
            t, i;

        // While there remain elements to shuffle
        while (m) {
            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);
            t = array[m];
            array[m] = array[i];
            array[i] = t;
            
        }
        return array;
    }

    $scope.testMark = 0;
    $scope.indexQ = 0;
    $scope.timer = 900;
    $scope.elem = [];
    $scope.answerMod = false;

    $scope.move = function(x){
        $scope.indexQ = x;
    }

    $scope.checkAns = function(){
        if($scope.questions[$scope.indexQ].AnswerId == $scope.elem[$scope.indexQ].answer){
            Swal.fire({
                icon: 'success',
                title: 'Correct!',
                text: 'Bạn được cộng thêm ' + $scope.questions[$scope.indexQ].Marks + ' điểm',
                showConfirmButton: false,
                timer: 1200
            }) 
            $scope.testMark += $scope.questions[$scope.indexQ].Marks;
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Incorrect',
                showConfirmButton: false,
                timer: 1200
            })
        }
        $scope.answerMod = true;
    }

    $scope.finish = function(){
        Swal.fire({
            title: 'Are you sure?',
            text: 'Bạn có chắc muốn kết thúc bài thi ngay bây giờ không?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) =>{
            if(result.value){
                $scope.timer = 3;
                Swal.fire({
                    title: 'Kết thúc bài thi',
                    text: 'Điểm của bạn trong bài kiểm tra vừa rồi là ' + $scope.testMark + ' điểm!',
                    icon: 'success',
                    showConfirmButton: false,
                    closeOnClickOutside: true,
                    allowOutsideClick: true,
                    timer: 4000
                })
            }
        })
        //saveQuiz($scope.subject.Name);
        window.location.href = '#!startquiz/'+$scope.subject.Id;
    }

    saveQuiz = function(nameQuiz){
        $http.post($rootScope.apiHistory, {
            'date': new Date().toLocaleString(),
            'name': nameQuiz,
            'marks': parseInt($scope.testMark),
            'idStudent': $rootScope.student.id
        })
    }

    var stop = $interval(function(){
        if($scope.timer > 0){
            $scope.timer -= 1;
        } else if($scope.timer == 0){
            $rootScope.student.marks = (parseInt($rootScope.student.marks) + $scope.testMark).toString();
            $rootScope.students[$rootScope.indexStudent] = angular.copy($rootScope.student);
            $http.put($rootScope.apiStudents+'/'+$rootScope.student.id, $rootScope.student);
            saveQuiz($scope.subject.Name);
            window.location.href = '#!startquiz/'+$scope.subject.Id;
            $interval.cancel(stop);
        }
    }, 1000);

})
