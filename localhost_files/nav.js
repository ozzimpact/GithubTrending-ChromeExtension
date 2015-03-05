'use strict';

app.controller('NavCtrl', function ($scope, $http) {
    $scope.loggedIn = false;

    $scope.isLoggedIn = function() {
        $http.get('/checklogin')
            .success(function(data) {
                console.log(data);
                if (data === true)
                    $scope.loggedIn = true;
                else
                    $scope.loggedIn = false;
            })
            .error(function(data) {
                console.log('error: ' + data);
            });
    }

});
