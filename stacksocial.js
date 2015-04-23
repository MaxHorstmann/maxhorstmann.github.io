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

    $scope.login = function() {
        SE.authenticate({
            success: function(data) { 
                alert('success'); 
                console.log(data);
            },
            error: function(data) { alert('error'); },
            networkUsers: true 
        });
    };

    $scope.initializing = true;
    $scope.test = 0;

    $scope.init = function() {
        console.log("init...");
        SE.init({
            clientId: 4686,
            key: 'Jn1HoRLSkS1IMtHxX0Tw0A((',
            channelUrl: 'http://maxhorstmann.net/blank',
            complete: function (data) { 
                console.log("complete");
                $scope.initializing = false;
            }
        });
    };
    $scope.init();
}]);


