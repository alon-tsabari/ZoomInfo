var app = angular.module('herokuApp', [])

   app.controller('mainCtrl', function($scope, $http) {
       
        $scope.getStatus = function() {

            this.changeName = function() {
              var button = angular.element(document.querySelector('.reveal'));
              button.html('Refresh');
            };

            //Send a request to first HEROKU'S API which contains
            // The current-HEROKU'S-status.

            $http.get('/getStatus').then(function (response) {
                $scope.currentStatus = response.data.status;

                if ($scope.currentStatus.Development === 'green') {
                    $scope.developmentOk = true;
                } else {
                    $scope.developmentOk = false;
                }

                if ($scope.currentStatus.Production === 'green') {
                    $scope.productionOk = true;
                } else {
                    $scope.productionOk = false;
                }
            });

            //Send a request to second HEROKU'S API which contains
            // All of the current updates and their information from passed several days.

            $http.get('/getUpdates').then(function (response) {
               //The last issue updated.
                $scope.lastUpdate = response.data[0];
               
               //The history-list of updates from recent time.
                $scope.updatesList = response.data[0].updates;

                $scope.id = $scope.lastUpdate.id;
                $scope.created_at = $scope.lastUpdate.created_at;
                $scope.title = $scope.lastUpdate.title;
                $scope.updated_at = $scope.lastUpdate.updated_at;
                $scope.resolved = $scope.lastUpdate.resolved;
                $scope.contents = $scope.lastUpdate.contents;

            });
        }});
