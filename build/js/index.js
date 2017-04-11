/* 
* @Author: anchen
* @Date:   2017-03-20 20:29:05
* @Last Modified by:   anchen
* @Last Modified time: 2017-04-05 20:42:37
*/
'use strict';

angular.module('app',['ui.router', 'ngCookies','validation']);


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
/* 
* @Author: anchen
* @Date:   2017-03-21 16:49:23
* @Last Modified by:   anchen
* @Last Modified time: 2017-03-30 17:32:40
*/

'use strict';

angular.module('app').config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
  $stateProvider.state('main',{
    url: '/main',
    templateUrl: 'view/main.html',
    controller: 'mainCtrl'
  }).state('position', {
    url: '/position/:id',
    templateUrl: 'view/position.html',
    controller: 'positionCtrl'
  }).state('company', {
    url: '/company/:id',
    templateUrl: 'view/company.html',
    controller: 'companyCtrl'
  }).state('search', {
    url: '/search',
    templateUrl: 'view/search.html',
    controller: 'searchCtrl'
  }).state('login', {
    url: '/login',
    templateUrl: 'view/login.html',
    controller: 'loginCtrl'
  }).state('register', {
    url: '/register',
    templateUrl: 'view/register.html',
    controller: 'registerCtrl'
  }).state('me', {
    url: '/me',
    templateUrl: 'view/me.html',
    controller: 'meCtrl'
  }).state('post', {
    url: '/post',
    templateUrl: 'view/post.html',
    controller: 'postCtrl'
  }).state('favorite', {
    url: '/favorite',
    templateUrl: 'view/favorite.html',
    controller: 'favoriteCtrl'
  });
  $urlRouterProvider.otherwise('main');
}])
/* 
* @Author: anchen
* @Date:   2017-04-05 20:05:04
* @Last Modified by:   anchen
* @Last Modified time: 2017-04-06 14:59:13
*/

'use strict';

angular.module('app').config(['$validationProvider', function($validationProvider){
  var expression = {
    phone: /^1[\d]{10}$/,
    password: function(value){
      var str = value + '';
      return str.length > 5;
    },
    required: function(value){
      return !!value;
    }
  };
  var defaultMsg = {
    phone: {
      success: '',
      error: '必须是11位手机号'
    },
    password: {
      success: '',
      error: '长度至少6位'
    },
    required: {
      success: '',
      error: '不能为空'
    }
  };
  $validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);
}])
/* 
* @Author: anchen
* @Date:   2017-03-24 16:06:02
* @Last Modified by:   anchen
* @Last Modified time: 2017-03-29 17:30:37
*/

'use strict';

angular.module('app').controller('companyCtrl',['$http','$state','$scope',function($http,$state,$scope){
  $http.get('data/company.json?id='+$state.params.id).success(function(resp){
    console.log(resp);
    $scope.company = resp;
  });
}]);

'use strict';
angular.module('app').controller('favoriteCtrl', ['$http', '$scope', function($http, $scope){
  $http.get('data/myFavorite.json').success(function(resp){
    $scope.list = resp;
  })
}]);

'use strict';
angular.module('app').controller('loginCtrl', ['cache', '$state', '$http', '$scope', function(cache, $state, $http, $scope){
  $scope.submit = function(){
    $http.post('data/login.json', $scope.user).success(function(resp){
      console.log(resp);
      cache.put('id', resp.id);
      cache.put('name', resp.name);
      cache.put('image', resp.image);
      $state.go('main');
    })
  }
}]);

/* 
* @Author: anchen
* @Date:   2017-03-21 17:20:51
* @Last Modified by:   anchen
* @Last Modified time: 2017-04-06 21:11:52
*/

'use strict';

angular.module('app').controller('mainCtrl',['$http','$scope','cache','$state', function($http,$scope,cache,$state){
  $http.get("/data/positionList.json").success(function(resp){
    //console.log(resp);
    $scope.list = resp;
  });
}])

'use strict';
angular.module('app').controller('meCtrl', ['$state', 'cache', '$http', '$scope', function($state, cache, $http, $scope){
  if(cache.get('name')){
    $scope.name = cache.get('name');
    $scope.image = cache.get('image');
  }
  $scope.logout = function(){
    cache.remove('id');
    cache.remove('name');
    cache.remove('image');
    $state.go('main');
  }
}]);

/* 
* @Author: anchen
* @Date:   2017-03-23 17:59:02
* @Last Modified by:   anchen
* @Last Modified time: 2017-04-07 12:26:43
*/

'use strict';

