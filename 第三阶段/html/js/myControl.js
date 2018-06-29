var app = angular.module('threePhase', []);
app.controller('myControl',  ['$scope', '$http', function ($scope, $http)  {
    $http.get("http://192.168.0.38:6001/dataListKnow").then(
        function successCallback(response) {
            console.log(response.data);
            // console.log(coverImg);
            $scope.data1=response.data;   
        }, function errorCallback(response) {
            console.dir(response);
    });

    $http.get("http://192.168.0.38:6001/ckList").then(
        function successCallback(response) {
            $scope.knowIndex = response.data; 

        }, function errorCallback(response) {
            console.dir(response);
    });

    $http.get("http://192.168.0.38:6001/mineList").then(
        function successCallback(response) {
            $scope.project = response.data; 
        }, function errorCallback(response) {
            console.dir(response);
    });

    $http({
        method:"POST",
        url:"http://192.168.0.38:6001/articleKnow",   
        data:$.param({'pid':'1'}),
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded'
        }
    }).then(function successCallback(response) {
            $scope.newsDetail=response.data
            // console.log(newsDetail.proName);
        }, function errorCallback(response) {
            console.log(response.status);
    });
    
    $http({
        method:"POST",
        url:"http://192.168.0.38:6001/carbonPro",   
        data:$.param({'pid':'1'}),
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded'
        }
    }).then(function successCallback(response) {
            $scope.projectDetail=response.data
        }, function errorCallback(response) {
            console.log(response.status);
    });

    $scope.bargainPrice =[
    	{city:"深圳",price:"24",quantity:"24"},
    	{city:"北京",price:"25",quantity:"25"},
    	{city:"天津",price:"24",quantity:"24"},
    	{city:"湖北",price:"26",quantity:"24"},
    	{city:"上海",price:"24",quantity:"24"},
    	{city:"广州",price:"26",quantity:"24"},
    	{city:"重庆",price:"24",quantity:"24"},
    	{city:"福建",price:"24",quantity:"24"}
    ];
    $scope.bargainQuantity =[
    	{city:"深圳",price:"240.12",quantity:"60.41"},
    	{city:"北京",price:"240.12",quantity:"60.41"},
    	{city:"天津",price:"240.12",quantity:"60.41"},
    	{city:"湖北",price:"240.12",quantity:"60.41"},
    	{city:"上海",price:"240.12",quantity:"60.41"},
    	{city:"广州",price:"240.12",quantity:"60.41"},
    	{city:"重庆",price:"240.12",quantity:"60.41"},
    	{city:"福建",price:"240.12",quantity:"60.41"}
    ];
}]);