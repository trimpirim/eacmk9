class RequestFilter {

}

RequestFilter.parseFilter = function(params, form) {
  const filter = {}
  Object.keys(params).forEach((key) => {
    const param = params[key]
    if (typeof param.shouldFilter !== 'undefined') {
      if (param.shouldFilter) {
        filter[key] = param.criteria
      }
    } else {
      if (form[key] !== false) {
        filter[key] = param.criteria
      }
    }
  })

  return filter
}

module.exports = RequestFilter