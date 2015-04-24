var app = angular.module('app', ['ngCookies', 'firebase']);

app.factory('firebaseConnection', ['$firebase', function($firebase) {
    var firebase_url = 'https://stacktrack.firebaseio.com';
    var firebaseRef = new Firebase(firebase_url);
    return { 
      firebase_url : firebase_url, 
      firebaseRef : firebaseRef,
      user : {}
    };
}]);

app.controller('controller', ['$scope', '$http', '$cookies', $firebaseArray', 'firebaseConnection', function($scope, $http, $cookies, $firebaseArray, firebaseConnection) {

    $scope.apiRoot = 'https://api.stackexchange.com/2.2';
    $scope.key = 'Jn1HoRLSkS1IMtHxX0Tw0A((';

    var accessToken = $cookies.get("accessToken");
    if (accessToken) {
        $scope.auth = {
            'accessToken' : accessToken
        };
    };

    $scope.login = function() {
        SE.authenticate({
            success: function(data) { 
                $scope.auth = data;
                $scope.$apply();

                $cookies.put('accessToken', data.accessToken);


                $scope.whoami();
            },
            error: function(data) { alert('error'); },
            networkUsers: true 
        });
    };

    $scope.initializing = true;

    $scope.init = function() {
        SE.init({
            clientId: 4686,
            key: $scope.key,
            channelUrl: 'http://maxhorstmann.net/blank',
            complete: function (data) { 
                $scope.initializing = false;
                $scope.$apply();
            }
        });



    };

    $scope.whoami = function() {
        var url = $scope.apiRoot + "/me?order=desc&sort=reputation&site=stackoverflow&key=" 
                + $scope.key +"&access_token=" + $scope.auth.accessToken;

        $http.get(url).
          success(function(data, status, headers, config) {
            console.log(data);
            $scope.user = data.items[0];
            var url = firebaseConnection.firebase_url + '/' + $scope.user.user_id + '/following';
            console.log(url);
            $scope.following = $firebaseArray(new Firebase(url));

            var timelineUrl = $scope.apiRoot + "/users/22656/timeline?site=stackoverflow&key=" + $scope.key +"&access_token=" + $scope.auth.accessToken;
            $http.get(timelineUrl).
              success(function(data, status, headers, config) {
                console.log(data);
                $scope.timeline = data.items;
              });

          }).
          error(function(data, status, headers, config) {
            alert('error');
          });
        }

    $scope.init();
}]);


