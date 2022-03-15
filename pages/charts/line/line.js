var wxCharts = require('../../../utils/wxcharts.js');
var app = getApp();
var lineChart = null;
Page({
    data: {
        testUrl: ''
    },
    touchHandler: function (e) {
        console.log(lineChart.getCurrentDataIndex(e));
        lineChart.showToolTip(e, {
            // background: '#7cb5ec',
            format: function (item, category) {
                return category + ' ' + item.name + ':' + item.data 
            }
        });
    },    
    createSimulationData: function () {
        var categories = [];
        var data = [];
        for (var i = 0; i < 10; i++) {
            categories.push('2016-' + (i + 1));
            data.push(Math.random()*(20-10)+10);
        }
        // data[4] = null;
        return {
            categories: categories,
            data: data
        }
    },
    updateData: function () {

        // var simulationData = this.createSimulationData();
        // var series = [{
        //     name: '成交量1',
        //     data: simulationData.data,
        //     format: function (val, name) {
        //         return val.toFixed(2) + '万';
        //     }
        // }];
        // lineChart.updateData({
        //     categories: simulationData.categories,
        //     series: series
        // });
        let _this = this;
        wx.createSelectorQuery()
        .select('#lineCanvas')
        .fields({
            node: true,
            size: true,
        })
        .exec(function(res) { 
            console.log(res);
            const canvas = res[0].node;
            _this.context = canvas.getContext('2d'); 
            const url = canvas.toDataURL();
            _this.setData({
                testUrl: url
            });
        
            // store calcuated chart data
            // such as chart point coordinate
            // _this.chartData = {};
            // _this.event = new Event();
            // _this.scrollOption = {
            //     currentOffset: 0,
            //     startTouchX: 0,
            //     distance: 0
            // };
            // console.log('1111', _this.context)
            // console.log('222',  _this.context.strokeStyle = '#000')
            // drawCharts.call(_this, opts.type, opts, config$$1, _this.context);
        });
    },
    onLoad: function (e) {
        var windowWidth = 320;
        try {
            var res = wx.getSystemInfoSync();
            windowWidth = res.windowWidth;
        } catch (e) {
            console.error('getSystemInfoSync failed!');
        }
        
        var simulationData = this.createSimulationData();
        lineChart = new wxCharts({
            canvasId: 'lineCanvas',
            type: 'line',
            categories: simulationData.categories,
            animation: true,
            // background: '#f5f5f5',
            series: [{
                name: '成交量1',
                data: simulationData.data,
                format: function (val, name) {
                    return val.toFixed(2) + '万';
                }
            }, {
                name: '成交量2',
                data: [2, 0, 0, 3, null, 4, 0, 0, 2, 0],
                format: function (val, name) {
                    return val.toFixed(2) + '万';
                }
            }],
            xAxis: {
                disableGrid: true
            },
            yAxis: {
                title: '成交金额 (万元)',
                format: function (val) {
                    return val.toFixed(2);
                },
                min: 0
            },
            width: windowWidth,
            height: 200,
            dataLabel: false,
            dataPointShape: true,
            extra: {
                lineStyle: 'curve'
            }
        });
    }
});