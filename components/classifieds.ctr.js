(function() {
    'use strict';

    angular
    .module("ngClassifieds")
    .controller("classifiedsCtrl", function($scope) {
        $scope.classified = {
            title: 'the title',
            price: 1000,
            description: 'long description here'
        }
    })
})();