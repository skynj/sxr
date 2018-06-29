/**
 * @time 2018/05/18 11:33:23
 * @author lg
 * @desc 大屏页面js
 */
var app = angular.module('myApp', []);
app.directive('onFinish',['$timeout',function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    }
}]);
app.controller('screen-controller', ['$scope', '$http', function ($scope, $http) {
    $http({
        method: 'GET',
        url: '../html/json/screen.json'
    }).then(function successCallback(response) {
        // console.log(response.data);
        $scope.reduceMissions = response.data.ReduceMissions;
        $scope.freightTypes = response.data.FreightTypes;
        // console.log(response.data.GeneralInfo)


        $scope.generalInfo = response.data.GeneralInfo;
        $scope.fontColor = function (index) {
            return 'item-num-' + index;
        }
    }, function errorCallback(response) {
        console.dir(response);
    });
    $scope.$on('ngRepeatFinished',function () {
        // console.log($('.svgView1').html());
        svgView('svgView1',50,'colorId1','#ff7e00','#fabe00');
        svgView('svgView2',41,'colorId2','#ff7259','#e8352b');
        svgView('svgView3',82,'colorId3','#52feb6','#45ff73');
        svgView('svgView4',32,'colorId4','#00baff','#008cff');
    });
}]);


