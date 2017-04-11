var Helper = {
  getArg: function(key) {
    var index = process.argv.indexOf(key);
    var next = process.argv[index + 1];
    return (index < 0) ? null : (!next || next[0] === "-") ? true : next;
  },
  defined: function(value) {
    return (typeof value !== 'undefined' && value !== null && value);
  },
  definedOrElse: function(value, orElse) {
    return (Helper.defined(value)) ? value : orElse;
  }
}

module.exports = Helper;