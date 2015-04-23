var app = angular.module('app', ['firebase']);

app.factory('firebaseConnection', ['$firebase', function($firebase) {
    var firebase_url = 'https://stacktrack.firebaseio.com';
    var firebaseRef = new Firebase(firebase_url);
    return { 
      firebase_url : firebase_url, 
      firebaseRef : firebaseRef,
      user : {}
    };
}]);

app.controller('controller', ['$scope', '$http', '$firebaseArray', 'firebaseConnection', function($scope, $http, $firebaseArray, firebaseConnection) {

    $scope.apiRoot = 'https://api.stackexchange.com/2.2';
    $scope.key = 'Jn1HoRLSkS1IMtHxX0Tw0A((';

    $scope.login = function() {
        SE.authenticate({
            success: function(data) { 
                $scope.auth = data;
                $scope.$apply();

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
            $scope.following = $firebaseArray(new Firebase(firebaseConnection.firebase_url + '/' + $scope.user_id + '/following'));
          }).
          error(function(data, status, headers, config) {
            alert('error');
          });
        }

    $scope.init();
}]);


