'use strict';
angular.module('justforfunApp').controller('paymentController', function ($scope,$http,toaster) {


    $scope.addNotes = function () {
            var productId = $scope.projectId;
            var note=$scope.note;
            var dataset={
                productId:productId,
                note:note
            }
            console.log("inside payment.js")
            $http({
            method: 'POST',
            url: 'http://localhost:7000/api/v1/notes',
            data: dataset,
            headers: { 'Content-Type': 'application/json'}
        }).then(function (res) {
            if (res.status == 200) {
              toaster.pop('success', "success", "text");
            } else if (res.status == -1) {
                toaster.pop('error', "error", "Connection Error");
            } else {
               toaster.pop('note', "note", "text");
            }
        })
    }


    $scope.addRate = function () {
            var rate=$scope.rate;
            var dataset={
                rate:rate
            }
            console.log("inside payment.js")
            $http({
            method: 'POST',
            url: 'http://localhost:7000/api/v1/notes',
            data: dataset,
            headers: { 'Content-Type': 'application/json'}
        }).then(function (res) {
            if (res.status == 200) {
              toaster.pop('success', "success", "text");
            } else if (res.status == -1) {
               toaster.pop('error', "error", "Connection Error");
            } else {
              toaster.pop('warning', "warning", "warning");
            }
        })
    }



    $scope.getPayments = function () {
      var userName=$scope.username;
            $http({
            method: 'GET',
            url: 'http://localhost:7000/api/v1/payments/getpayments/'+userName
        }).then(function (res) {
            if (res.status == 201) {
                $scope.payments=res.data;
                console.log($scope.payments.paidAmount);
                console.log($scope.payments);
                 toaster.pop('error', "error",$scope.payments );
              //  alert("Success!!!");
            } else if (res.status == -1) {
                 toaster.pop('error', "error", "Connection Error");
            } else {
              toaster.pop('warning', "warning", "warning");
            }
        })
    }




  });
