var myApp = angular.module('myApp', ["kendo.directives"]);

myApp.service('trendingService', function ($http) {
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

myApp.controller('trendingctrl', function ($scope, trendingService, $timeout) {

    $scope.data = null;
    $scope.lang = null;
    trendingService.getTrends().then(function (dataResponse) {
        $scope.data = dataResponse.data;

    });
    trendingService.getAllLanguages().then(function (dataResponse) {
        $scope.languages = dataResponse.data;
    });

    $scope.redirectUrl = function (url) {
        setTimeout(function () {
            var newURL = url;
            chrome.tabs.create({url: newURL});
        }, 100);

    };

    $scope.dropDownAction = function (lang) {
        $scope.languagearea= lang;
        $scope.trendsByLang();
    };
    var inputChangedPromise;
    $scope.trendsByLang = function () {

        if (inputChangedPromise) {
            $timeout.cancel(inputChangedPromise);
        }
        inputChangedPromise = $timeout(function () {
            $scope.loading = true;
            $scope.data = "";
            var temp = $scope.languagearea.replace(" ", "");
            if (temp === "")
                trendingService.getTrends().then(function (dataResponse) {
                    $scope.data = dataResponse.data;
                    $scope.loading = false;
                });
            else {
                trendingService.getTrendsByLang(temp).then(function (dataResponse) {
                    $scope.data = dataResponse.data;
                    $scope.loading = false;

                })
            }
        }, 1000);

    };
});