/* 
* @Author: anchen
* @Date:   2017-03-21 18:50:40
* @Last Modified by:   anchen
* @Last Modified time: 2017-03-28 17:56:02
*/

'use strict';

angular.module('app').directive('appFoot',[function(){
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'view/template/foot.html'
  }
}])