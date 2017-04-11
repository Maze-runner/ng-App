/* 
* @Author: anchen
* @Date:   2017-03-23 17:59:02
* @Last Modified by:   anchen
* @Last Modified time: 2017-04-07 12:26:43
*/

'use strict';

angular.module('app').controller('positionCtrl',['$log','$q','$http','$state','$scope','cache', function($log,$q,$http,$state,$scope,cache){
  $scope.isLogin = !!cache.get('name');
  $scope.message = $scope.isLogin?'投个简历':'去登录';
  function getPosition(){
    var def = $q.defer();
    $http.get('data/position.json', {
      params: {
        id: $state.params.id
      }
    }).success(function(resp){
      console.log(resp);
      $scope.position = resp;
      if(resp.posted){
        $scope.message = "已投递";
      }
      def.resolve(resp);
    }).error(function(err){
      def.reject(err);
    });
    return def.promise;
  }
  function getCompany(id){
    $http.get('data/company.json?id='+id).success(function(resp){
      //console.log(resp);
      $scope.company = resp;
    });
  }
  getPosition().then(function(obj){
    getCompany(obj.companyId);
  });
  $scope.go = function(){
    if($scope.message !== '已投递'){
      if($scope.isLogin){
        $http.post('data/handle.json', {
          id: $scope.position.id
        }).success(function(resp){
          $log.info(resp); //输入日志
          //alert('投递成功，请勿在一个月之内重复投递！');
          $scope.message = "已投递";
        })
      }else{
        $state.go('login');
      }
    }
  }
}]);
