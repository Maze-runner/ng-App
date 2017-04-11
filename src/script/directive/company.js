/* 
* @Author: anchen
* @Date:   2017-03-23 20:10:53
* @Last Modified by:   anchen
* @Last Modified time: 2017-03-28 16:40:22
*/

'use strict';

angular.module('app').directive('appCompany',[function(){
  return {
    restrict: 'A', //调用方式
    replace: true, 
    scope: {
      com: '='
    },
    templateUrl: 'view/template/company.html',
    
  };
}]);