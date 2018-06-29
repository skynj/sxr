var app = angular.module('fourPhase',[]);

// 加载完后执行
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

// 共用头部组件
app.directive("headerDirective", function() {
    return {
        restrict : "EA",
        replace: true,        
        templateUrl:'header.html',
        link: function (scope, element, attrs, controller) {

        } 

    };
});

// ng-bind-html使用
app.filter('trustHtml', function ($sce) {
    return function (input) {
        return $sce.trustAsHtml(input);
    }
});
app.controller('myControl',  ['$scope', '$http', function ($scope, $http)  {
    $http.get("../html/fourphase.json").then(
        function successCallback(response){
            $scope.headerTab = response.data.headerTab;
            $scope.monitorTab = response.data.monitorTab;
            $scope.overview = response.data.overview;
            $scope.tendency = response.data.tendency;
            $scope.infor = response.data.infor;
            $scope.checkTab1 = response.data.checkTab1;
            $scope.step1 = response.data.step1;
            $scope.poptable2 = response.data.poptable2;
            $scope.poptable4 = response.data.poptable4;
            $scope.needDo = response.data.needDo;
            $scope.table6 = response.data.table6;
            $scope.center1 = response.data.center1;
            $scope.center2 = response.data.center2;
            $scope.center3 = response.data.center3;
            $scope.tab1 = response.data.tab1;
            $scope.tab2 = response.data.tab2;
            $scope.elec = response.data.elec;
            $scope.step2Pie = response.data.step2Pie;
            $scope.step3Pie = response.data.step3Pie;
            $scope.confirmTab2 = response.data.confirmTab2;
            $scope.confirmTab1 = response.data.confirmTab1;
        },function errorCallback(response){

        }
    );
    var monitorS = $scope.monitorS;
    
   var confT1 = $scope.confT1;
   var confT2 = $scope.confT2;
    $scope.show = function (index,name) {
        $scope.name = index;
        // console.log($scope.name)
    };
    // $scope.show = function (index,num) {
    //     var name='confT'+num;

    //     $scope.name = index;
    //     console.log($scope.name)
    // };
    var storageSelected1 = sessionStorage.getItem("selected1");
    $scope.selected1 = storageSelected1 ? storageSelected1 : 0;
    $scope.show1 = function (index) {
        sessionStorage.setItem("selected1", index);
    };

    // 履约交易页面tab-select
    var exSelect1 = $scope.exSelect1;
    $scope.show3 = function (index) {
        $scope.exSelect1 = index;
    };
    // 详情查看弹出关闭
    $scope.isShow = false;
    $scope.isShow1 = false;
    $scope.isShow2 = false;
    $scope.showTable1 = function(){
        $scope.isShow = true;
        $scope.isShow1 = true;
    }
    $scope.showTable2 = function(){
        $scope.isShow = true;
        $scope.isShow2 = true;
    }
    $scope.pop1Close = function(){
        $scope.isShow = false;
        $scope.isShow1 = false;
    }
    $scope.pop2Close = function(){
        $scope.isShow = false;
        $scope.isShow2 = false;
    }
    // 
    $scope.$on('ngRepeatFinished',function () {
        line5();
        $('.item2').on("click",function(){ 
           bar(); 
           for(var i=0;i<$('.pieRate').length;i++){
                rate( parseFloat($('.pieRate').eq(i).find('span').text()),"circle"+(i+1));
                var numW = $('.pieNum').eq(i).width()/2;
                var rateW = $('.pieRate').eq(i).width()/2;
                $('.pieNum').eq(i).css('marginLeft',-numW);
                $('.pieRate').eq(i).css('marginLeft',-rateW);
            } 
        });
        $('.item3').on("click",function(){ 
           bar1(); 
           for(var i=0;i<$('.pieRate2').length;i++){
                rate( parseFloat($('.pieRate2').eq(i).find('span').text()),"circle"+(i+4));
                var numW = $('.pieNum2').eq(i).width()/2;
                var rateW = $('.pieRate2').eq(i).width()/2;
                $('.pieNum2').eq(i).css('marginLeft',-numW);
                $('.pieRate2').eq(i).css('marginLeft',-rateW);
            } 
        });
    });
    $scope.$on('ngRepeatFinished',function () {
        line();
        line1();
        line2();
        line3();
        line4();
    });
    $scope.$on('ngRepeatFinished',function () {
        // var h1=$('.center1-infor').height();
        // $('.overviewLine4').css('height',(h1-80)+'px');
        svgView('overviewLine4', 80, "linear", '#ff9e13', '#c3ccd9');
        $('.exchangeB-tab2>li').click(function(){
            $(this).addClass('active').siblings().removeClass('active');
            $(this).prev().addClass('borderBN').siblings().removeClass('borderBN');
            $(this).next().addClass('borderTN').siblings().removeClass('borderTN');
            if($(this).index()==$('.exchangeB-tab2>li').length-1){
                $('.exchangeB-tab2').addClass('borderBN');
            }else{
                $('.exchangeB-tab2').removeClass('borderBN');
            }
        })
    });
}]);
