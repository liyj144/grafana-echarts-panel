'use strict';

System.register(['app/plugins/sdk', 'moment', 'lodash', './rendering'], function (_export, _context) {
  "use strict";

  var PanelCtrl, moment, _, rendering, _createClass, EchartsCtrl;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_appPluginsSdk) {
      PanelCtrl = _appPluginsSdk.PanelCtrl;
    }, function (_moment) {
      moment = _moment.default;
    }, function (_lodash) {
      _ = _lodash.default;
    }, function (_rendering) {
      rendering = _rendering.default;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export('EchartsCtrl', EchartsCtrl = function (_PanelCtrl) {
        _inherits(EchartsCtrl, _PanelCtrl);

        function EchartsCtrl($scope, $injector, $rootScope) {
          _classCallCheck(this, EchartsCtrl);

          var _this = _possibleConstructorReturn(this, (EchartsCtrl.__proto__ || Object.getPrototypeOf(EchartsCtrl)).call(this, $scope, $injector));

          _this.$rootScope = $rootScope;
          _this.data = {};

          _this.updateClock();
          //_.defaults(this.panel, panelDefaults);
          _this.events.on('render', _this.onRender.bind(_this));
          _this.events.on('data-received', _this.onDataReceived.bind(_this));
          return _this;
        }

        _createClass(EchartsCtrl, [{
          key: 'onRender',
          value: function onRender() {
            console.log("data render");
            this.data.chartType = "line";
            this.data.xAxis = ['Jan', 'Feb', 'Mar', 'Apr', 'Mar', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            this.data.yAxis = [[-1, 1, 3, 7, 13, 16, 18, 16, 15, 9, 4, 2], [0, 1, 4, 7, 12, 15, 16, 15, 15, 10, 6, 5], [4, 4, 5, 10, 16, 22, 25, 24, 20, 14, 9, 3], [7, 6, 8, 14, 17, 22, 25, 27, 24, 17, 14, 10]];
            this.data.legend = ["柏林", "伦敦", '纽约', '东京'];
          }
        }, {
          key: 'onDataReceived',
          value: function onDataReceived(dataList) {
            //this.series = dataList.map(this.seriesHandler.bind(this));
            //this.data = this.parseSeries(this.series);
            console.log("data receive");
            this.render(this.data);
          }
        }, {
          key: 'updateClock',
          value: function updateClock() {
            var _this2 = this;

            this.time = moment().format('hh:mm:ss');
            this.$timeout(function () {
              _this2.updateClock();
            }, 1000);
          }
        }, {
          key: 'link',
          value: function link(scope, elem, attrs, ctrl) {
            rendering(scope, elem, attrs, ctrl);
          }
        }]);

        return EchartsCtrl;
      }(PanelCtrl));

      _export('EchartsCtrl', EchartsCtrl);

      EchartsCtrl.templateUrl = 'module.html';
    }
  };
});
//# sourceMappingURL=echarts_ctrl.js.map
