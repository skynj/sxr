var app = angular.module('fourPhase', []);
app.controller('myControl',  ['$scope', '$http', function ($scope, $http)  {
    $http.get("fourphase.json").then(
        function successCallback(response){
            // console.log(response.data);
            $scope.overview = response.data.overview;
            // $scope.tendency = response.data.tendency;
        },function errorCallback(response){

        }
    )
}]);
app.directive("headerDirective", function() {
    return {
        restrict : "EA",
        replace: true,        
        templateUrl:'header.html'
    };
});