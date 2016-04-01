/**
 * @file hash History helper
 */
var hashHelper = {
    parse: function (hash) {
        var hashLocation = hash.substr(1);
        var searchIndex = hashLocation.indexOf('?');
        var path = hashLocation.substr(0, searchIndex);
        var search = hashLocation.substr(searchIndex + 1);
        var params = {};
        var kvs = search.split('&');
        kvs.forEach(function (item) {
            var kv = item.split('=');
            params[kv[0]] = kv[1];
        });
        return {
            path: path,
            params: params
        };
    },
    getParams: function (hash, name) {
        var hashLocation = hashHelper.parse(hash);
        var params = hashLocation.params || {};
        return params[name];
    }
};
module.exports = hashHelper;