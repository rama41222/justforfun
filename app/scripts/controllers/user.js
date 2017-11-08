'use strict';
angular.module('justforfunApp').controller('userController', function ($scope,$http,toaster) {
  $scope.getUserHistory = function () {
          var users_name=$scope.username;
          console.log(users_name);
          $http({
          method: 'GET',
          url: 'http://localhost:7000/api/v1/orders/gethistory/'+users_name
      }).then(function(res){
                if(res.status=201)
                {
                    $scope.Products=res.data;
                    //    console.log($scope.Products.to);
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

  $scope.rate = function (val) {
    var productId;
      var dataset;
      var rate;

     angular.forEach($scope.Products, function (Product) {
    if (!!Product.productId) {
    rate=val;
        $scope.disabled=false;
    dataset={
          rate:rate
      }
      productId  =Product.productId;
      }
      })
    console.log("productId"+productId);
    $http({
    method: 'POST',
    url: 'http://localhost:7000/api/v1/rates/'+productId,
    data: dataset,
    headers: { 'Content-Type': 'application/json'}
  }).then(function (res) {
    if (res.status == 201) {
        toaster.pop('success', "success", "Rate successfully added to "+productId);
    } else if (res.status == -1) {
         toaster.pop('error', "error", "Connection Error");
    } else {
        toaster.pop('warning', "warning", "warning");
    }
  })
}
});
