/*
 * ui-select
 * https://github.com/alexpechkarev/angular-ui-select

 * Version: 0.1.0 - 2014-12-28
 * License: MIT
 */
angular.module('ui-select', ['ui-select.tmpl','ui-select.group-select']);
angular.module('ui-select.tmpl', ["template/select/select.html"]);

angular.module('ui-select.group-select', [])

.controller('selectController', ['$scope', function ($scope) {
  this.close = $scope.close;
  
}])

.directive('groupSelect', function () {
  return {
    restrict:'E',
    scope: {
      selectData: '=data',
      selectedItem: '=single',
      close:'&',
      update:'&'
    },    
    controller:'selectController',
    templateUrl:'template/select/select.html',
    transclude:true,
    replace:true
  };
});


/**
 * Using Bootstrap for drop-down template
 * @param {type} param
 */
angular.module("template/select/select.html", []).run(["$templateCache", function($templateCache) {
        
  $templateCache.put("template/select/select.html",
  
"<div class=\"well\">"
+        
"<div class=row>\n"
+
"<div class=\"col-xs-10\">\n"
+
"<select class=\"form-control\"  ng-model=\"selectedItem\" ng-selected=\"update({item:selectedItem})\"  ng-options=\"color.name group by color.shade for color in selectData track by color.id\"></select>\n" 
+
"<input type=\"hidden\" name=\"itemId[]\" ng-value=\"selectedItem.id\">\n"
+
"</div>\n"
+
"<div class=\"col-xs-2\">\n"
+
"<button class=\"btn btn-default pull-right\" ng-click='close()'>Remove</button>"
+
"</div>\n" 
+

"</div>\n"
+
"<div ng-transclude></div>\n\n"
+
"</div>\n"
+
"");
}]);


