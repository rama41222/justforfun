'use strict';
angular.module('justforfunApp').controller('adminOrderController', function ($scope,$http,toaster) {
getUserHistory();
   function getUserHistory () {
          $http({
          method: 'GET',
          url: 'http://localhost:7000/api/v1/orders/'
      }).then(function(res){
                if(res.status=201)
                {
                    $scope.Products=res.data;
                }
                else if(res.status=-1)
                {
                  toaster.pop('error', 'Error','connction error');
                }
                else{
                    toaster.pop('warning', 'warning','warning');
                }
            }, function (err) {
                toaster.pop('error', 'Error','connction error');
            });
          }

          $scope.status = function () {
            var orderId;
              var dataset;

             angular.forEach($scope.Products, function (Product) {
                 console.log(Product.selected);
            if (!!Product.selected) {
                  dataset={status:"sent"}
                  orderId=Product.orderId;
            }

            })
            console.log("orderId "+orderId);
            $http({
            method: 'PUT',
            url: 'http://localhost:7000/api/v1/orders/changestatus/'+orderId,
            data: dataset,
            headers: { 'Content-Type': 'application/json'}
          }).then(function (res) {
            if (res.status == 201) {
                toaster.pop('update', 'Updated',);
                getUserHistory();
            } else if (res.status == -1) {
              toaster.pop('error','Error', 'connction error');
            } else {
              toaster.pop('warning', 'warning','warning');
            }
          })
        }


  });
