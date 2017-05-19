class SchemaHelper {

}

SchemaHelper.ofType = function(type, required) {
  required = typeof required !== 'undefined' ? required : false
  return {
    type: type,
    required: required
  }
}

SchemaHelper.withDefault = function(type, _default) {
  const object = SchemaHelper.ofType(type)
  object.default = _default
  object.required = false
  return object
}

SchemaHelper.withDefaultAndRef = function(type, _default, ref) {
  const object = SchemaHelper.withDefault(type, _default)
  object.ref = ref
  return object
}

SchemaHelper.withRef = function(type, ref) {
  const object = SchemaHelper.ofType(type)
  object.ref = ref
  object.required = false
  return object
}

SchemaHelper.ifNull = (object) => {
  return object == null || object == '' || typeof object === 'undefined' ? null : object
}

module.exports = SchemaHelper