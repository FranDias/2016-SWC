(function(){
  'use strict'
  angular.module('angularDemo', ['ngMaterial']); //initialize module

  //can reference model instead of creating a global variable
  angular.module('angularDemo').controller('angularController',
                                           ['$scope','ProductDataService', function($scope, ProductDataService) {
    var products = ProductDataService.getSampleData();
    $scope.Fruits = products; //use $scope to expose to the view

    //create checkbox filters on the fly with dynamic data
    var filters = [];
    _.each(products, function(product) {
      _.each(product.properties, function(property) {
        var existingFilter = _.findWhere(filters, { name: property.name });

        if (existingFilter) {
          var existingOption = _.findWhere(existingFilter.options, { value: property.value });
          if (existingOption) {
            existingOption.count += 1;
          } else {
            existingFilter.options.push({ value: property.value, count: 1 });
          }
        } else {
          var filter = {};
          filter.name = property.name;
          filter.options = [];
          filter.options.push({ value: property.value, count: 1 });
          filters.push(filter);
        }
      });
    });
    $scope.Filters = filters;

    this.toggleAll = function($event, includeAll) {
      _.each(filters, function(filterCategory) {
        _.each(filterCategory.options, function(option) {
          option.IsIncluded = includeAll;
        });
      });
    };
  }]);

  angular.module('angularDemo').filter('dynamicFilter', function () {
    return function (products, filterCategories, scope) {
      var filtered = [];

      var productFilters = _.filter(filterCategories, function(fc) {
        return  _.any(fc.options, { 'IsIncluded': true });
      });

      _.each(products, function(prod) {
        var includeProduct = true;
        _.each(productFilters, function(filter) {
          var props = _.filter(prod.properties, { 'name': filter.name });
          if (!_.any(props, function(prop) { return _.any(filter.options, { 'value': prop.value, 'IsIncluded': true }); })) {
            includeProduct = false;
          }
        });
        if (includeProduct) {
          filtered.push(prod);
        }
      });
      return filtered;
    };
  });

  angular.module('angularDemo').service('ProductDataService', function() {
    var service = {};

    //sample data
    var products = [
      {
        name: 'bacon',
        properties: [
          { name:'ingredients', value:'bacon' }, { name:'ingredients', value:'ketchup' },
          { name:'ingredients', value:'brown sauce' }, { name:'type', value:'meat' },
        ]
      },{
        name: 'bacon, egg, and cheese',
        properties: [
          { name:'ingredients', value:'bacon' }, { name:'ingredients', value:'egg' },
          { name:'ingredients', value:'cheese' }, { name:'type', value:'meat' },
        ]
      },{
        name: 'baked bean',
        properties: [
          { name:'ingredients', value:'baked beans' }, { name:'ingredients', value:'butter' },
          { name:'type', value:'vegetarian' },
        ]
      },{
        name: 'banh mi',
        properties: [
          { name:'ingredients', value:'sardine' }, { name:'ingredients', value:'pickled carrots' }, { name:'ingredients', value:'cilantro' },
          { name:'ingredients', value:'tofu' }, { name:'ingredients', value:'pepper' },
          { name:'ingredients', value:'pate' }, { name:'ingredients', value:'egg' }, { name:'type', value:'meat' },
        ]
      },{
        name: 'barbecue',
        properties: [
          { name:'ingredients', value:'shredded meat' }, { name:'ingredients', value:'pulled pork' }, { name:'ingredients', value:'beef' },
          { name:'ingredients', value:'chicken' }, { name:'ingredients', value:'coleslaw' },
          { name:'type', value:'meat' },

        ]
      },{
        name: 'barros jarpa',
        properties: [
          { name:'ingredients', value:'ham' }, { name:'ingredients', value:'cheese' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'barros luco',
        properties: [
          { name:'ingredients', value:'beef' }, { name:'ingredients', value:'thin cut steak' }, { name:'ingredients', value:'cheese' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'bauru',
        properties: [
          { name:'ingredients', value:'cheese' },   { name:'ingredients', value:'roast beef' },
          { name:'ingredients', value:'tomato' }, { name:'ingredients', value:'pickled cucumber' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'beef on weck',
        properties: [
          { name:'ingredients', value:'roast beef' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'beirute',
        properties: [
          { name:'ingredients', value:'cheese' }, { name:'ingredients', value:'tomato' }, { name:'ingredients', value:'lettuce' },
          { name:'ingredients', value:'ham' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'BLT',
        properties: [
          { name:'ingredients', value:'bacon' }, { name:'ingredients', value:'lettuce' }, { name:'ingredients', value:'tomato' },
          { name:'ingredients', value:'mayonnaise' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'bocadillo de calamares',
        properties: [
          { name:'ingredients', value:'fried squid' },
          { name:'type', value:'seafood' },
        ]
      },{
        name: 'bologna',
        properties: [
          { name:'ingredients', value:'bologna' }, { name:'ingredients', value:'mustard' }, { name:'ingredients', value:'mayonnaise' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'bosna',
        properties: [
          { name:'ingredients', value:'bratwurst' }, { name:'ingredients', value:'sausage' }, { name:'ingredients', value:'onion' },
          { name:'ingredients', value:'tomato' }, { name:'ingredients', value:'ketchup' }, { name:'ingredients', value:'curry' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'breakfast roll',
        properties: [
          { name:'ingredients', value:'sausage' }, { name:'ingredients', value:'bacon' }, { name:'ingredients', value:'mushroom' },
          { name:'ingredients', value:'tomato' }, { name:'ingredients', value:'egg' },
          { name:'ingredients', value:'ketchup' }, { name:'ingredients', value:'brown sauce' }, { name:'ingredients', value:'white pudding' },
          { name:'ingredients', value:'black pudding' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'breakfast sandwich',
        properties: [
          { name:'ingredients', value:'egg' }, { name:'ingredients', value:'cheese' }, { name:'ingredients', value:'sausage' },
          { name:'ingredients', value:'bacon' }, { name:'ingredients', value:'coleslaw' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'british rail',
        properties: [
          { name:'type', value:'bad' },
        ]
      },{
        name: 'broodje kroket',
        properties: [
          { name:'ingredients', value:'mustard' }, { name:'ingredients', value:'ragout' }, { name:'ingredients', value:'croquette' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'bun kebab',
        properties: [
          { name:'ingredients', value:'lentil' }, { name:'ingredients', value:'onion' }, { name:'ingredients', value:'chutney' },
          { name:'ingredients', value:'raita'},
          { name:'type', value:'vegetarian' },
        ]
      },{
        name: 'butterbrot',
        properties: [
          { name:'ingredients', value:'butter' },
          { name:'type', value:'open-faced' },
        ]
      },{
        name: 'carrozza',
        properties: [
          { name:'ingredients', value:'cheese' },
          { name:'type', value:'vegetarian' },
          { name:'type', value:'breaded' },
          { name:'type', value:'fried' },
        ]
      },{
        name: 'cemita',
        properties: [
          { name:'ingredients', value:'avocado' }, { name:'ingredients', value:'meat' }, { name:'ingredients', value:'cheese' },
          { name:'ingredients', value:'onion' }, { name:'ingredients', value:'salsa' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'chacarero',
        properties: [
          { name:'ingredients', value:'steak' }, { name:'ingredients', value:'pork' }, { name:'ingredients', value:'tomato' },
          { name:'ingredients', value:'green bean' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'grilled cheese',
        properties: [
          { name:'ingredients', value:'cheese' },
          { name:'type', value:'vegetarian' },
        ]
      },{
        name: 'cheese and pickle',
        properties: [
          { name:'ingredients', value:'cheese' }, { name:'ingredients', value:'chutney' }, { name:'ingredients', value:'pickle' },
          { name:'type', value:'vegetarian' },
        ]
      },{
        name: 'cheesesteak',
        properties: [
          { name:'ingredients', value:'steak' }, { name:'ingredients', value:'cheese' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'chicken',
        properties: [
          { name:'ingredients', value:'chicken' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'chicken salad',
        properties: [
          { name:'ingredients', value:'chicken' }, { name:'ingredients', value:'mayonnaise' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'chicken schnitzel',
        properties: [
          { name:'ingredients', value:'chicken' }, { name:'ingredients', value:'lettuce' }, { name:'ingredients', value:'mayonnaise' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'chickpea salad',
        properties: [
          { name:'ingredients', value:'chickpea' }, { name:'ingredients', value:'onion' }, { name:'ingredients', value:'veganaise' },
          { name:'type', value:'vegan' },
        ]
      },{
        name: 'chili burger',
        properties: [
          { name:'ingredients', value:'hamburger' }, { name:'ingredients', value:'chili con carne' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'chimichurri',
        properties: [
          { name:'ingredients', value:'beef' }, { name:'ingredients', value:'chicken' },
          { name:'ingredients', value:'pork' }, { name:'ingredients', value:'cabbage' }, { name:'ingredients', value:'salsa' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'chip butty',
        properties: [
          { name:'ingredients', value:'chips' }, { name:'ingredients', value:'fries' },
          { name:'ingredients', value:'salt vinegar' }, { name:'ingredients', value:'ketchup' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'chipped beef',
        properties: [
          { name:'ingredients', value:'beef' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'chivito',
        properties: [
          { name:'ingredients', value:'filet mignon' }, { name:'ingredients', value:'beef' },
          { name:'ingredients', value:'mozzarella' }, { name:'ingredients', value:'cheese' },
          { name:'ingredients', value:'tomato' }, { name:'ingredients', value:'mayonnaise' },
          { name:'ingredients', value:'bacon' }, { name:'ingredients', value:'olive' },
          { name:'ingredients', value:'egg' }, { name:'ingredients', value:'ham' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'choripan',
        properties: [
          { name:'ingredients', value:'chorizo' }, { name:'ingredients', value:'salsa' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'chow mein',
        properties: [
          { name:'ingredients', value:'gravy' }, { name:'ingredients', value:'meat' },
          { name:'ingredients', value:'noodles' }, { name:'ingredients', value:'onion' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'churrasco',
        properties: [
          { name:'ingredients', value:'steak' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'club',
        properties: [
          { name:'ingredients', value:'turkey' }, { name:'ingredients', value:'chicken' },
          { name:'ingredients', value:'bacon' }, { name:'ingredients', value:'tomato' },
          { name:'ingredients', value:'lettuce' }, { name:'ingredients', value:'mayonnaise' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'corned beef',
        properties: [
          { name:'ingredients', value:'corned beef' }, { name:'ingredients', value:'pickle' },
          { name:'ingredients', value:'mustard' },
          { name:'type', value:'meat' },
            ]
      },{
        name: 'crisp',
        properties: [
          { name:'ingredients', value:'crisps' }, { name:'ingredients', value:'chips' },
          { name:'ingredients', value:'pickle' },
          { name:'type', value:'vegetarian' },
        ]
      },{
        name: 'croque monsieur',
        properties: [
          { name:'ingredients', value:'ham' }, { name:'ingredients', value:'cheese' },
          { name:'ingredients', value:'bechamel' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'croque madame',
        properties: [
          { name:'ingredients', value:'ham' }, { name:'ingredients', value:'cheese' },
          { name:'ingredients', value:'bechamel' }, { name:'ingredients', value:'egg' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'cuban',
        properties: [
          { name:'ingredients', value:'ham' }, { name:'ingredients', value:'pork' },
          { name:'ingredients', value:'cheese' }, { name:'ingredients', value:'mustard' },
          { name:'ingredients', value:'salami' },
          { name:'type', value:'meat' },

        ]
      },{
        name: 'cucumber',
        properties: [
          { name:'ingredients', value:'cucumber' },
          { name:'type', value:'vegetarian' },
        ]
      },{
        name: 'cudighi',
        properties: [
          { name:'ingredients', value:'sausage' }, { name:'ingredients', value:'cheese' },
          { name:'ingredients', value:'mozzarella' }, { name:'ingredients', value:'tomato sauce' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'dagwood',
        properties: [
          { name:'ingredients', value:'meat' }, { name:'ingredients', value:'cheese' },
          { name:'type', value:'meat' },
          { name:'type', value:'huge' },
          { name:'type', value:'stacked' },
        ]
      },{
        name: 'deli',
        properties: [
          { name:'ingredients', value:'meat' }, { name:'ingredients', value:'cheese' },
          { name:'ingredients', value:'lettuce' }, { name:'ingredients', value:'tomato' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'denver',
        properties: [
          { name:'ingredients', value:'egg' }, { name:'ingredients', value:'ham' },
          { name:'ingredients', value:'onion' }, { name:'ingredients', value:'pepper' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'doner kebab',
        properties: [
          { name:'ingredients', value:'veal' }, { name:'ingredients', value:'beef' },
          { name:'ingredients', value:'lamb' }, { name:'ingredients', value:'chicken' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'donkey burger',
        properties: [
          { name:'ingredients', value:'donkey' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'doubles',
        properties: [
          { name:'ingredients', value:'chickpea' }, { name:'ingredients', value:'curry' },
          { name:'type', value:'vegetarian' },
        ]
      },{
        name: 'dynamite',
        properties: [
          { name:'ingredients', value:'beef' }, { name:'ingredients', value:'tomato sauce' },
          { name:'ingredients', value:'onion' }, { name:'ingredients', value:'pepper' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'dyrlægens natmad',
        properties: [
          { name:'ingredients', value:'pate' }, { name:'ingredients', value:'beef' },
          { name:'ingredients', value:'aspic' }, { name:'ingredients', value:'onion' },
          { name:'ingredients', value:'watercress' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'elvis',
        properties: [
          { name:'ingredients', value:'peanut butter' }, { name:'ingredients', value:'banana' },
          { name:'ingredients', value:'bacon' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'egg salad',
        properties: [
          { name:'ingredients', value:'egg' }, { name:'ingredients', value:'mayonnaise' },
          { name:'type', value:'vegetarian' },
        ]
      },{
        name: 'eggs benedict',
        properties: [
          { name:'ingredients', value:'meat' }, { name:'ingredients', value:'egg' },
          { name:'ingredients', value:'hollandaise' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'fairy bread',
        properties: [
          { name:'ingredients', value:'sprinkles' }, { name:'ingredients', value:'butter' },
          { name:'type', value:'vegetarian' },
        ]
      },{
        name: 'falafel',
        properties: [
          { name:'ingredients', value:'chickpea' }, { name:'ingredients', value:'hot sauce' },
          { name:'ingredients', value:'tahini' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'farroupilha',
        properties: [
          { name:'ingredients', value:'mortadella' }, { name:'ingredients', value:'cheese' },
          { name:'ingredients', value:'butter' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'fischbrötchen',
        properties: [
          { name:'ingredients', value:'fish' }, { name:'ingredients', value:'onion' },
          { name:'type', value:'seafood' },
        ]
      },{
        name: 'fools gold loaf',
        properties: [
          { name:'ingredients', value:'peanut butter' }, { name:'ingredients', value:'grape jelly' },
          { name:'ingredients', value:'bacon' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'fluffernutter',
        properties: [
          { name:'ingredients', value:'peanut butter' }, { name:'ingredients', value:'fluff' },
          { name:'type', value:'vegetarian' },
        ]
      },{
        name: 'francesinha',
        properties: [
          { name:'ingredients', value:'ham' }, { name:'ingredients', value:'linguiça' },
          { name:'ingredients', value:'sausage' }, { name:'ingredients', value:'steak' },
          { name:'ingredients', value:'cheese' }, { name:'ingredients', value:'tomato' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'francesinha poveira',
        properties: [
          { name:'ingredients', value:'ham' }, { name:'ingredients', value:'linguiça' },
          { name:'ingredients', value:'cheese' },
          { name:'ingredients', value:'butter' }, { name:'ingredients', value:'port' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'french dip',
        properties: [
          { name:'ingredients', value:'roast beef' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'fried brain',
        properties: [
          { name:'ingredients', value:'calves brain' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'fruit',
        properties: [
          { name:'ingredients', value:'banana' }, { name:'ingredients', value:'fig' },
          { name:'ingredients', value:'pineapple' }, { name:'ingredients', value:'mayonnaise' },
          { name:'type', value:'vegetarian' },
        ]
      },{
        name: 'ftira',
        properties: [
          { name:'ingredients', value:'tomato paste' }, { name:'ingredients', value:'tuna' },
          { name:'ingredients', value:'capers' }, { name:'ingredients', value:'onion' },
          { name:'type', value:'seafood' },
        ]
      },{
        name: 'gatsby',
        properties: [
          { name:'ingredients', value:'fries' }, { name:'ingredients', value:'steak' },
          { name:'ingredients', value:'chicken' }, { name:'ingredients', value:'sausage' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'gerber',
        properties: [
          { name:'ingredients', value:'ham' }, { name:'ingredients', value:'cheese' },
          { name:'ingredients', value:'butter' }, { name:'ingredients', value:'garlic' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'gua bao',
        properties: [
          { name:'ingredients', value:'meat' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'guajolota',
        properties: [
          { name:'ingredients', value:'tamale' },
          { name:'type', value:'vegetarian' },
        ]
      },{
        name: 'gyro',
        properties: [
          { name:'ingredients', value:'tomato' }, { name:'ingredients', value:'onion' },
          { name:'ingredients', value:'tzatziki' }, { name:'ingredients', value:'meat' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'hagelslag',
        properties: [
          { name:'ingredients', value:'sprinkles' }, { name:'ingredients', value:'butter' },
          { name:'type', value:'vegetarian' },
        ]
      },{
        name: 'ham',
        properties: [
          { name:'ingredients', value:'ham' }, { name:'ingredients', value:'cheese' },
          { name:'ingredients', value:'mustard' }, { name:'ingredients', value:'mayonnaise' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'ham and cheese',
        properties: [
          { name:'ingredients', value:'ham' }, { name:'ingredients', value:'cheese' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'ham and egg bun',
        properties: [
          { name:'ingredients', value:'ham' }, { name:'ingredients', value:'egg' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'hamburger',
        properties: [
          { name:'ingredients', value:'beef' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'hamdog',
        properties: [
          { name:'ingredients', value:'hot dog' }, { name:'ingredients', value:'beef' },
          { name:'ingredients', value:'chili' }, { name:'ingredients', value:'fries' },
          { name:'ingredients', value:'egg' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'har cheong gai',
        properties: [
          { name:'ingredients', value:'chicken' }, { name:'ingredients', value:'shrimp paste' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'horseshoe',
        properties: [
          { name:'ingredients', value:'beef' }, { name:'ingredients', value:'ham' },
          { name:'ingredients', value:'pork' }, { name:'ingredients', value:'chicken' },
          { name:'ingredients', value:'fish' }, { name:'ingredients', value:'fries' },
          { name:'ingredients', value:'cheese' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'hot brown',
        properties: [
          { name:'ingredients', value:'turkey' }, { name:'ingredients', value:'bacon' },
          { name:'ingredients', value:'mornay sauce' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'hot chicken',
        properties: [
          { name:'ingredients', value:'chicken' }, { name:'ingredients', value:'gravy' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'hot turkey',
        properties: [
          { name:'ingredients', value:'turkey' }, { name:'ingredients', value:'gravy' },
          { name:'ingredients', value:'potato' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'ice cream',
        properties: [
          { name:'ingredients', value:'ice cream' },
          { name:'type', value:'vegetarian' },
        ]
      },{
        name: 'italian beef',
        properties: [
          { name:'ingredients', value:'roast beef' }, { name:'ingredients', value:'pepper' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'italiano',
        properties: [
          { name:'ingredients', value:'tomato' }, { name:'ingredients', value:'mayonnaise' },
          { name:'ingredients', value:'avocado' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'italian',
        properties: [
          { name:'ingredients', value:'salami' }, { name:'ingredients', value:'mortadella' },
          { name:'ingredients', value:'capicola' }, { name:'ingredients', value:'cheese' },
          { name:'ingredients', value:'tomato' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'jam',
        properties: [
          { name:'ingredients', value:'butter' }, { name:'ingredients', value:'jam' },
          { name:'type', value:'vegetarian' },
        ]
      },{
        name: 'jambon-beurre',
        properties: [
          { name:'ingredients', value:'butter' }, { name:'ingredients', value:'ham' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'jibarito',
        properties: [
          { name:'ingredients', value:'meat' }, { name:'ingredients', value:'cheese' },
          { name:'ingredients', value:'lettuce' }, { name:'ingredients', value:'tomato' },
          { name:'ingredients', value:'plantain' }, { name:'ingredients', value:'mayonnaise' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'jucy lucy',
        properties: [
          { name:'ingredients', value:'beef' }, { name:'ingredients', value:'cheese' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'katsu sando',
        properties: [
          { name:'ingredients', value:'pork' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'kokoretsi',
        properties: [
          { name:'ingredients', value:'lamb intestine' }, { name:'ingredients', value:'goat intestine' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'kottenbutter',
        properties: [
          { name:'ingredients', value:'pork' }, { name:'ingredients', value:'sausage' },
          { name:'ingredients', value:'onion' }, { name:'ingredients', value:'mustard' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'larry david',
        properties: [
          { name:'ingredients', value:'white fish' }, { name:'ingredients', value:'capers' },
          { name:'ingredients', value:'onion' }, { name:'ingredients', value:'cream cheese' },
          { name:'type', value:'vegetarian' },
        ]
      },{
        name: 'leberkäse',
        properties: [
          { name:'ingredients', value:'bologna' }, { name:'ingredients', value:'mustard' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'lettuce',
        properties: [
          { name:'ingredients', value:'lettuce' }, { name:'ingredients', value:'mayonnaise' },
          { name:'type', value:'vegetarian' },
        ]
      },{
        name: 'limburger',
        properties: [
          { name:'ingredients', value:'cheese' }, { name:'ingredients', value:'onion' },
          { name:'ingredients', value:'mustard' },
          { name:'type', value:'vegetarian' },
        ]
      },{
        name: 'lobster roll',
        properties: [
          { name:'ingredients', value:'mayonnaise' }, { name:'ingredients', value:'butter' },
          { name:'ingredients', value:'lobster' },
          { name:'type', value:'seafood' },
        ]
      },{
        name: 'lox',
        properties: [
          { name:'ingredients', value:'salmon' }, { name:'ingredients', value:'onion' },
          { name:'ingredients', value:'cream cheese' }, { name:'ingredients', value:'capers' },
          { name:'ingredients', value:'tomato' },
          { name:'type', value:'seafood' },
        ]
      },{
        name: 'luther burger',
        properties: [
          { name:'ingredients', value:'beef' }, { name:'ingredients', value:'cheese' },
          { name:'ingredients', value:'doughnut' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'mallorca de jamón y queso',
        properties: [
          { name:'ingredients', value:'ham' }, { name:'ingredients', value:'cheese' },
          { name:'ingredients', value:'sugar' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'marmite',
        properties: [
          { name:'ingredients', value:'marmite' }, { name:'ingredients', value:'butter' },
          { name:'type', value:'vegetarian' },
        ]
      },{
        name: 'martino',
        properties: [
          { name:'ingredients', value:'steak' }, { name:'ingredients', value:'worcestershire sauce' },
          { name:'ingredients', value:'pickle' }, { name:'ingredients', value:'onion' },
          { name:'ingredients', value:'pepper' }, { name:'ingredients', value:'martino sauce' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'meatball',
        properties: [
          { name:'ingredients', value:'meatball' }, { name:'ingredients', value:'cheese' },
          { name:'ingredients', value:'marinara' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'medianoche',
        properties: [
          { name:'ingredients', value:'pork' }, { name:'ingredients', value:'ham' },
          { name:'ingredients', value:'mustard' }, { name:'ingredients', value:'cheese' },
          { name:'ingredients', value:'pickle' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'mitraillette',
        properties: [
          { name:'ingredients', value:'fries' }, { name:'ingredients', value:'meat' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'melt',
        properties: [
          { name:'ingredients', value:'cheese' },
          { name:'type', value:'vegetarian' },
        ]
      },{
        name: 'mettbrötchen',
        properties: [
          { name:'ingredients', value:'pork' }, { name:'ingredients', value:'onion' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'mollete',
        properties: [
          { name:'ingredients', value:'refried beans' }, { name:'ingredients', value:'cheese' },
          { name:'ingredients', value:'pepper' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'montadito',
        properties: [
          { name:'ingredients', value:'meat' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'monte cristo',
        properties: [
          { name:'ingredients', value:'ham' }, { name:'ingredients', value:'cheese' },
          { name:'ingredients', value:'french toast' }, { name:'ingredients', value:'sugar' },
          { name:'ingredients', value:'mustard' }, { name:'ingredients', value:'jam' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'montreal-style smoked meat',
        properties: [
          { name:'ingredients', value:'brisket' }, { name:'ingredients', value:'mustard' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'mortadella',
        properties: [
          { name:'ingredients', value:'mortadella' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'mother-in-law',
        properties: [
          { name:'ingredients', value:'chili' }, { name:'ingredients', value:'corn roll' },
          { name:'ingredients', value:'tamale' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'muffuletta',
        properties: [
          { name:'ingredients', value:'meat' }, { name:'ingredients', value:'cheese' },
          { name:'ingredients', value:'olive salad' }, { name:'ingredients', value:'mortadella' },
          { name:'ingredients', value:'salami' }, { name:'ingredients', value:'mozarella' },
          { name:'ingredients', value:'ham' }, { name:'ingredients', value:'provolone' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'naan',
        properties: [
          { name:'ingredients', value:'beef' }, { name:'ingredients', value:'naan' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'obložené chlebíčky',
        properties: [
          { name:'ingredients', value:'butter' }, { name:'ingredients', value:'meat' },
          { name:'ingredients', value:'cheese' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'pambazo',
        properties: [
          { name:'ingredients', value:'potato' }, { name:'ingredients', value:'chorizo' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'pan-bagnat',
        properties: [
          { name:'ingredients', value:'tomato' }, { name:'ingredients', value:'egg' },
          { name:'ingredients', value:'tuna' }, { name:'ingredients', value:'anchovy' },
          { name:'ingredients', value:'cucumber' }, { name:'ingredients', value:'pepper' },
          { name:'type', value:'vegetarian' },
        ]
      },{
        name: 'panini',
        properties: [
          { name:'ingredients', value:'meat' }, { name:'ingredients', value:'cheese' },
          { name:'ingredients', value:'salami' }, { name:'ingredients', value:'ham' },
          { name:'ingredients', value:'mortadella' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'pastrami',
        properties: [
          { name:'ingredients', value:'pastrami' }, { name:'ingredients', value:'mustard' },
          { name:'ingredients', value:'pickle' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'patty melt',
        properties: [
          { name:'ingredients', value:'beef' }, { name:'ingredients', value:'onion' },
          { name:'ingredients', value:'cheese' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'peanut butter and jelly',
        properties: [
          { name:'ingredients', value:'peanut butter' }, { name:'ingredients', value:'jelly' },
          { name:'ingredients', value:'jam' },
          { name:'type', value:'vegetarian' },
        ]
      },{
        name: 'pebete',
        properties: [
          { name:'ingredients', value:'cheese' }, { name:'ingredients', value:'meat' },
          { name:'ingredients', value:'tomato' }, { name:'ingredients', value:'mayonnaise' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'pepito',
        properties: [
          { name:'ingredients', value:'steak' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'pimento cheese',
        properties: [
          { name:'ingredients', value:'mayonnaise' }, { name:'ingredients', value:'pimento' },
          { name:'type', value:'vegetarian' },
        ]
      },{
        name: 'pistolette',
        properties: [
          { name:'ingredients', value:'crawfish' }, { name:'ingredients', value:'cheese' },
          { name:'ingredients', value:'meat' }, { name:'ingredients', value:'jalapeno' },
          { name:'type', value:'meat' },
          { name:'type', value:'seafood' },

        ]
      },{
        name: 'pljeskavica',
        properties: [
          { name:'ingredients', value:'meat' }, { name:'ingredients', value:'onion' },
          { name:'ingredients', value:'cheese' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'po boy',
        properties: [
          { name:'ingredients', value:'meat' }, { name:'ingredients', value:'shrimp' },
          { name:'type', value:'meat' },
          { name:'type', value:'seafood' },

        ]
      },{
        name: 'polish boy',
        properties: [
          { name:'ingredients', value:'sausage' }, { name:'ingredients', value:'kielbasa' },
          { name:'ingredients', value:'fries' }, { name:'ingredients', value:'coleslaw' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'porilainen',
        properties: [
          { name:'ingredients', value:'sausage' }, { name:'ingredients', value:'onion' },
          { name:'ingredients', value:'pickle' }, { name:'ingredients', value:'ketchup' },
          { name:'ingredients', value:'mustard' }, { name:'ingredients', value:'mayonnaise' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'pork chop bun',
        properties: [
          { name:'ingredients', value:'pork' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'pork tenderloin',
        properties: [
          { name:'ingredients', value:'pork' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'primanti',
        properties: [
          { name:'ingredients', value:'fries' }, { name:'ingredients', value:'meat' },
          { name:'ingredients', value:'coleslaw' }, { name:'ingredients', value:'tomato' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'prosperity',
        properties: [
          { name:'ingredients', value:'ham' }, { name:'ingredients', value:'turkey' },
          { name:'ingredients', value:'cheese' },{ name:'ingredients', value:'bacon' },
          { name:'ingredients', value:'tomato' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'pudgy pie',
        properties: [
          { name:'ingredients', value:'butter' }, { name:'ingredients', value:'cheese' },
          { name:'ingredients', value:'marinara' },
          { name:'type', value:'meat' },
          { name:'type', value:'vegetarian' },
        ]
      },{
        name: 'pulled pork',
        properties: [
          { name:'ingredients', value:'pork' }, { name:'ingredients', value:'barbecue sauce' },
          { name:'ingredients', value:'coleslaw' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'reuben',
        properties: [
          { name:'ingredients', value:'corned beef' }, { name:'ingredients', value:'sauerkraut' },
          { name:'ingredients', value:'cheese' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'roast beef',
        properties: [
          { name:'ingredients', value:'roast beef' },
          { name:'type', value:'meat' },        ]
      },{
        name: 'roti john',
        properties: [
          { name:'ingredients', value:'eggs' }, { name:'ingredients', value:'onion' },
          { name:'ingredients', value:'sardine' }, { name:'ingredients', value:'chicken' },
          { name:'ingredients', value:'beef' }, { name:'ingredients', value:'mayonnaise' },
          { name:'ingredients', value:'cheese' },
          { name:'type', value:'meat' },
          { name:'type', value:'vegetarian' },
        ]
      },{
        name: 'rou jia mo',
        properties: [
          { name:'ingredients', value:'pork' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'runza',
        properties: [
          { name:'ingredients', value:'meat' }, { name:'ingredients', value:'cabbage' },
          { name:'ingredients', value:'cheese' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'sailor',
        properties: [
          { name:'ingredients', value:'pastrami' }, { name:'ingredients', value:'sausage' },
          { name:'ingredients', value:'cheese' }, { name:'ingredients', value:'mustard' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'sándwich de milanesa',
        properties: [
          { name:'ingredients', value:'beef' }, { name:'ingredients', value:'chicken' },
          { name:'ingredients', value:'veal' }, { name:'ingredients', value:'pork' },
          { name:'ingredients', value:'tomato' }, { name:'ingredients', value:'lettuce' },
          { name:'ingredients', value:'onion' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'de miga',
        properties: [
          { name:'ingredients', value:'meat' }, { name:'ingredients', value:'eggs' },
          { name:'ingredients', value:'cheese' }, { name:'ingredients', value:'tomato' },
          { name:'ingredients', value:'pepper' }, { name:'ingredients', value:'lettuce' },
          { name:'ingredients', value:'olive' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'salt beef',
        properties: [
          { name:'ingredients', value:'corned beef' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'sausage',
        properties: [
          { name:'ingredients', value:'sausage' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'shawarma',
        properties: [
          { name:'ingredients', value:'beef' }, { name:'ingredients', value:'spinach' },
          { name:'ingredients', value:'tomato' }, { name:'ingredients', value:'cucumber' },
          { name:'ingredients', value:'tahini' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'shuco',
        properties: [
          { name:'ingredients', value:'guacamole' }, { name:'ingredients', value:'cabbage' },
          { name:'ingredients', value:'ketchup' }, { name:'ingredients', value:'mustard' },
          { name:'ingredients', value:'mayonnaise' }, { name:'ingredients', value:'beef' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'slider',
        properties: [
          { name:'ingredients', value:'beef' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'sloppy joe',
        properties: [
          { name:'ingredients', value:'beef' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'new jersey sloppy joe',
        properties: [
          { name:'ingredients', value:'turkey' }, { name:'ingredients', value:'ham' },
          { name:'ingredients', value:'pastrami' }, { name:'ingredients', value:'corned beef' },
          { name:'ingredients', value:'roast beef' }, { name:'ingredients', value:'cheese' },
          { name:'ingredients', value:'coleslaw' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'smörgåstårta',
        properties: [
          { name:'ingredients', value:'egg' }, { name:'ingredients', value:'mayonnaise' },
          { name:'ingredients', value:'pate' }, { name:'ingredients', value:'olive' },
          { name:'ingredients', value:'shrimp' }, { name:'ingredients', value:'ham' },
          { name:'ingredients', value:'tomato' }, { name:'ingredients', value:'cucumber' },
          { name:'ingredients', value:'cheese' },
          { name:'type', value:'meat' },
          { name:'type', value:'vegetarian' },

        ]
      },{
        name: 'smørrebrød',
        properties: [
          { name:'ingredients', value:'meat' }, { name:'ingredients', value:'fish' },
          { name:'ingredients', value:'cheese' },
          { name:'type', value:'meat' },
          { name:'type', value:'vegetarian' },

        ]
      },{
        name: 'sol over gudhjem',
        properties: [
          { name:'ingredients', value:'herring' }, { name:'ingredients', value:'chive' },
          { name:'ingredients', value:'egg' },
          { name:'type', value:'vegetarian' },
        ]
      },{
        name: 'souvlaki',
        properties: [
          { name:'ingredients', value:'lamb' }, { name:'ingredients', value:'beef' },
          { name:'ingredients', value:'pork' }, { name:'ingredients', value:'chicken' },
          { name:'ingredients', value:'lettuce' }, { name:'ingredients', value:'tomato' },
          { name:'ingredients', value:'cheese' }, { name:'ingredients', value:'onion' },
          { name:'ingredients', value:'tzatziki' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'spaghetti',
        properties: [
          { name:'ingredients', value:'spaghetti' }, { name:'ingredients', value:'marinara' },
          { name:'type', value:'vegetarian' },
        ]
      },{
        name: 'spiedie',
        properties: [
          { name:'ingredients', value:'chicken' }, { name:'ingredients', value:'pork' },
          { name:'ingredients', value:'lamb' }, { name:'ingredients', value:'veal' },
          { name:'ingredients', value:'beef' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'st. paul',
        properties: [
          { name:'ingredients', value:'bean sprout' }, { name:'ingredients', value:'onion' },
          { name:'ingredients', value:'pickle' }, { name:'ingredients', value:'mayonnaise' },
          { name:'ingredients', value:'lettuce' }, { name:'ingredients', value:'tomato' },
          { name:'type', value:'vegeterian' },
        ]
      },{
        name: 'steak bomb',
        properties: [
          { name:'ingredients', value:'steak' }, { name:'ingredients', value:'salami' },
          { name:'ingredients', value:'provolone' }, { name:'ingredients', value:'onion' },
          { name:'ingredients', value:'pepper' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'steak burger',
        properties: [
          { name:'ingredients', value:'steak' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'steak',
        properties: [
          { name:'ingredients', value:'steak' }, { name:'ingredients', value:'cheese' },
          { name:'ingredients', value:'onion' }, { name:'ingredients', value:'mushroom' },
          { name:'ingredients', value:'pepper' }, { name:'ingredients', value:'tomato' },
          { name:'ingredients', value:'egg' }, { name:'ingredients', value:'coleslaw' },
          { name:'ingredients', value:'fries' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'tavern',
        properties: [
          { name:'ingredients', value:'beef' }, { name:'ingredients', value:'onion' },
          { name:'ingredients', value:'pickle' }, { name:'ingredients', value:'ketchup' },
          { name:'ingredients', value:'mustard' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'tea',
        properties: [
          { name:'ingredients', value:'cream cheese' }, { name:'ingredients', value:'mayonnaise' },
          { name:'ingredients', value:'radish' }, { name:'ingredients', value:'cucumber' },
          { name:'ingredients', value:'asparagus' }, { name:'ingredients', value:'watercress' },
          { name:'ingredients', value:'pimento' }, { name:'ingredients', value:'salmon' },
          { name:'ingredients', value:'egg' }, { name:'ingredients', value:'chicken' },
          { name:'type', value:'meat' },
          { name:'type', value:'vegetarian' },

        ]
      },{
        name: 'tempeh lettuce tomato',
        properties: [
          { name:'ingredients', value:'tempeh' }, { name:'ingredients', value:'lettuce' },
          { name:'ingredients', value:'tomato' }, { name:'ingredients', value:'avocado' },
          { name:'type', value:'vegan' },
        ]
      },{
        name: 'toast hawaii',
        properties: [
          { name:'ingredients', value:'ham' }, { name:'ingredients', value:'cherry' },
          { name:'ingredients', value:'pineapple' }, { name:'ingredients', value:'cheese' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'tofu sandwich',
        properties: [
          { name:'ingredients', value:'tofu' },
          { name:'type', value:'vegan' },
        ]
      },{
        name: 'tongue toast',
        properties: [
          { name:'ingredients', value:'beef tongue' }, { name:'ingredients', value:'egg' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'torta',
        properties: [
          { name:'ingredients', value:'refried beans' }, { name:'ingredients', value:'meat' },
          { name:'ingredients', value:'cheese' }, { name:'ingredients', value:'tomato' },
          { name:'ingredients', value:'onion' }, { name:'ingredients', value:'avocado' },
          { name:'ingredients', value:'pepper' }, { name:'ingredients', value:'jalapeno' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'torta ahogada',
        properties: [
          { name:'ingredients', value:'pork' }, { name:'ingredients', value:'chicken' },
          { name:'ingredients', value:'meat' }, { name:'ingredients', value:'cheese' },
          { name:'ingredients', value:'hot sauce' }, { name:'ingredients', value:'onion' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'tramezzino',
        properties: [
          { name:'ingredients', value:'tuna' }, { name:'ingredients', value:'olive' },
          { name:'ingredients', value:'prosciutto' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'tripleta',
        properties: [
          { name:'ingredients', value:'beef' }, { name:'ingredients', value:'pork' },
          { name:'ingredients', value:'chicken' }, { name:'ingredients', value:'ham' },
          { name:'ingredients', value:'mustard' }, { name:'ingredients', value:'ketchup' },
          { name:'ingredients', value:'mayonnaise' }, { name:'ingredients', value:'cabbage' },
          { name:'ingredients', value:'lettuce' }, { name:'ingredients', value:'onion' },
          { name:'ingredients', value:'tomato' }, { name:'ingredients', value:'pickle' },
          { name:'ingredients', value:'cheese' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'tuna',
        properties: [
          { name:'ingredients', value:'tuna' }, { name:'ingredients', value:'mayonnaise' },
          { name:'type', value:'seafood' },
        ]
      },{
        name: 'vada pav',
        properties: [
          { name:'ingredients', value:'potato' },
          { name:'type', value:'vegetarian' },
        ]
      },{
        name: 'wurstbrot',
        properties: [
          { name:'ingredients', value:'butter' }, { name:'ingredients', value:'meat' },
          { name:'ingredients', value:'sausage' },
          { name:'type', value:'meat' },
        ]
      },{
        name: 'yakisoba-pan',
        properties: [
          { name:'ingredients', value:'noodles' }, { name:'ingredients', value:'pickle' },
          { name:'ingredients', value:'mayonnaise' },
          { name:'type', value:'vegetarian' },
        ]
      },{
        name: 'zapiekanka',
        properties: [
          { name:'ingredients', value:'mushroom' }, { name:'ingredients', value:'cheese' },
          { name:'ingredients', value:'ham' }, { name:'ingredients', value:'meat' },
          { name:'type', value:'meat' },
        ]












      }
    ];


    service.getSampleData = function() {
      return products;
    };

    return service;
  });

})();
