'use strict';
angular.module('justforfunApp').controller('productController', function ($scope,$http) {

  // $scope.submit = function () {
  //         var orderId = $scope.orderId;
  //         var totalAmount=$scope.totalAmount;
  //         var cardNo=$scope.cardNo;
  //         var pdate = new Date();
  //         var dataset={
  //             orderId:orderId,
  //             paidAmount:totalAmount,
  //             cardNo:cardNo,
  //             paidDate:pdate
  //         }
  //         $http({
  //         method: 'POST',
  //         url: 'http://localhost:7000/api/v1/payments/',
  //         data: dataset,
  //         headers: { 'Content-Type': 'application/json'}
  //     }).then(function (res) {
  //         if (res.status == 201) {
  //             alert("Success!!!");
  //         } else if (res.status == -1) {
  //             alert('danger123', 'Oops! ', 'Connection Lost');
  //         } else {
  //             alert('warning', 'Oops! ');
  //         }
  //     })
  // }

});
