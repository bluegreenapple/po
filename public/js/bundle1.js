(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var app = angular.module('ui.bootstrap.demo', ['ui.bootstrap','equipamentoService','diagnosticosServices']);

app.controller('ModalDemoCtrl', ['$scope','$http','Equipamentos', '$modal', '$log',function ($scope,$http,Equipamentos, $modal, $log) {

  $scope.formData = {};
  $scope.loading = true;

  // GET =====================================================================
  // when landing on the page, get all equipamentos and show them
  // use the service to get all the equipamentos
  Equipamentos.get()
    .success(function(data) {
      $scope.equipamentos = data;
      $scope.loading = false;
    });

  // DELETE ==================================================================
  // delete a equipamento after checking it
  $scope.deleteEquipamento = function(id) {
    $scope.loading = true;

    Equipamentos.delete(id)
      // if successful creation, call our get function to get all the new equipamentos
      .success(function(data) {
        $scope.loading = false;
        $scope.equipamentos = data; // assign our new list of equipamentos
      });
  };

  $scope.items = ['item1', 'item2', 'item3'];
  $scope.animationsEnabled = true;

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      windowClass: 'center-modal',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      // $scope.selected = selectedItem;
      $scope.equipamentos = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  
  $scope.openDiagnostico = function (aEquipamento) {
      
      var url = '/diagnosticos';   
      var newTab = window.open(url, '_blank'); // in new tab
      newTab.equipamento = aEquipamento;
            
  };


}]);

app.controller('ModalInstanceCtrl',['$scope','$http','Equipamentos', '$modalInstance', 'items', function ($scope,$http,Equipamentos, $modalInstance, items) {

  $scope.formData = {};
  $scope.loading = true;
// CREATE ==================================================================
  // when submitting the add form, send the text to the node API
  $scope.createEquipamento = function() {
    alert('I submit');
    // validate the formData to make sure that something is there
    // if form is empty, nothing will happen
    if ($scope.formData.tag != undefined) {
      $scope.loading = true;

      // call the create function from our service (returns a promise object)
      Equipamentos.create($scope.formData)

        // if successful creation, call our get function to get all the new equipamentos
        .success(function(data) {
          $scope.loading = false;
          $scope.formData = {}; // clear the form so our user is ready to enter another
          $scope.equipamentos = data; // assign our new list of equipamentos
          $modalInstance.close($scope.equipamentos);
        });
    }
  };

 

  $scope.ok = function () {
    $modalInstance.close($scope.equipamentos);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvanMvY29udHJvbGxlcnMvZXhhbXBsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCd1aS5ib290c3RyYXAuZGVtbycsIFsndWkuYm9vdHN0cmFwJywnZXF1aXBhbWVudG9TZXJ2aWNlJywnZGlhZ25vc3RpY29zU2VydmljZXMnXSk7XG5cbmFwcC5jb250cm9sbGVyKCdNb2RhbERlbW9DdHJsJywgWyckc2NvcGUnLCckaHR0cCcsJ0VxdWlwYW1lbnRvcycsICckbW9kYWwnLCAnJGxvZycsZnVuY3Rpb24gKCRzY29wZSwkaHR0cCxFcXVpcGFtZW50b3MsICRtb2RhbCwgJGxvZykge1xuXG4gICRzY29wZS5mb3JtRGF0YSA9IHt9O1xuICAkc2NvcGUubG9hZGluZyA9IHRydWU7XG5cbiAgLy8gR0VUID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAvLyB3aGVuIGxhbmRpbmcgb24gdGhlIHBhZ2UsIGdldCBhbGwgZXF1aXBhbWVudG9zIGFuZCBzaG93IHRoZW1cbiAgLy8gdXNlIHRoZSBzZXJ2aWNlIHRvIGdldCBhbGwgdGhlIGVxdWlwYW1lbnRvc1xuICBFcXVpcGFtZW50b3MuZ2V0KClcbiAgICAuc3VjY2VzcyhmdW5jdGlvbihkYXRhKSB7XG4gICAgICAkc2NvcGUuZXF1aXBhbWVudG9zID0gZGF0YTtcbiAgICAgICRzY29wZS5sb2FkaW5nID0gZmFsc2U7XG4gICAgfSk7XG5cbiAgLy8gREVMRVRFID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAvLyBkZWxldGUgYSBlcXVpcGFtZW50byBhZnRlciBjaGVja2luZyBpdFxuICAkc2NvcGUuZGVsZXRlRXF1aXBhbWVudG8gPSBmdW5jdGlvbihpZCkge1xuICAgICRzY29wZS5sb2FkaW5nID0gdHJ1ZTtcblxuICAgIEVxdWlwYW1lbnRvcy5kZWxldGUoaWQpXG4gICAgICAvLyBpZiBzdWNjZXNzZnVsIGNyZWF0aW9uLCBjYWxsIG91ciBnZXQgZnVuY3Rpb24gdG8gZ2V0IGFsbCB0aGUgbmV3IGVxdWlwYW1lbnRvc1xuICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAkc2NvcGUubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAkc2NvcGUuZXF1aXBhbWVudG9zID0gZGF0YTsgLy8gYXNzaWduIG91ciBuZXcgbGlzdCBvZiBlcXVpcGFtZW50b3NcbiAgICAgIH0pO1xuICB9O1xuXG4gICRzY29wZS5pdGVtcyA9IFsnaXRlbTEnLCAnaXRlbTInLCAnaXRlbTMnXTtcbiAgJHNjb3BlLmFuaW1hdGlvbnNFbmFibGVkID0gdHJ1ZTtcblxuICAkc2NvcGUub3BlbiA9IGZ1bmN0aW9uIChzaXplKSB7XG5cbiAgICB2YXIgbW9kYWxJbnN0YW5jZSA9ICRtb2RhbC5vcGVuKHtcbiAgICAgIGFuaW1hdGlvbjogJHNjb3BlLmFuaW1hdGlvbnNFbmFibGVkLFxuICAgICAgdGVtcGxhdGVVcmw6ICdteU1vZGFsQ29udGVudC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdNb2RhbEluc3RhbmNlQ3RybCcsXG4gICAgICB3aW5kb3dDbGFzczogJ2NlbnRlci1tb2RhbCcsXG4gICAgICBzaXplOiBzaXplLFxuICAgICAgcmVzb2x2ZToge1xuICAgICAgICBpdGVtczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiAkc2NvcGUuaXRlbXM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIG1vZGFsSW5zdGFuY2UucmVzdWx0LnRoZW4oZnVuY3Rpb24gKHNlbGVjdGVkSXRlbSkge1xuICAgICAgLy8gJHNjb3BlLnNlbGVjdGVkID0gc2VsZWN0ZWRJdGVtO1xuICAgICAgJHNjb3BlLmVxdWlwYW1lbnRvcyA9IHNlbGVjdGVkSXRlbTtcbiAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAkbG9nLmluZm8oJ01vZGFsIGRpc21pc3NlZCBhdDogJyArIG5ldyBEYXRlKCkpO1xuICAgIH0pO1xuICB9O1xuXG4gIFxuICAkc2NvcGUub3BlbkRpYWdub3N0aWNvID0gZnVuY3Rpb24gKGFFcXVpcGFtZW50bykge1xuICAgICAgXG4gICAgICB2YXIgdXJsID0gJy9kaWFnbm9zdGljb3MnOyAgIFxuICAgICAgdmFyIG5ld1RhYiA9IHdpbmRvdy5vcGVuKHVybCwgJ19ibGFuaycpOyAvLyBpbiBuZXcgdGFiXG4gICAgICBuZXdUYWIuZXF1aXBhbWVudG8gPSBhRXF1aXBhbWVudG87XG4gICAgICAgICAgICBcbiAgfTtcblxuXG59XSk7XG5cbmFwcC5jb250cm9sbGVyKCdNb2RhbEluc3RhbmNlQ3RybCcsWyckc2NvcGUnLCckaHR0cCcsJ0VxdWlwYW1lbnRvcycsICckbW9kYWxJbnN0YW5jZScsICdpdGVtcycsIGZ1bmN0aW9uICgkc2NvcGUsJGh0dHAsRXF1aXBhbWVudG9zLCAkbW9kYWxJbnN0YW5jZSwgaXRlbXMpIHtcblxuICAkc2NvcGUuZm9ybURhdGEgPSB7fTtcbiAgJHNjb3BlLmxvYWRpbmcgPSB0cnVlO1xuLy8gQ1JFQVRFID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAvLyB3aGVuIHN1Ym1pdHRpbmcgdGhlIGFkZCBmb3JtLCBzZW5kIHRoZSB0ZXh0IHRvIHRoZSBub2RlIEFQSVxuICAkc2NvcGUuY3JlYXRlRXF1aXBhbWVudG8gPSBmdW5jdGlvbigpIHtcbiAgICBhbGVydCgnSSBzdWJtaXQnKTtcbiAgICAvLyB2YWxpZGF0ZSB0aGUgZm9ybURhdGEgdG8gbWFrZSBzdXJlIHRoYXQgc29tZXRoaW5nIGlzIHRoZXJlXG4gICAgLy8gaWYgZm9ybSBpcyBlbXB0eSwgbm90aGluZyB3aWxsIGhhcHBlblxuICAgIGlmICgkc2NvcGUuZm9ybURhdGEudGFnICE9IHVuZGVmaW5lZCkge1xuICAgICAgJHNjb3BlLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAvLyBjYWxsIHRoZSBjcmVhdGUgZnVuY3Rpb24gZnJvbSBvdXIgc2VydmljZSAocmV0dXJucyBhIHByb21pc2Ugb2JqZWN0KVxuICAgICAgRXF1aXBhbWVudG9zLmNyZWF0ZSgkc2NvcGUuZm9ybURhdGEpXG5cbiAgICAgICAgLy8gaWYgc3VjY2Vzc2Z1bCBjcmVhdGlvbiwgY2FsbCBvdXIgZ2V0IGZ1bmN0aW9uIHRvIGdldCBhbGwgdGhlIG5ldyBlcXVpcGFtZW50b3NcbiAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICRzY29wZS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgJHNjb3BlLmZvcm1EYXRhID0ge307IC8vIGNsZWFyIHRoZSBmb3JtIHNvIG91ciB1c2VyIGlzIHJlYWR5IHRvIGVudGVyIGFub3RoZXJcbiAgICAgICAgICAkc2NvcGUuZXF1aXBhbWVudG9zID0gZGF0YTsgLy8gYXNzaWduIG91ciBuZXcgbGlzdCBvZiBlcXVpcGFtZW50b3NcbiAgICAgICAgICAkbW9kYWxJbnN0YW5jZS5jbG9zZSgkc2NvcGUuZXF1aXBhbWVudG9zKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gXG5cbiAgJHNjb3BlLm9rID0gZnVuY3Rpb24gKCkge1xuICAgICRtb2RhbEluc3RhbmNlLmNsb3NlKCRzY29wZS5lcXVpcGFtZW50b3MpO1xuICB9O1xuXG4gICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgJG1vZGFsSW5zdGFuY2UuZGlzbWlzcygnY2FuY2VsJyk7XG4gIH07XG59XSk7XG4iXX0=
