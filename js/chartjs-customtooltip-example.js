/**
 * Custom Tooltips
 * 
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


var getTooltipData = function(tt) {

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
