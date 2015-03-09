'use strict';

var myApp = angular.module('myApp', ['autocomplete']);

myApp.service('trendingService', function ($http) {
    var serviceParams = {
        baseUrl: 'https://githubtrendingbe-ozi3.c9.io/',
        langExt: 'languages/'
    };

    this.getTrends = function () {

        return $http({
            method: 'GET',
            url: serviceParams.baseUrl
        });
    };
    this.getTrendsByLang = function (lang) {

        return $http({
            method: 'GET',
            url: serviceParams.baseUrl + serviceParams.langExt + lang
        });
    };
    this.getAllLanguages = function () {

        return $http({
            method: 'GET',
            url: serviceParams.baseUrl + serviceParams.langExt
        });
    };
});

myApp.controller('trendingctrl', function ($scope, trendingService, $timeout) {

    $scope.vm = {
        data: null,
        languages: null,
        languagearea: null,
        loading: null
    };

    trendingService.getTrends().then(function (dataResponse) {
        $scope.vm.data = dataResponse.data;

    });
    trendingService.getAllLanguages().then(function (dataResponse) {
        $scope.vm.languages = dataResponse.data;
    });

    $scope.redirectUrl = function (url) {
        setTimeout(function () {
            var newURL = url;
            chrome.tabs.create({url: newURL});
        }, 100);
    };
    $scope.dropDownAction = function (lang) {
        $scope.vm.languagearea = lang;
        $scope.trendsByLang();
    };
    var inputChangedPromise;
    $scope.trendsByLang = function () {
        if (inputChangedPromise) {
            $timeout.cancel(inputChangedPromise);
        }
        inputChangedPromise = $timeout(function () {
            $scope.vm.loading = true;
            $scope.vm.data = "";
            var temp = $scope.vm.languagearea.replace(" ", "");
            if (temp === "")
                trendingService.getTrends().then(function (dataResponse) {
                    $scope.vm.data = dataResponse.data;
                    $scope.vm.loading = false;
                });
            else {
                trendingService.getTrendsByLang(temp).then(function (dataResponse) {
                    $scope.vm.data = dataResponse.data;
                    $scope.vm.loading = false;

                })
            }
        }, 1000);

    };
});