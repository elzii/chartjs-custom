/**
 * Chart.js Global Config
 */
Chart.defaults.global.pointHitDetectionRadius = 5;
window.count = 0;

Chart.defaults.global.tooltips.yAlign = 'left';
Chart.defaults.global.tooltips.xAlign = 'center';
Chart.defaults.global.tooltips.caretSize = 0;





/**
 * Debug Tooltip
 * 
 * @param  {Object} self    
 * @param  {Object} tooltip 
 */
var debugTooltip = function(self, tooltip) {

  var position = $(self._chart.canvas)[0].getBoundingClientRect()

  console.table([{
    x: tooltip.x,
    y: tooltip.y,
    yAlign: tooltip.yAlign,
    xAlign: tooltip.xAlign,

    top: position.top,
    right: position.right,
    bottom: position.bottom,
    left: position.left,

    width: position.width,
    height: position.height,
  }])
  
}








/**
 * Chart Data
 * @type {Object}
 */
var lineChartData = {
  labels: ["", "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC", ""],
  datasets: [{
    label: "Students",
    data: [ 200, 250,220,180,290,300,370,350,200,280,260,190,210, 200 ],
    backgroundColor: "rgba(247,155,45,0.65)",
    borderColor: "rgba(247,155,45,1.0)",
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0.0,
    pointBorderColor: "rgba(245,245,245,1)",
    pointBackgroundColor: "rgba(80,81,81,1)",
    pointHoverBorderWidth: 5,
    pointBorderWidth: 5,
    pointRadius: [0, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 0],
    pointHoverRadius: [0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0],
  }]
};








/**
 * Init
 */
window.onload = function() {


  var chart1     = document.getElementById('chartjs-chart-1'),
      chart1_ctx = chart1.getContext('2d')

  
  window.lineChart = new Chart(chart1, {
    type: 'line',
    
    data: lineChartData,
    
    options: {
      responsive: true,
      maintainAspectRatio: false,

      showLines: true,

      // Legend
      legend : {
        display: false
      },

      // title
      title:{
        display:false,
        text:'Student Hours'
      },

      // Tooltips
      tooltips: {
        // enabled: true,
        enabled: false,
        custom: function (tooltip) {

          if ( !tooltip || tooltip.title === undefined ) return;

          var position = $(this._chart.canvas)[0].getBoundingClientRect()

          var pos = {
            x: tooltip.x,
            y: tooltip.y,
          }

          var datum = {
            title: tooltip.title[0],
            label: tooltip.body[0].split(':')[0],
            stat: tooltip.body[0].split(':')[1],
          }

          console.log('debugTooltip', debugTooltip(this, tooltip))
          // console.log('datum', datum)

          $('.chartjs-tooltips__tooltip').css({
            'left': pos.x - 6 // account for offset in CSS
          })
        }
      },

      // Scales
      scales: {
        yAxes: [{
          id: 'y-axis-0',
          display: false,
          type: 'linear',

          gridLines: {
            display: false,
            lineWidth: 1,
            color: "rgba(255,255,255,0.85)"
          },

          ticks: {
            beginAtZero:true,
            mirror:true,
            fontColor: "rgba(255,255,255,0.8)",
            fontSize: 15,
            suggestedMin: 0,
            suggestedMax: 500,
            stepSize: 100,
            callback: function(value) {
              if (value !== 0 && value !== 500)
                return '' + value;
            },
          },
          afterBuildTicks: function(chart) {
            
          }
        }],
        xAxes: [{
          id: 'x-axis-0',
          type: 'category',

          gridLines: {
            display: false,
          },
          ticks: {
            beginAtZero: true,
            fontSize: 17
          },

        }]
      },
    }
  });



  /**
   * Chart Helpers
   * 
   * @param  {Object} chart          
   * @param  {Number} easingDecimal)
   */
Chart.pluginService.register({
  afterDraw: function (chart, easingDecimal) {
    var yScale = chart.scales['y-axis-0'];
    var helpers = Chart.helpers;
    var chartArea = chart.chartArea;

    // draw labels - all we do is turn on display and call scale.draw
    yScale.options.display = true;
    yScale.draw.apply(yScale, [chartArea]);
    yScale.options.display = false;

    // draw the grid lines - simplified version of library code
    yScale.ctx.save();
    yScale.ctx.globalCompositeOperation = 'destination-over';
    helpers.each(yScale.ticks, function (label, index) {
      if (label === undefined || label === null) {
        return;
      }

      var yLineValue = this.getPixelForTick(index);
      yLineValue += helpers.aliasPixel(this.ctx.lineWidth);

      this.ctx.lineWidth = this.options.gridLines.lineWidth;
      this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';

      this.ctx.beginPath();
      this.ctx.moveTo(chartArea.left + 40, yLineValue);
      this.ctx.lineTo(chartArea.right, yLineValue);
      this.ctx.stroke();

    }, yScale);
    yScale.ctx.restore();    
    
    yScale.ctx.save();
    yScale.ctx.fillStyle = 'white';
    yScale.ctx.globalCompositeOperation = 'destination-over';
    yScale.ctx.fillRect(0, yScale.bottom, chartArea.right, chartArea.bottom);
    yScale.ctx.restore();    
  },
});


  // console.log('window.lineChart', window.lineChart)

  // console.log('Chart.helpers', Chart.helpers)

};