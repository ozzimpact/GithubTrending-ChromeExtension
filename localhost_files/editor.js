'use strict';


app.controller('EditorCtrl', ['$scope', 'collaSocket','userService', function ($scope, socketio, userService,$timeout) {

    $scope.htmlcontent = '';
    $scope.disabled = false;
    $scope.username = '';


     userService.getUserDetail().then(function (dataResponse) {
            $scope.username = dataResponse.data;
        });

        var inputChangedPromise;
        $scope.$watch('htmlcontent', function (newVal, oldVal) {
            if (inputChangedPromise) {
                $timeout.cancel(inputChangedPromise);
            }
            inputChangedPromise = $timeout(function () {
            socketio.emit('textChanged', newVal);
        },1000);
    });
    $scope.chooseRoom = function (room) {
        socketio.emit('changeRoom', room, $('.userEmail').text());
    };

    $scope.addNewRoom = function () {
        socketio.emit('addRoom', {roomName: prompt('Room Name'), email: 'oguzhan.demir@trendyol.com'});
    };

    $scope.handleSocket = function (evt, payload) {
        console.log(payload);
    };

    $scope.handleUpdateRooms = function (evt, payload) {
        $scope.Rooms = payload;
    };

    $scope.handleUpdateConversation = function (evt, payload) {

        $scope.htmlcontent = payload;
    };

    $scope.$on('socket:addRoom', $scope.handleSocket);
    $scope.$on('socket:updateRooms', $scope.handleUpdateRooms);
    $scope.$on('socket:updateConversation', $scope.handleUpdateConversation);
    socketio.forward('addRoom', $scope);
    socketio.forward('updateRooms', $scope);
    socketio.forward('updateConversation', $scope);

}]);

