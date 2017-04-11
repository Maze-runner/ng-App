/* 
* @Author: anchen
* @Date:   2017-03-24 16:11:09
* @Last Modified by:   anchen
* @Last Modified time: 2017-03-29 17:31:22
*/

'use strict';

angular.module('app').directive('appPositionClass', [function(){
  return {
    restrict: 'A',
    replace: true,
    scope: {
      com: '='
    },
    templateUrl: 'view/template/positionClass.html',
    link: function($scope){
      $scope.showPositionList = function(idx){
        $scope.positionList = $scope.com.positionClass[idx].positionList;
        $scope.isActive = idx;
      }
      $scope.$watch('com', function(newVal){
        if(newVal) $scope.showPositionList(0);
      })
    }
  }
}])