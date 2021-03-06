/* 
* @Author: anchen
* @Date:   2017-03-29 18:04:46
* @Last Modified by:   anchen
* @Last Modified time: 2017-04-04 17:27:35
*/

'use strict';

angular.module('app').controller('searchCtrl',['dict','$http','$state','$scope',function(dict,$http,$state,$scope){
  $scope.name = '';
  $scope.search = function(){
    $http.get('data/positionList.json?name='+$scope.name).success(function(resp){
      $scope.positionList = resp;
    });
  };
  $scope.search();
  $scope.sheet = {};
  $scope.tabList = [{
    id: 'city',
    name: '城市'
  },{
    id: 'salary',
    name: '薪水'
  },{
    id: 'scale',
    name: '公司规模'
  }];
  $scope.filterObj = {};
  var tabId = '';
  $scope.tClick = function(id, name){
    //console.log(id, name);
    tabId = id;
    $scope.sheet.list = dict[id];
    $scope.sheet.visible = true;
  };
  $scope.sClick = function(id, name){
    if(id){
      angular.forEach($scope.tabList, function(item){
        if(item.id === tabId){
          item.name = name;
        }
      });
      $scope.filterObj[tabId + 'Id'] = id;
    }else{
      delete $scope.filterObj[tabId + 'Id'];
      angular.forEach($scope.tabList, function(item){
        if(item.id === tabId){
          switch(item.id){
            case 'city':
              item.name = '城市';
              break;
            case 'salary':
              item.name = '薪水';
              break;
            case 'scale':
              item.name = '公司规模';
              break;
            default: ;
          }
        }
      })
    }
  }
}]);