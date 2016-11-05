import {PanelCtrl} from 'app/plugins/sdk';
import moment from 'moment';
import _ from 'lodash';
import rendering from './rendering';

export class EchartsCtrl extends PanelCtrl {
  constructor($scope, $injector, $rootScope) {
    super($scope, $injector);
    this.$rootScope = $rootScope;
    this.data = {};

    this.updateClock();
    //_.defaults(this.panel, panelDefaults);
    this.events.on('render', this.onRender.bind(this));
    this.events.on('data-received', this.onDataReceived.bind(this));
  }
 
  
  onRender(){
    console.log("data render");
    this.data.chartType = "line";
    this.data.xAxis = ['Jan', 'Feb', 'Mar', 'Apr', 'Mar', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this.data.yAxis = [
	[-1, 1, 3, 7, 13, 16, 18, 16, 15, 9, 4, 2],
	[0, 1, 4, 7, 12, 15, 16, 15, 15, 10, 6, 5],
	[4, 4, 5, 10, 16, 22, 25, 24, 20, 14, 9, 3],
	[7, 6, 8, 14, 17, 22, 25, 27, 24, 17, 14, 10]
    ];
    this.data.legend = ["柏林", "伦敦",'纽约','东京'];
  }

  onDataReceived(dataList) {
    //this.series = dataList.map(this.seriesHandler.bind(this));
    //this.data = this.parseSeries(this.series);
    console.log("data receive");
    this.render(this.data);
  }

  updateClock() {
    this.time = moment().format('hh:mm:ss');
    this.$timeout(() => { this.updateClock(); }, 1000);
  }
  link(scope, elem, attrs, ctrl){
	rendering(scope, elem, attrs, ctrl);
  }
}

EchartsCtrl.templateUrl = 'module.html';
