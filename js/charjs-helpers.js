
/**
 * Buffer Chart Data Overflow
 * 
 * @param  {Array} chart_data 
 * @param  {Number} data_index 
 * @return {Array}
 */
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
