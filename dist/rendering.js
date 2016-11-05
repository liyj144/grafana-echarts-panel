'use strict';

System.register(['./libs/echarts'], function (_export, _context) {
    "use strict";

    var echarts;
    function link(scope, elem, attrs, ctrl) {
        var data, panel;
        elem = elem.find('.echart-panel');
        var $tooltip = $('<div id="tooltip">');
        ctrl.events.on('render', function () {
            render();
            ctrl.renderingCompleted();
        });
        function setElementHeight() {
            try {
                var height = ctrl.height || panel.height || ctrl.row.height;
                if (_.isString(height)) {
                    height = parseInt(height.replace('px', ''), 10);
                }
                height -= 5; // padding
                height -= panel.title ? 24 : 9; // subtract panel title bar
                elem.css('height', height + 'px');
                return true;
            } catch (e) {
                return false;
            }
        }
        function addChart() {
            var option = {
                tooltip: {
                    show: true,
                    trigger: "item"
                },
                legend: {
                    data: ctrl.data.legend || []
                },
                xAxis: [{
                    type: 'category',
                    data: ctrl.data.xAxis || []
                }],
                yAxis: [{
                    type: 'value'
                }],
                series: function () {
                    var serie = [];
                    var data = ctrl.data.yAxis || [];
                    for (var i = 0; i < ctrl.data.xAxis.length; i++) {
                        var item = {
                            name: ctrl.data.legend[i],
                            type: 'line',
                            data: data[i]
                        };
                        serie.push(item);
                    }
                    return serie;
                }()
            };
            var myChart = echarts.init(elem[0], "default");
            myChart.setOption(option);
        }
        function render() {
            if (!ctrl.data) {
                return;
            }
            data = ctrl.data;
            panel = ctrl.panel;
            if (setElementHeight()) {
                addChart();
            }
        }
    }

    _export('default', link);

    return {
        setters: [function (_libsEcharts) {
            echarts = _libsEcharts.default;
        }],
        execute: function () {}
    };
});
//# sourceMappingURL=rendering.js.map
