/**
 * Chart.js Global Config
 */
Chart.defaults.global.pointHitDetectionRadius = 5;
// console.log('Chart.defaults.global.elements', Chart.defaults.global.elements)
window.count = 0;

// var ctx = document.getElementById('canvas').getContext('2d');




/**
 * Custom Tooltips
 * @param  {Element} tooltip 
 */
var customTooltips = function(tooltip) {
  
  // Tooltip Element
  var $chart_container = $('#chartjs-container'),
      $tooltip         = $('#chartjs-tooltip'),
      position         = $(this._chart.canvas)[0].getBoundingClientRect()

  console.log('tooltip', tooltip)


  // Log
  // console.log('tooltip', tooltip)

  tooltip.yAlign = 'above'

  // Append wrapper to body
  if ( !$tooltip[0] ) {
    $chart_container.append('<div id="chartjs-tooltip"></div>')
    // $tooltip = $('#chartjs-tooltip')
  }

  // Hide if no tooltip
  if ( !tooltip.opacity ) {
    $tooltip.css({ opacity: 0 });
    $('.chartjs-wrap canvas').each(function(index, el) {
      $(el).css('cursor', 'default');
    });
    return;
  }

  // Set cursor
  $(this._chart.canvas).css('cursor', 'pointer');

  // Clear classes
  $tooltip.removeClass('above below no-transform');
  
  // Set caret Position
  if ( tooltip.yAlign ) {
    $tooltip.addClass(tooltip.yAlign);
  } else {
    $tooltip.addClass('no-transform');
  }



  // Set Text
  if ( tooltip.body ) { setTooltipText( tooltip, $tooltip ) }

  // Find Y Location on page
  // var top = 0;
  // if (tooltip.yAlign) {
  //   if (tooltip.yAlign == 'above') {
  //     top = tooltip.y;
  //   } else {
  //     top = tooltip.y;
  //     console.log('below', top)
  //   }
  // }

  // get Tooltip position
  setTooltipCSS(tooltip, position, $tooltip)

};



/**
 * Set Tooltip Text
 * 
 * @param {Object} tt    
 * @param {Element} tt_el 
 */
var setTooltipText = function(tt, tt_el) {
  var innerHtml = [
    (tt.beforeTitle || []).join('\n'), (tt.title || []).join('\n'), (tt.afterTitle || []).join('\n'), (tt.beforeBody || []).join('\n'), (tt.body || []).join('\n'), (tt.afterBody || []).join('\n'), (tt.beforeFooter || [])
    .join('\n'), (tt.footer || []).join('\n'), (tt.afterFooter || []).join('\n')
  ];
  tt_el.html(innerHtml.join('\n'));
}



/**
 * Set Tooltip CSS
 * 
 * @param {Object} tt       
 * @param {Number} position 
 * @param {Element} tt_el 
 */
var setTooltipCSS = function(tt, position, tt_el) {

  // console.log('position', position)

  tt_el.css({
    opacity: 1,
    width: tt.width ? (tt.width + 'px') : 'auto',
    left: tt.x + 'px',
    // top: position.top + top + 'px',
    top: 0 + 'px',
    fontFamily: tt._fontFamily,
    fontSize: tt.fontSize,
    fontStyle: tt._fontStyle,
    padding: tt.yPadding + 'px ' + tt.xPadding + 'px',
  });
}


/**
 * Debug Tooltips
 * 
 * @param  {Object} tt 
 */
var debugTooltip = function(tt) {
  
}



var bufferChartDataOverflow = function(chart_data, data_index) {

  var data_index = data_index ? data_index : 0;

  // Buffer L/R of labels
  chart_data.labels.unshift("")
  chart_data.labels.push("")

  // Buffer L/R of data
  chart_data.datasets[data_index].data.unshift(200)
  chart_data.datasets[data_index].data.push(200)
  
  return chart_data;
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




// lineChartData = bufferChartDataOverflow( lineChartData )





/**
 * Init
 */
window.onload = function() {

  var $chart = $('#chart'),
      canvas = document.getElementById('chart'),
      ctx    = canvas.getContext('2d')

  
  window.lineChart = new Chart($chart[0], {
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
        enabled: false,
      },

      // Scales
      scales: {
        yAxes: [{
          id: 'y-axis-0',
          display: false,
          gridLines: {
            display: false,
            lineWidth: 1,
            color: "rgba(255,255,255,0.85)"
          },
          ticks: {
            beginAtZero:true,
            mirror:true,
            fontColor: "rgba(255,255,255,0.8)",
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
          gridLines: {
            display: false,
          },
          ticks: {
            beginAtZero: true
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

  console.log('Chart.helpers', Chart.helpers)

};