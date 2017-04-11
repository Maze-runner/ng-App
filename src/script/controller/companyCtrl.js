/* 
* @Author: anchen
* @Date:   2017-03-24 16:06:02
* @Last Modified by:   anchen
* @Last Modified time: 2017-03-29 17:30:37
*/

'use strict';

angular.module('app').controller('companyCtrl',['$http','$state','$scope',function($http,$state,$scope){
  $http.get('data/company.json?id='+$state.params.id).success(function(resp){
    console.log(resp);
    $scope.company = resp;
  });
}]);
