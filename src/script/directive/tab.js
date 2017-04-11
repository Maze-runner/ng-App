/* 
* @Author: anchen
* @Date:   2017-03-29 20:10:16
* @Last Modified by:   anchen
* @Last Modified time: 2017-04-06 15:55:56
*/

'use strict';

angular.module('app').directive('appTab', [function(){
  return {
    restrict: 'A',
    replace: true,
    scope: {
      list: '=',
      tabClick: '&'
    },
    templateUrl: 'view/template/tab.html',
    link: function($scope){
      $scope.click = function(tab){
        console.log(tab);
        $scope.selectId = tab.id;
        $scope.tabClick(tab);
      }
    }
  }
}])