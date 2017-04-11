/* 
* @Author: anchen
* @Date:   2017-04-06 12:44:44
* @Last Modified by:   anchen
* @Last Modified time: 2017-04-06 13:07:11
*/

'use strict';

angular.module('app').config(['$provide', function($provide){
  $provide.decorator('$http', ['$delegate', '$q', function($delegate, $q){
    $delegate.post = function(url, data, config){
      var def = $q.defer();
      $delegate.get(url).success(function(resp){
        def.resolve(resp);
      }).error(function(resp){
        def.reject(err);
      });
      return {
        success: function(cb){
          def.promise.then(cb);
        },
        error: function(cb){
          def.promise.then(null, cb);
        }
      }
    }
    return $delegate;
  }]);
}])