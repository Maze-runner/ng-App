/* 
* @Author: anchen
* @Date:   2017-03-23 19:49:38
* @Last Modified by:   anchen
* @Last Modified time: 2017-04-07 11:23:17
*/

'use strict';

angular.module('app').directive('appPositionInfo',['$http', function($http){
  return {
    restrict: 'A', //调用方式
    replace: true, 
    templateUrl: 'view/template/positionInfo.html',
    scope: {
      isLogin: '=',
      pos: '='
    },
    link: function($scope){
      $scope.$watch('pos', function(newVal){
        if(newVal){
          $scope.pos.select = $scope.pos.select || false;
          $scope.imagePath = $scope.pos.select?'image/star-active.png':'image/star.png';
        }
      });
      $scope.favorite = function(){
        $http.post('data/favorite.json', {
          id: $scope.pos.id,
          select: !$scope.pos.select
        }).success(function(resp){
          $scope.pos.select = !$scope.pos.select;
          $scope.imagePath = $scope.pos.select?'image/star-active.png':'image/star.png';
        });
      }
    }
  };
}]);