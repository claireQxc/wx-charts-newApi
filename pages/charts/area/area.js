var wxCharts = require('../../../utils/wxcharts.js');
var app = getApp();
var areaChart = null;
var categoriesArea = ['2022.02.23', '2022.02.24', '2022.02.25', '2022.02.26', '2022.02.27', '2022.02.28','2022.03.01'];
// var areaData = [32, 45, 30, 56, 33, 34, 20];
var areaData = [10, 20, 40, 30, 20, 30, 10];
Page({
    data: {
    },
    touchHandler: function (e) {
        console.log(areaChart.getCurrentDataIndex(e));
        areaChart.showToolTip(e);
    },    
    onLoad: function (e) {
        // var windowWidth = 320;
        // try {
        //   var res = wx.getSystemInfoSync();
        //   windowWidth = res.windowWidth;
        // } catch (e) {
        //   console.error('getSystemInfoSync failed!');
        // }
        // areaChart = new wxCharts({
        //     canvasId: 'areaCanvas',
        //     type: 'area',
        //     categories: ['1', '2', '3', '4', '5', '6'],
        //     animation: true,
        //     series: [{
        //         name: '成交量1',
        //         data: [32, 45, null, 56, 33, 34],
        //         format: function (val) {
        //             return val.toFixed(2) + '万';
        //         },
        //         linearGradientColor: ["#fff","#3D9CF4"]
        //     }, {
        //         name: '成交量1',
        //         data: [20, 35, null, 46, 40, 33],
        //         format: function (val) {
        //             return val.toFixed(2) + '万';
        //         },
        //         linearGradientColor: ["#fff","#000"]
        //     }],
        //     yAxis: {
        //         title: '成交金额 (万元)',
        //         format: function (val) {
        //             return val.toFixed(2);
        //         },
        //         min: 0,
        //         fontColor: '#8085e9',
        //         gridColor: '#8085e9',
        //         titleFontColor: '#f7a35c'
        //     },
        //     xAxis: {
        //         fontColor: '#7cb5ec',
        //         gridColor: '#7cb5ec'
        //     },
        //     extra: {
        //         legendTextColor: '#cb2431'
        //     },
        //     width: windowWidth,
        //     height: 200
        // });
        var windowWidth = 320;
        try {
          var res = wx.getSystemInfoSync();
          windowWidth = res.windowWidth;
        } catch (e) {
          console.error('getSystemInfoSync failed!');
        }
        const height = (res.windowWidth / 375) * 200;
        areaChart = new wxCharts({
            canvasId: 'areaCanvas',
            type: 'area',
            categories: categoriesArea,
            animation: true,
            legend: false,
            dataLabel: false,
            scale: res.windowWidth / 375,
            padding: 18 * res.windowWidth / 375,
            background: 'pink',
            tooltip:{
                option:{
                    width:100,
                    height:100,
                    legendType:'circle',
                    fontColor:'#001128',
                    background:'#ffffff',
                    toolTipOpacity:1,
                    radius:4*res.windowWidth/375,
                    splitLine:false,
                    format:(obj,categoriesValue)=>{
                        return categoriesValue +'/r'+obj.name+':'+obj.data
                    }
                }
            },
            series: [{
                name: '7日趋势图',
                data: areaData,
                color: "#FF9A8A",
                linearGradientColor: ["#FF9A8A","rgba(255, 255, 255, 0.8)"]
            }],
            yAxis: {
                // title: '',
                format: function (val) {
                    return val;
                },
                min: 0,
                fontColor: '#011128',
                gridColor: '#EDEDED',
                gridWidth: 0.4,
                above: true,
                defaultMax: 50
            },
            xAxis: {
                fontColor: '#011128',
                gridColor: '#ffffff',
                interval: 1,
                marginTop:10*res.windowWidth/375
            },
            extra: {
                legendTextColor: '#cb2431',
                lineStyle: 'curve',
                column:{
                    width:20*res.windowWidth/375,
                    radius:4*res.windowWidth/375
                }
            },
            width: windowWidth,
            height: height,
            enableScroll: false,
        });
    }
});