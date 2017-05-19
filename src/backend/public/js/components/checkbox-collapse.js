const CheckboxCollapse = {
  selector: '.js-checkbox-collapse',

  init() {
    const element = $(CheckboxCollapse.selector)
    if (element.length > 0) {
      const collapseElement = $(element.attr('data-target'))
      if (collapseElement.length > 0) {
        let collapse = 'show'
        if (!element.prop('checked')) {
          collapse = 'hide'
        } 

        collapseElement.collapse(collapse)
      }
    }
  }
}

export default CheckboxCollapse