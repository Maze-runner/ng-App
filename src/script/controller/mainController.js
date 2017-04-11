/* 
* @Author: anchen
* @Date:   2017-03-21 17:20:51
* @Last Modified by:   anchen
* @Last Modified time: 2017-04-06 21:11:52
*/

'use strict';

angular.module('app').controller('mainCtrl',['$http','$scope','cache','$state', function($http,$scope,cache,$state){
  $http.get("/data/positionList.json").success(function(resp){
    //console.log(resp);
    $scope.list = resp;
  });
}])
