/*
 * ui-select
 * https://github.com/alexpechkarev/angular-ui-select

 * Version: 0.1.0 - 2014-12-28
 * License: MIT
 */

'use strict';

var uiselect = angular.module('uiselect', ['ui-select'])

.controller('selectController', function($scope){
  
  // Specify drop-down data
  $scope.selectData = [
      {id:'0',  name: 'Select product type', shade:''},
      {id:'123',name:'black',  shade:'dark'},
      {id:'245',name:'white',  shade:'light'},
      {id:'246',name:'green',  shade:'light'},
      {id:'247',name:'blue',  shade:'dark'},
      {id:'248',name:'red',  shade:'dark'},
      {id:'249',name:'grey',  shade:'light'},      
 
  ];
  
  // initialize default value
  $scope.selectedItem = $scope.selectData[0]; 
  
  // currently selected element
  $scope.currentItem = [];
  // array of selected elements
  $scope.allItems = [];
  

  /**
   * Option selected 
   * - is selected option valid
   * - init current item with selected option
   * - is selected item already in array
   * -- add to an array
   * -- remove previous option and add new 
   * 
   * @param {type} index
   * @param {type} item
   * @returns {undefined}
   */  
  $scope.setSelected = function (index,item) {
      
      if(item.shade !== ""){
      
        $scope.currentItem = item;
      
        if(!_.find($scope.allItems,{'index':index}) ){

            $scope.allItems.push({index:index,item:item});

        }else{

            _.remove($scope.allItems, function(it) { return it.index === index; });
            $scope.allItems.push({index:index,item:item});
        }
      
      }
        
  };  
  /***/
  
  /**
   * Remove drop-down list
   *  - remove option from an array of selected options
   *  - remove drop-down list
   *  
   * @param {type} index
   * @returns {undefined}
   */
  $scope.removeSelect = function(box){
      
       $scope.currentItem = [];

       _.remove($scope.allItems, function(it) { return it.index === box; });

      if(_.find($scope.selectGroup,{'box':box}) ){
          _.remove($scope.selectGroup, function(it) { return it.box === box; });
      }
  };
  /***/
    
  // initialize array 
  $scope.selectGroup = [];
  // start count drop-down lists, do not rely on $index
  $scope.box = 0;
  /**
   * Add new drop-down list
   * 
   * @returns {undefined}
   */
  $scope.addSelect = function() {
    $scope.selectGroup.push({box:$scope.box});
    $scope.box++;
  };
  /***/
  
});

/***/