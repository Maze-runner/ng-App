'use strict';
angular.module('app').controller('registerCtrl', ['$interval', '$http', '$scope', '$state', function($interval, $http, $scope, $state){
  $scope.submit = function(){
    //console.log($scope.user);
    $http.post('data/regist.json',$scope.user).success(function(resp){
      console.log('注册成功');
      $state.go('login');
    })
  }
  var count = 60;
  $scope.send = function(){
    $http.get('data/code.json').success(function(resp){
      if(resp.state === 1){
        $scope.time = '60s';
        var interval = $interval(function(){
          if(count <= 0){
            $interval.cancel(interval);
            $scope.time = '';
            return;
          }else {
            count--;
            $scope.time = count + 's';
          }
        },1000);
      }
    })
  }
}]);