angular.module('app').controller('positionCtrl',['$log','$q','$http','$state','$scope','cache', function($log,$q,$http,$state,$scope,cache){
  $scope.isLogin = !!cache.get('name');
  $scope.message = $scope.isLogin?'投个简历':'去登录';
  function getPosition(){
    var def = $q.defer();
    $http.get('data/position.json', {
      params: {
        id: $state.params.id
      }
    }).success(function(resp){
      console.log(resp);
      $scope.position = resp;
      if(resp.posted){
        $scope.message = "已投递";
      }
      def.resolve(resp);
    }).error(function(err){
      def.reject(err);
    });
    return def.promise;
  }
  function getCompany(id){
    $http.get('data/company.json?id='+id).success(function(resp){
      //console.log(resp);
      $scope.company = resp;
    });
  }
  getPosition().then(function(obj){
    getCompany(obj.companyId);
  });
  $scope.go = function(){
    if($scope.message !== '已投递'){
      if($scope.isLogin){
        $http.post('data/handle.json', {
          id: $scope.position.id
        }).success(function(resp){
          $log.info(resp); //输入日志
          //alert('投递成功，请勿在一个月之内重复投递！');
          $scope.message = "已投递";
        })
      }else{
        $state.go('login');
      }
    }
  }
}]);

'use strict';
angular.module('app').controller('postCtrl', ['$http', '$scope', function($http, $scope){
  $scope.tabList = [{
    id: 'all',
    name: '全部'
  },{
    id: 'pass',
    name: '面试邀请'
  },{
    id: 'fail',
    name: '不合适'
  }];
  $http.get('data/myPost.json').success(function(resp){
    $scope.positionList = resp;
  });
  $scope.filterObj = {};
  $scope.tClick = function(id, name){
    //console.log(id,name);
    switch (id){
      case 'all':
        delete $scope.filterObj.state;
        break;
      case 'pass':
        $scope.filterObj.state = '1';
        break;
      case 'fail':
        $scope.filterObj.state = '-1';
        break;
      default: 
    }
  }
}]);

'use strict';
angular.module('app').controller('registerCtrl', ['$interval', '$http', '$scope', '$state', function($interval, $http, $scope, $state){
  $scope.submit = function(){
    //console.log($scope.user);
    $http.post('data/regist.json',$scope.user).success(function(resp){
      console.log('注册成功');
      $state.go('login');
    })
  }
  var count = 60;
  $scope.send = function(){
    $http.get('data/code.json').success(function(resp){
      if(resp.state === 1){
        $scope.time = '60s';
        var interval = $interval(function(){
          if(count <= 0){
            $interval.cancel(interval);
            $scope.time = '';
            return;
          }else {
            count--;
            $scope.time = count + 's';
          }
        },1000);
      }
    })
  }
}]);

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
/* 
* @Author: anchen
* @Date:   2017-03-21 17:27:13
* @Last Modified by:   anchen
* @Last Modified time: 2017-04-06 21:10:53
*/

'use strict';

angular.module('app').directive('appHead',['cache',function(cache){
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'view/template/head.html',
    link: function($scope){
      $scope.name = cache.get('name') || '';
    }
  }
}]);
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
/* 
* @Author: anchen
* @Date:   2017-03-24 16:11:09
* @Last Modified by:   anchen
* @Last Modified time: 2017-03-29 17:31:22
*/

'use strict';

angular.module('app').directive('appPositionClass', [function(){
  return {
    restrict: 'A',
    replace: true,
    scope: {
      com: '='
    },
    templateUrl: 'view/template/positionClass.html',
    link: function($scope){
      $scope.showPositionList = function(idx){
        $scope.positionList = $scope.com.positionClass[idx].positionList;
        $scope.isActive = idx;
      }
      $scope.$watch('com', function(newVal){
        if(newVal) $scope.showPositionList(0);
      })
    }
  }
}])
/* 
* @Author: anchen
* @Date:   2017-03-23 19:49:38
* @Last Modified by:   anchen
* @Last Modified time: 2017-04-07 11:23:17
*/

'use strict';

angular.module('app').directive('appPositionInfo',['$http', function($http){
  return {
    restrict: 'A', //调用方式
    replace: true, 
    templateUrl: 'view/template/positionInfo.html',
    scope: {
      isLogin: '=',
      pos: '='
    },
    link: function($scope){
      $scope.$watch('pos', function(newVal){
        if(newVal){
          $scope.pos.select = $scope.pos.select || false;
          $scope.imagePath = $scope.pos.select?'image/star-active.png':'image/star.png';
        }
      });
      $scope.favorite = function(){
        $http.post('data/favorite.json', {
          id: $scope.pos.id,
          select: !$scope.pos.select
        }).success(function(resp){
          $scope.pos.select = !$scope.pos.select;
          $scope.imagePath = $scope.pos.select?'image/star-active.png':'image/star.png';
        });
      }
    }
  };
}]);
/* 
* @Author: anchen
* @Date:   2017-03-21 20:16:53
* @Last Modified by:   anchen
* @Last Modified time: 2017-04-07 10:44:19
*/

'use strict';
//自定义属性
angular.module('app').directive('appPositionList', ['$http',function($http){
  return {
    restrict: 'A', //调用方式
    replace: true, 
    templateUrl: 'view/template/positionList.html',
    scope: {
      data: '=',
      filterObj: '=',
      isFavorite: '='
    }, //接口
    link: function($scope){
      $scope.select = function(item){
        $http.post('data/favorite.json',{
          id: item.id,
          select: !item.select
        }).success(function(resp){
          item.select = !item.select;
        })
      }
    }
  };
}]);
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