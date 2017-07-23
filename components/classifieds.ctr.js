(function() {
    'use strict';

    angular
    .module("ngClassifieds")
    .controller("classifiedsCtrl", function($scope, $http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog) {

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
                showToast('Classified Saved!');
            }
        }

        $scope.editClassified = function(classified) {
            $scope.editing = true;
            $scope.openSidebar();
            $scope.classified = classified;
        }

        $scope.saveEdit = function() {
            $scope.editing = false;
            $scope.classified = {};
            $scope.closeSidebar();
            showToast('Classified Edit Saved!');
        }

        $scope.deleteClassified = function(event, classified) {
            var confirm = $mdDialog.confirm()
                .title('Are you sure you to delete ' + classified.title + '?')
                .ok('Yes')
                .cancel('No')
                .targetEvent(event);

            $mdDialog.show(confirm)
                .then(function() {
                    $scope.classifieds.splice($scope.classifieds.indexOf(classified), 1);
                    showToast('Classified Deleted!');
                }, function() {
                    // message here
                });
        }

        function showToast(message) {
            $mdToast.show(
                $mdToast.simple()
                    .content(message)
                    .position('top, right')
                    .hideDelay(2000)
            );
        }
    });
})();