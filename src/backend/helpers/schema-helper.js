var SchemaHelper = function() {

}

SchemaHelper.ofType = function(type) {
  return {
    type: type
  }
}

SchemaHelper.withDefault = function(type, _default) {
  var object = SchemaHelper.ofType(type);
  object.default = _default;
  return object;
}

SchemaHelper.withDefaultAndRef = function(type, _default, ref) {
  var object = SchemaHelper.withDefault(type, _default);
  object.ref = ref;
  return object;
}

SchemaHelper.withRef = function(type, ref) {
  var object = SchemaHelper.ofType(type);
  object.ref = ref;
  return object;
}

module.exports = SchemaHelper;