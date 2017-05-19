const Form = {
  reset() {
    const resetElements = $('.js-reset-element')
    resetElements.on('click', function() {
      const form = $(this).closest('form')
      if (form.length > 0) {
        form.trigger('reset')

        const selects = form.find('select:not(.js-select-to-autocomplete)')
        selects.prop('selectedIndex', 0)

        const inputs = form.find('input');
        inputs.attr('value', '');

        form[0].submit()
      }
    })
  },

  init() {
    Form.reset()
  }
}

export default Form