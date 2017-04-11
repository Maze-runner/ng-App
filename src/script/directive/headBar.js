/* 
* @Author: anchen
* @Date:   2017-03-23 18:06:42
* @Last Modified by:   anchen
* @Last Modified time: 2017-03-23 18:19:58
*/

'use strict';

angular.module('app').directive('appHeadBar',[function(){
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'view/template/headBar.html',
    scope: {
      text: '@'
    },
    link: function(scope){
      scope.back = function(){
        window.history.back();      
      }
    }
    
  }
}]);