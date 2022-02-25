var app = angular.module('my-app', ['ngRoute']);
app.run(function ($rootScope, $http) {
    $http.get('db/Subjects.js').then(function (response) {
        // response.data is string => should convert to array
        // using function eval of Javascript
        $rootScope.subjects = eval(response.data);
    })

    $rootScope.apiStudents = 'https://620f85ecec8b2ee28342f9ea.mockapi.io/api/polyquiz/students';
    $http.get($rootScope.apiStudents).then(function (response) {
        // response.data is string => should convert to array
        // using function eval of Javascript
        $rootScope.students = eval(response.data);
    })

    $rootScope.apiHistory = 'https://620f85ecec8b2ee28342f9ea.mockapi.io/api/polyquiz/historys';
    $rootScope.histories = [];
    

    $rootScope.student = null;
    $rootScope.st = false;

    $rootScope.flag = true;

    $rootScope.logout = function () {
        $rootScope.student = null;

        $rootScope.st = false;

        $rootScope.histories = [];

        $rootScope.indexStudent = -1;
        Swal.fire({
            icon: 'warning',
            title: 'Đã đăng xuất',
            text: 'Quay lại trang chủ!',
            showConfirmButton: false,
            closeOnClickOutside: false,
            allowOutsideClick: false,
            timer: 1600
        });
        window.location.href = '#!index';
    }
})

app.config(function ($routeProvider) {
    $routeProvider
        .when(
            '/index',
            {
                templateUrl: 'html/index.html',
                controller: 'indexController'
            }
        )
        .when(
            '/about',
            {
                templateUrl: 'html/about.html'
            }
        )
        .when(
            '/contact',
            {
                templateUrl: 'html/contact.html'
            }
        )
        .when(
            '/feedback',
            {
                templateUrl: 'html/feedback.html'
            }
        )
        .when(
            '/FAQ',
            {
                templateUrl: 'html/FAQ.html'
            }
        )
        .when(
            '/login',
            {
                templateUrl: 'html/login.html',
                controller: 'loginController'
            }
        )
        .when(
            '/register',
            {
                templateUrl: 'html/register.html',
                controller: 'registerController'
            }
        )
        .when(
            '/forgot',
            {
                templateUrl: 'html/forgotpassword.html',
                controller: 'forgotpasswordController'
            }
        )
        .when(
            '/updateacount',
            {
                templateUrl: 'html/updateacount.html',
                controller: 'updateacountController'
            }
        )
        .when(
            '/startquiz/:id',
            {
                templateUrl: 'html/startquiz.html',
                controller: 'startquizController'
            }
        )
        .when(
            '/quiz/:id',
            {
                templateUrl: 'html/template-quiz.html',
                controller: 'quizController'
            }
        )
        .when(
            '/manager-user',
            {
                templateUrl: 'html/manager-user.html',
                controller: 'managerController'
            }
        )
        .otherwise({ redirectTo: "/index" });
});

app.directive('rePass', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, mCtrl) {
            const checkPass = function (value) {
                var oldPass = scope.studentR.password;
                if (value == oldPass) {
                    mCtrl.$setValidity('charE', true);
                } else {
                    mCtrl.$setValidity('charE', false);
                }
                return value;
            }
            mCtrl.$parsers.push(checkPass);
        }
    }
});