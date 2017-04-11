/* 
* @Author: anchen
* @Date:   2017-03-29 16:44:27
* @Last Modified by:   anchen
* @Last Modified time: 2017-03-29 17:54:35
*/

'use strict';

angular.module('app').service('cache', ['$cookies', function($cookies){
  this.put = function(key, value){
    $cookies.put(key, value);
  };
  this.get = function(key){
    return $cookies.get(key);
  };
  this.remove = function(key){
    $cookies.remove(key);
  };
}])

// .factory('cache', ['$cookies', function($cookies){
//    return {
//      put: function(key, value){
//        $cookies.put(key, value);
//      },
//      get: function(key){
//        return $cookies.get(key);
//      },
//      remove: function(key){
//        $cookies.remove(key);
//      }
//    }
// }])