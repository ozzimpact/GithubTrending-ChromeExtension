var myApp = angular.module('myApp', []);

myApp.service('dataService', function ($http) {
    var baseUrl = 'https://githubtrendingbe-ozi3.c9.io/';
    var langExt = 'languages/';
    this.getTrends = function () {

        return $http({
            method: 'GET',
            url: baseUrl
        });
    };
    this.getTrendsByLang = function (lang) {

        return $http({
            method: 'GET',
            url: baseUrl + langExt + lang
        });
    };
    this.getAllLanguages = function () {

        return $http({
            method: 'GET',
            url: baseUrl + langExt
        });
    }
});

myApp.controller('AngularJSCtrl', function ($scope, dataService) {
    $scope.data = null;
    dataService.getTrends().then(function (dataResponse) {
        $scope.data = dataResponse.data;
        //console.log($scope.data);
    });
    dataService.getAllLanguages().then(function (dataResponse) {
        $scope.languages = dataResponse.data;
        console.log($scope.languages);
    });

    $scope.redirectUrl = function (url) {
        setTimeout(function () {
            var newURL = url;
            chrome.tabs.create({url: newURL});
        }, 100);

    };

    $scope.trendsByLang = function (lang) {
        $scope.lang = lang.trim();
        $scope.languagearea = lang;
        dataService.getTrendsByLang($scope.lang).then(function (dataResponse) {
            $scope.data = dataResponse.data;
            //console.log($scope.data[1]);
        })
    };




});