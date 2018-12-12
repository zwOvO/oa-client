import F2 from '../../../../libs/f2-canvas/lib/f2';
import moment from '../../../../utils/moment';
import recordApi from '../../../../services/record.js'
const app = getApp()
let chart = null;
let that;
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

  chart = new F2.Chart({
    el: canvas,
    width,
    height
  });

  let min = that.data.timeStamp
  let max = min + 86399000

  chart.source(that.data.data, {
    time: {
      min: min, // 2018-06-29 00:00:00
      max: max, // 2018-06-29 23:59:59
      nice: false,
      ticks: [min, max], // 00:00, 23:59
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
  new Promise(function (resolve, reject) {
    recordApi.getRecordListByDate(app.globalData.openid, that.data.startTime).then((response) => {
      console.log(response)
      if (response.status == 200) {
        response.result.sort((a, b) => {
          return a.createTime > b.createTime;
        })
        response.result.map(
          (current, index) => {
            let item_temp = {
              date: index+1,
              time: current.createTime
            }
            that.data.data.push(item_temp)
          }
          , this)
        console.log(that.data.data)
        resolve("OK");
      } else if (response.status == 404) {
        wx.showToast({
          title: '没有记录!',
          icon: "none",
          duration: 2000
        })
        console.log("没有记录")
        resolve("Empty");
      } else {
        wx.showToast({
          title: '服务器出错!',
          icon: "none",
          duration: 2000
        })
        resolve("errorInElse");
      }
    }).catch((res) => {
      console.log(res)
      wx.showToast({
        title: '加载失败2!',
        icon: "none",
        duration: 2000
      })
      resolve("catch");
    })
  }).then(function (r) {
    // 绘制 guide
    that.data.data.map(function (obj) {
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
    console.log("render")
    chart.render();
    return chart;
  })
}

Page({
  data: {
    opts: {
      onInit: initChart
    },
    data:[]
  },

  onLoad(options) {
    console.log("load")
    that = this;
    this.setData({
      timeStamp: moment(options.startTime, 'YYYY-MM-DD').valueOf(),
      startTime: options.startTime
    })
  }
});