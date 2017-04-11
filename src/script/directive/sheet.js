/* 
* @Author: anchen
* @Date:   2017-03-29 20:28:48
* @Last Modified by:   anchen
* @Last Modified time: 2017-04-04 14:54:33
*/

'use strict';

angular.module('app').directive('appSheet', [function(){
  return {
    restrict: 'A',
    replace: true,
    scope: {
      list: '=',
      visible: '=',
      select: '&'
    },
    templateUrl: 'view/template/sheet.html',
    
  }
}])