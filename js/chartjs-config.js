/**
 * Chart.js Global Config
 */
Chart.defaults.global = {
  // Resizes when the canvas container does.
  responsive: true,
  
  // Duration in milliseconds it takes to animate to new size after a resize event.
  responsiveAnimationDuration: 0,
  
  // Maintain the original canvas aspect ratio (width / height) when resizing
  maintainAspectRatio: true,

  // Events that the chart should listen to for tooltips and hovering
  events: ["mousemove", "mouseout", "click", "touchstart", "touchmove", "touchend"],

  // Hover
  // Hover:onHover           - Called when any of the events fire. Called in the context of the chart and passed an array of active elements (bars, points, etc)
  // Hover:mode              - Sets which elements hover. Acceptable options are 'single', 'label', or 'dataset'. single highlights the closest element. label highlights elements in all datasets at the same X value. dataset highlights the closest dataset.
  // Hover:animationDuration - Duration in milliseconds it takes to animate hover style changes
  hover: {
    onHover: function() {},
    mode: 'single',
    animationDuration: 400
  },
  
  defaultColor: 'rgba(0,0,0,0.1)',
  defaultFontColor: '#666',
  defaultFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
  defaultFontSize: 12,
  defaultFontStyle: 'normal',
  legendCallback: function (chart) { }
}