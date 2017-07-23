(function() {
    'use strict';

    angular
    .module("ngClassifieds")
    .controller("classifiedsCtrl", function($scope, $http, classifiedsFactory, $mdSidenav, $mdToast) {

        // dummy data till we have a user
        var contact = {
            name: 'Nitin',
            phone: '+65 88888888',
            email: 'fake@gmail.com'
        };

        classifiedsFactory.getClassifieds()
            .then(function(classifieds) {
                $scope.classifieds = classifieds.data;
            });
        
        $scope.openSidebar = function () {
            $mdSidenav('left').open();
        }

        $scope.closeSidebar = function () {
            $mdSidenav('left').close();
        }

        $scope.saveClassified = function(classified) {
            if (classified) {
                classified.contact = contact;
                $scope.classifieds.push(classified);
                $scope.classified = {};
                $scope.closeSidebar();
                $mdToast.show(
                    $mdToast.simple()
                        .content("Saved classified")
                        .position('top, right')
                        .hideDelay(2000)
                );
            }
        }
    });
})();