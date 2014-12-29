## AngularJS UI Select
This directive allows creating multiply drop-down lists with group related options. Value of selected options added to an array that available to AngularJS or can be accessible after when the form being submitted.

### Dependencies

1. [AngularJS](https://angularjs.org/) - v1.3.8
2. [jQuery](http://jquery.com/) - v1.11.1
3. [Lo-Dash](https://lodash.com/) - v2.4.1
4. [Bootstrap](http://getbootstrap.com/) - v3.3.1

###Usage

How does it work? Simple. Directive tells compiler to attached specific behaviour and create drop-down element from template. 
To start, ensure all above dependencies are included as well as `ui-select.js` directive and `selectCrt.js` controller attached.

Add HTML markup for select element first

```html
    <group-select update="setSelected(select.box,item)"  
        data="selectData" 
        single="selectedItem" 
        close="removeSelect(select.box)"  
        ng-repeat="select in selectGroup">
    </group-select>
```

Following attributes bind data with controller scope:

 `data="selectData"`   - drop-down data 

 `single="selectedItem"`  - selected element by default

 `update="setSelected(select.box,item)"` - specify selected element by given drop-down list

 `close="removeSelect(select.box)` - remove given drop-down list


In the `selectCrt.js` initialising data for select element and setting selected item :

```javascript
  $scope.selectData = [
      {id:'0',  name: 'Select product type', shade:''},
      {id:'123',name:'black',  shade:'dark'},
      {id:'245',name:'white',  shade:'light'}     
  ];

 $scope.selectedItem = $scope.selectData[0]; 
```

Three methods in controller respond to user behaviour:

1. Add new drop-down list
2. Get value of selected element
3. Remove drop-down list



1) To add a new drop-down list `addSelect()` method has to be triggered, in this example it's a button click. This method adds new item (select box) to an array. Having unique counter helps referring to a specific drop-down list when retrieving / updating values or removing drop-down list from array of elements.

```javascript
  $scope.selectGroup = [];
  $scope.box = 0;
  $scope.addSelect = function() {
    $scope.selectGroup.push({box:$scope.box});
    $scope.box++;
  };
```


2) Responding to select behaviour method `setSelected()` obtains or updates selected value from drop-down list. In this example default value is omitted. Single value per drop-down list will be stored in array of selected values, on changed event it's value will be updated accordingly. [Lo-Dash](https://lodash.com/) library utilised to manage selected values in array. 

```javascript
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
```


3) To remove drop-down list method `removeSelect()` respond to this action. Selected value from given drop-down list being removed from array of values first and then drop-down list being removed it's self.

```javascript
  $scope.removeSelect = function(box){
      
       $scope.currentItem = [];

       _.remove($scope.allItems, function(it) { return it.index === box; });

      if(_.find($scope.selectGroup,{'box':box}) ){
          _.remove($scope.selectGroup, function(it) { return it.box === box; });
      }
  };
```




###Support

[Please open an issue on GitHub](https://github.com/alexpechkarev/angular-ui-select/issues)


###License

The MIT License (MIT)

Copyright (c) 2014 Alexander Pechkarev

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.