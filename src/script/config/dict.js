/* 
* @Author: anchen
* @Date:   2017-03-30 18:10:35
* @Last Modified by:   anchen
* @Last Modified time: 2017-04-04 14:55:37
*/

'use strict';

angular.module('app').value('dict', {}).run(['dict','$http', function(dict, $http){
  $http.get('data/city.json').success(function(resp){
    console.log(resp);
    dict.city = resp;
  });
  $http.get('data/salary.json').success(function(resp){
    console.log(resp);
    dict.salary = resp;
  });
  $http.get('data/scale.json').success(function(resp){
    console.log(resp);

    dict.scale = resp;
  });
}])