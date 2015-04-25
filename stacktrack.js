var app = angular.module('app', ['ngCookies']);

app.controller('controller', ['$scope', '$http', '$cookies', function($scope, $http, $cookies) {

    $scope.apiRoot = 'https://api.stackexchange.com/2.2';
    $scope.key = 'Jn1HoRLSkS1IMtHxX0Tw0A((';



    $scope.login = function() {
        SE.authenticate({
            success: function(data) { 
                $scope.auth = data;
                $scope.$apply();

                $cookies.accessToken = data.accessToken;
                $scope.whoami();
            },
            error: function(data) { alert('error'); },
            networkUsers: true 
        });
    };

    $scope.logout = function() {
        $scope.auth = null;
        $cookies.accessToken = '';
        $scope.user = null;
        $scope.following = [];
        $scope.timeline = null;
    }

    $scope.initializing = true;
    $scope.following = [];

    $scope.init = function() {
        SE.init({
            clientId: 4686,
            key: $scope.key,
            channelUrl: 'http://maxhorstmann.net/blank',
            complete: function (data) { 
                $scope.initializing = false;
                $scope.$apply();

                var accessToken = $cookies.accessToken;
                if ((accessToken) && (accessToken.length>0)) {
                    $scope.auth = {
                        'accessToken' : accessToken
                    };
                    $scope.whoami();

                    var following = $cookies.following;
                    // if (following) {
                    //     $scope.following = following;
                    // }
                };

            }
        });

    $scope.followNewUser = function() {
        $scope.following.push($scope.followNew);
        $scope.followNew = '';
    }



    };

    $scope.whoami = function() {
        var url = $scope.apiRoot + "/me?order=desc&sort=reputation&site=stackoverflow&key=" 
                + $scope.key +"&access_token=" + $scope.auth.accessToken;

        $http.get(url).
          success(function(data, status, headers, config) {
            console.log(data);
            $scope.user = data.items[0];

            var timelineUrl = $scope.apiRoot + "/users/22656/timeline?site=stackoverflow&key=" + $scope.key +"&access_token=" + $scope.auth.accessToken;
            $http.get(timelineUrl).
              success(function(data, status, headers, config) {
                $scope.timeline = data.items;
              });

          }).
          error(function(data, status, headers, config) {
            alert('error');
          });
        }

    $scope.init();
}]);


