/* 
* @Author: anchen
* @Date:   2017-03-21 17:27:13
* @Last Modified by:   anchen
* @Last Modified time: 2017-04-06 21:10:53
*/

'use strict';

angular.module('app').directive('appHead',['cache',function(cache){
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'view/template/head.html',
    link: function($scope){
      $scope.name = cache.get('name') || '';
    }
  }
}]);