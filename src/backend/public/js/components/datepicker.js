const Datepicker = {
  selector: '.js-datepicker',
  DEFAULT_OPTIONS: {
    nextText: '',
    prevText: '',
    dateFormat: 'dd/mm/yy',
    changeYear: true,
    yearRange: "-100:+0"
  },
  init() {
    const options = Datepicker.parseOptions()

    $(Datepicker.selector).datepicker(options);
  },
  parseOptions() {
    const object = $(Datepicker.selector)
    const defaultOptions = Datepicker.DEFAULT_OPTIONS
    const options = {
      nextText: object.data('js-next-text') || defaultOptions.nextText,
      prevText: object.data('js-prev-text') || defaultOptions.prevText,
      dateFormat: object.data('js-date-format') || defaultOptions.dateFormat,
      changeYear: object.data('js-change-year') || defaultOptions.changeYear,
      yearRange: object.data('js-year-range') || defaultOptions.yearRange,
    }
    return options
  }
};

export default Datepicker