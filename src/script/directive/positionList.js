/* 
* @Author: anchen
* @Date:   2017-03-21 20:16:53
* @Last Modified by:   anchen
* @Last Modified time: 2017-04-07 10:44:19
*/

'use strict';
//自定义属性
angular.module('app').directive('appPositionList', ['$http',function($http){
  return {
    restrict: 'A', //调用方式
    replace: true, 
    templateUrl: 'view/template/positionList.html',
    scope: {
      data: '=',
      filterObj: '=',
      isFavorite: '='
    }, //接口
    link: function($scope){
      $scope.select = function(item){
        $http.post('data/favorite.json',{
          id: item.id,
          select: !item.select
        }).success(function(resp){
          item.select = !item.select;
        })
      }
    }
  };
}]);