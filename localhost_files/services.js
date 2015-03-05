'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
app.factory('collaSocket', ['socketFactory', function (socketFactory) {

    var address = window.location.protocol + '//' + window.location.host;
    var details = {
        resource: (window.location.pathname.split('/').slice(0, -1).join('/') + '/socket.io').substring(1),
        transports: ["websocket"]
    };
    var socketInstance = io.connect(address, details);
    return socketFactory({
        ioSocket: socketInstance
    });
}]);
app.service('userService', function ($http) {
    var baseUrl = '/userEmail';
    this.getUserDetail = function () {
        return $http({
            method: 'GET',
            url: baseUrl
        });
    };

});


