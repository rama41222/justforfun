'use strict';
angular.module('justforfunApp').controller('noteController', function ($scope,$http) {
getNotes();
  function getNotes  () {
          $http({
          method: 'GET',
          url: 'http://localhost:7000/api/v1/notes',

      }).then(function(res){
                if(res.status=200)
                {
                    $scope.Notes=res.data;
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
