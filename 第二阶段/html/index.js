var app = angular.module('secondPhase', ['ngSanitize']);
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
app.controller('myControl', ['$scope', '$http', function ($scope, $http) {
    $http.get("../html/index.json").then(
        function successCallback(response) {
            console.log(response.data);
            $scope.list1 = response.data.list1;
            $scope.list2 = response.data.list2;
            $scope.list3 = response.data.list3;
            $scope.data = response.data.data;
            $scope.tab = response.data.tab;
            $scope.indicator = response.data.indicator;
            $scope.supervisionDiv1 = response.data.supervisionDiv1;
            $scope.supervisionDiv2 = response.data.supervisionDiv2;
            $scope.infor = response.data.infor;
            $scope.barInfor = response.data.barInfor;
            $scope.carInfor = response.data.carInfor;
            $scope.bottomInfor = response.data.bottomInfor;
            $scope.progressBar = response.data.progressBar;

        }, function errorCallback(response) {
            // 请求失败执行代码
            console.dir(response);
    });
	// $scope.list1 =[
 //    	{a:"镇江高速岗前操大比武活江高速岗前操",span:"06-02"},
 //    	{a:"关于公布已接入我市网约江高速岗前操",span:"05-22"},
 //    	{a:"高管处依法拆除青银高速K0+6江高速岗前操",span:"05-22"},
 //    	{a:"打通联动渠道 凝聚全民力量江高速岗前操",span:"05-22"},
 //        {a:"镇江高速岗前操大比武活动成江高速岗前操",span:"06-02"},
 //        {a:"关于公布已接入我市网约车监江高速岗前操",span:"05-22"},
 //        {a:"高管处依法拆除青银高速K0+6江高速岗前操",span:"05-22"},
 //        {a:"打通联动渠道 凝聚全民力量江高速岗前操",span:"05-22"}
 //    ];
	$scope.list2 =[
    	{a:"镇江高速岗前操大比武活动成江高速岗前操",span:"06-02"},
    	{a:"关于公布已接入我市网约车监江高速岗前操",span:"05-22"},
    	{a:"高管处依法拆除青银高速K0+6江高速岗前操",span:"05-22"},
    	{a:"打通联动渠道 凝聚全民力量江高速岗前操",span:"05-22"},
    	{a:"打通联动渠道 凝聚全民力量江高速岗前操",span:"05-22"},
        {a:"镇江高速岗前操大比武活动成江高速岗前操",span:"06-02"},
        {a:"关于公布已接入我市网约车监江高速岗前操",span:"05-22"},
        {a:"高管处依法拆除青银高速K0+6江高速岗前操",span:"05-22"},
        {a:"打通联动渠道 凝聚全民力量江高速岗前操",span:"05-22"},
        {a:"打通联动渠道 凝聚全民力量江高速岗前操",span:"05-22"}
    ];
    $scope.list3 =[
    	{a:"镇江市交通局客运企业年度运行情况调查表——2016年",span:"2017-07-04"},
    	{a:"镇江市交通局客运企业年度运行情况调查表——2016年",span:"2017-07-04"},
    	{a:"镇江市交通局客运企业年度运行情况调查表——2016年",span:"2017-07-04"},
        {a:"镇江市交通局客运企业年度运行情况调查表——2016年",span:"2017-07-04"},
        {a:"镇江市交通局客运企业年度运行情况调查表——2016年",span:"2017-07-04"},
        {a:"镇江市交通局客运企业年度运行情况调查表——2016年",span:"2017-07-04"}
    ];
    $scope.data =[
        {h3:"能耗总量",num:"20.0",unit:"万吨标煤",percent:"8.22%"},
        {h3:"百公里能耗平均值",num:"900",unit:"辆车",percent:"6.47%"},
        {h3:"企业车辆总数",num:"56.0",unit:"万吨CO2e",percent:"5.24%"},
        {h3:"碳排放总量",num:"17.7",unit:"千克标准煤/百公里",percent:"4.25%"},
        {h3:"百公里碳排量平均值",num:"80.0",unit:"千克CO<sub>2</sub>e/百公里",percent:"8.26%"},
        {h3:"监测车辆总数",num:"800",unit:"辆车",percent:"7.59%"}
    ];
    $scope.scene=[
        {theme:"2025碳排放量",unit:"万吨CO<sub>2</sub>e",h3:"基准情景",data:"113.79"},
        {theme:"2025碳排放量",unit:"万吨CO<sub>2</sub>e",h3:"低碳情景",data:"108.56"},
        {theme:"2025碳排放量",unit:"万吨CO<sub>2</sub>e",h3:"深蓝情景",data:"96.55"},
        {theme:"2025碳排放量",unit:"万吨CO<sub>2</sub>e",h3:"强化低碳情景",data:"92.33"}
    ]
    $scope.tab=[
        {h2:"项目概览"},
        {h2:"项目监管"},
        {h2:"能效分析"},
        {h2:"项目库维护"}
    ]
    $scope.indicator=[
        {name:"项目总数",data:"48",unit:"个"},
        {name:"总投资",data:"325.98",unit:"亿元"},
        {name:"节能减排投资",data:"82.7",unit:"亿元"},
        {name:"申报节能减排专项资金",data:"8042.78",unit:"万元"},
        {name:"预计能源消耗量",data:"118.98",unit:"万吨标煤"},
        {name:"节能量",data:"5.8",unit:"万吨标煤"}
    ]
    $scope.supervisionDiv1=[
        {h3:"项目数量",data:"48",unit:"个"},
        {h3:"投资金额",data:"85",unit:"亿元"},
        {h3:"节能减排投资",data:"1.2",unit:"亿元"},
        {h3:"申请节能减排资金",data:"85",unit:"亿元"}
    ]
    $scope.supervisionDiv2=[
        {h3:"省交通运输节能减排规划建设项目"},
        {h3:"新型运输组织项目"},
        {h3:"新能源、清洁能源装备应用"}
    ]
    $scope.infor=[
        {leftP:"项目数量",data:"12",unit:"个"},
        {leftP:"申请节能减排资金",data:"6000",unit:"万元"},
        {leftP:"投资金额",data:"3.2",unit:"亿元"},
        {leftP:"节能减排投资",data:"6000",unit:"万元"}
    ]
    $scope.barInfor=[
        {h3:"项目数量",data:"58",unit:"个"},
        {h3:"项目投资总额",data:"2.3",unit:"亿元"},
        {h3:"项目进度",data:"64",unit:"%"}
    ]
    $scope.updateYear="2017.6.24";
    $scope.updataTime="11:04:22";
    $scope.carInfor=[
        {title:"检查车辆",num:"2000",unit:"辆"},
        {title:"在途汽车",num:"1200",unit:"辆"},
        {title:"静默汽车",num:"800",unit:"辆"}
    ];
    $scope.bottomInfor=[
        {title:"累计点火",num:"1800",unit:"次"},
        {title:"碳排放量",num:"2552",unit:"吨CO<sub>2</sub>e"},
        {title:"能耗总量",num:"1452",unit:"吨标煤"}
    ];
    $scope.progressBar=[
        {title:"公路货运",num:"0.5",unit:"吨标煤/公里"},
        {title:"公路客运",num:"0.41",unit:"吨标煤/公里"},
        {title:"城市公交",num:"0.82",unit:"吨标煤/公里"},
        {title:"港口生产",num:"0.32",unit:"吨标煤/公里"}
    ];

    $scope.$on('ngRepeatFinished',function () {
        for(var i=0;i<$('.each-progressBar').length;i++){
          var num=parseFloat($('.pLinear'+(i+1)).text())*100;
          var color=[
                      {'start':'#ff7e00','end':'#fabe00'},
                      {'start':'#e8352b','end':'#ff7259'},
                      {'start':'#45ff73','end':'#52feb6'},
                      {'start':'#008cff','end':'#00baff'}
                    ]
          svgView('svgView'+(i+1), num, "linear"+(i+1), color[i].start, color[i].end);
        }
    });

}]);

