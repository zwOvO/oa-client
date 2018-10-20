// pages/column/column.js
import F2 from '../../../libs/f2-canvas/lib/f2';

let chart = null;

function initChart(canvas, width, height) { // 使用 F2 绘制图表
  const data = [
    { year: '应到天数', sales: 31 },
    { year: '实到天数', sales: 24 },
    { year: '请假天数', sales: 6 },
    { year: '缺勤天数', sales: 1 },
  ];
  chart = new F2.Chart({
    el: canvas,
    width,
    height
  });

  chart.source(data, {
    sales: {
      tickCount: 5
    }
  });
  chart.tooltip({
    showItemMarker: false,
    onShow(ev) {
      const { items } = ev;
      items[0].name = null;
      items[0].name = items[0].title;
      items[0].value = '¥ ' + items[0].value;
    }
  });
  chart.interval().position('year*sales');
  chart.render();
  return chart;
}

Page({
  data: {
    opts: {
      onInit: initChart
    }
  },

  onReady() {
  }
});