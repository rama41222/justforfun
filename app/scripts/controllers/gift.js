'use strict';
angular.module('justforfunApp').controller('giftController', function ($scope,$http,toaster) {
getProducts();

function getProducts() {
  $http({
  method: 'GET',
  url: 'http://localhost:7000/api/v1/products'
}).then(function(res){
        if(res.status=201)
        {
            $scope.Products=res.data;
            // $scope.images=  $scope.Products.image;
            console.log($scope.Products);
            //"https://www.google.com/images/srpr/logo11w.png";
        }
        else if(res.status=-1)
        {
           toaster.pop('error', "error", "Connection Error");
        }
        else{
            toaster.pop('warning', "warning", "text");
        }
    }, function (err) {
       toaster.pop('error', "error", "Connection Error");
    });
}

$scope.searchByCategory= function () {
        var category=$scope.categoryname;

        $http({
        method: 'GET',
        url: 'http://localhost:7000/api/v1/products/getbycategory/'+category
    }).then(function(res){
              if(res.status=201)
              {
                  $scope.Products=res.data;
                  console.log($scope.products);
              }
              else if(res.status=-1)
              {
                   toaster.pop('error', "error", "Connection Error");
              }
              else{
                toaster.pop('warning', "warning", "warning");
              }
          }, function (err) {
               toaster.pop('error', "error", "Connection Error");
          });
        }


});
