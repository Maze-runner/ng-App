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