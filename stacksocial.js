//var app = angular.module('app', ['firebase']);
var app = angular.module('app', []);

// app.factory('firebaseConnection', ['$firebase', function($firebase) {
//     var firebase_url = document.getElementById('data-firebase-url').getAttribute('data-firebase-url');
//     var firebaseRef = new Firebase(firebase_url);
//     return { 
//       firebase_url : firebase_url, 
//       firebaseRef : firebaseRef,
//       user : {}
//     };
// }]);

//app.controller('controller', ['$scope', 'firebaseConnection', function($scope, firebaseConnection) {
app.controller('controller', ['$scope', function($scope) {

    $scope.apiRoot = 'https://api.stackexchange.com/2.2';

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
            key: 'Jn1HoRLSkS1IMtHxX0Tw0A((',
            channelUrl: 'http://maxhorstmann.net/blank',
            complete: function (data) { 
                $scope.initializing = false;
                $scope.$apply();
            }
        });
    };

    $scope.whoami = function() {
        var url = $scope.apiRoot + "/me?order=desc&sort=reputation&site=stackoverflow&accessToken=" + $scope.auth.accessToken;
        console.log(url);
    }

    $scope.init();
}]);


