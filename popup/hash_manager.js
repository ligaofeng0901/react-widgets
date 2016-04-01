/**
 * @file 监听hash变化
 */
var hashHelper = require('/widget/common/hash_helper');
var ReactRouter = require('react-router');
var hashHistory = ReactRouter.hashHistory;
var instances = {};
var openIds = [];
var lastHash = window.location.hash;

var getLastOpenId = function () {
    if (openIds.length === 0) {
        return null;
    }
    return openIds[openIds.length - 1];
};
var popLastOpenId = function () {
    openIds.pop();
};
var removeFromOpenIds = function (id) {
    var newOpenIds = [];
    openIds.forEach(function (item) {
        if (item && item !== id) {
            newOpenIds.push(item);
        }
    });
    openIds = newOpenIds;
};
window.addEventListener('hashchange', function () {
    var hash = window.location.hash;
    if (openIds.length) {
        var lastPopupIndex = hashHelper.getParams(lastHash, 'popup');
        var currentPopIndex = hashHelper.getParams(hash, 'popup');
        var lastOpenId = getLastOpenId();
        if (parseInt(lastPopupIndex, 10) === lastOpenId
            && lastPopupIndex !== currentPopIndex) {
            var instance = instances[lastOpenId];
            if (instance) {
                instance.props.onClose();
                popLastOpenId();
            }
        }
    }
    lastHash = hash;
});
var hashManager = {
    close: function (id) {
        var hash = window.location.hash;
        var currentPopId = hashHelper.getParams(hash, 'popup');
        if (parseInt(currentPopId, 10) === id) {
            hashHistory.goBack();
            // 从打开列表中移除
            removeFromOpenIds(id);
        }
    },
    open: function (id) {
        var hash = window.location.hash;
        var hashLocation = hashHelper.parse(hash);
        delete hashLocation.params['_k'];
        hashLocation.params.popup = id;
        hashHistory.push(hashHistory.createPath(hashLocation.path, hashLocation.params));
        // 加入到打开列表
        openIds.push(id);
    },
    put: function (id, instance) {
        instances[id] = instance;
    },
    remove: function (id) {
        delete instances[id];
        removeFromOpenIds(id);
    }
};
module.exports = hashManager;