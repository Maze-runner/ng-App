/* 
* @Author: anchen
* @Date:   2017-04-04 15:23:55
* @Last Modified by:   anchen
* @Last Modified time: 2017-04-04 15:32:05
*/

'use strict';

angular.module('app').filter('filterByObj', [function(){
  return function(list, obj){
    var result = [];
    angular.forEach(list, function(item){
      var isEqual = true;
      for(var e in obj){
        if(item[e] !== obj[e]){
          isEqual = false;
        }
      }
      if(isEqual){
        result.push(item);
      }
    });
    return result;
  }
}])