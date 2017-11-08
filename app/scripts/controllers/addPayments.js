'use strict';
angular.module('justforfunApp').controller('addPaymentController', function ($scope,$http,toaster) {

$scope.submit = function () {
        var orderId = $scope.orderId;
        var totalAmount=$scope.totalAmount;
        var cardNo=$scope.cardNo;
        var pdate = new Date();
        var dataset={
            orderId:orderId,
            paidAmount:totalAmount,
            cardNo:cardNo,
            paidDate:pdate
        }
        $http({
        method: 'POST',
        url: 'http://localhost:7000/api/v1/payments/',
        data: dataset,
        headers: { 'Content-Type': 'application/json'}
    }).then(function (res) {
        if (res.status == 201) {
              toaster.pop('success', "success", "Payment Success");
        } else if (res.status == -1) {
            toaster.pop('error', "error", "Connection Error");
        } else {
            toaster.pop('warning', "Warning", "warning");
        }
    })
}
  });
