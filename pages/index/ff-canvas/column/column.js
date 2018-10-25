import F2 from '../../../../libs/f2-canvas/lib/f2';
import moment from '../../../../utils/moment';
let chart = null;

function initChart(canvas, width, height) { // 使用 F2 绘制图表
  // 自定义 shape
  // point 为矩形的四个顶点，顺序
  // 1 ----- 2
  // |       |
  // 0 ----- 3
  function getRectRange(points, coord) {
    var coordHeight = Math.abs(coord.y.start - coord.y.end);
    var xValues = [];
    var yValues = [];
    for (var i = 0, len = points.length; i < len; i++) {
      var point = points[i];
      xValues.push(point.x);
      yValues.push(point.y);
    }
    var xMin = Math.min.apply(null, xValues);
    var yMin = Math.min.apply(null, yValues);
    var xMax = Math.max.apply(null, xValues);
    var yMax = Math.max.apply(null, yValues);

    return {
      x: xMin,
      y: yMax,
      width: xMax - xMin,
      height: coordHeight - (yMax - yMin)
    };
  }
  var Util = F2.Util;
  F2.Shape.registerShape('interval', 'reverse', {
    draw: function draw(cfg, container) {
      var points = this.parsePoints(cfg.points);
      var style = Util.mix({
        fill: cfg.color
      }, cfg.style);
      var rectCfg = getRectRange(points, this._coord);

      return container.addShape('rect', {
        className: 'interval',
        attrs: Util.mix(rectCfg, style)
      });
    }
  });

  // ------------- 绘制图表 -------------
  var data = [{
    date: '06-27',
    time: 1530227400000
  }, // 2018-06-29 07:10:00
  {
    date: '28',
    time: 1530267780000
  }, // 2018-06-29 18:23:00
  {
    date: '29'
  }, {
    date: '30'
  }, {
    date: '07-01',
    time: 1530274980000
  }];

  chart = new F2.Chart({
    el: canvas,
    width,
    height
  });

  chart.source(data, {
    time: {
      min: 1530201600000, // 2018-06-29 00:00:00
      max: 1530287999000, // 2018-06-29 23:59:59
      nice: false,
      ticks: [1530201600000, 1530287999000], // 00:00, 23:59
      formatter: function formatter(val) {
        return moment(val).format('HH:mm');
      },
      scale: function scale(value) {
        // 将 Y 轴数据自上而下排序方式改为 从小到大
        if (value === null || value === undefined) {
          return NaN;
        }
        var max = this.max;
        var min = this.min;
        if (max === min) {
          return 0;
        }

        var percent = (value - min) / (max - min);
        var rangeMin = this.rangeMin();
        var rangeMax = this.rangeMax();
        return 1 - (rangeMin + percent * (rangeMax - rangeMin));
      }
    }
  });

  chart.tooltip(false);
  chart.axis('time', {
    position: 'right'
  });

  // 绘制 guide
  data.map(function (obj) {
    if (obj.time) {
      chart.guide().tag({
        position: [obj.date, 'max'],
        content: moment(obj.time).format('HH:mm'),
        direct: 'tc',
        background: {
          padding: [5], // tag 内边距，使用同 css 盒模型的 padding
          radius: 2, // tag 圆角
          fill: '#1890FF' // tag 背景色
        },
        side: 6,
        withPoint: null
      });
      chart.guide().line({
        start: [obj.date, 'min'],
        end: [obj.date, 'max'],
        top: false
      });
    }
  });

  chart.interval().position('date*time').shape('reverse').size(16).animate({
    appear: {
      animation: 'fadeIn'
    }
  });
  chart.render();
  return chart;
}

Page({
  data: {
    showDate:'undefined',
    opts: {
      onInit: initChart
    }
  },

  onLoad(options) {
    this.setData({
      showDate: options.startTime
    })
    console.log(options)
  }
});