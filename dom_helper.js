/**
 * @file dom相关操作工具
 */
var domHelper = {
    scrollTop: function () {
        return Math.max(
            // chrome
            document.body.scrollTop,
            // firefox/IE
            document.documentElement.scrollTop);
    },
    documentHeight: function () {
        // 现代浏览器（IE9+和其他浏览器）和IE8的document.body.scrollHeight
        // 和document.documentElement.scrollHeight都可以
        return Math.max(document.body.scrollHeight,
            document.documentElement.scrollHeight);
    },
    windowHeight: function () {
        // document.compatMode有两个取值。BackCompat：标准兼容模式关闭。CSS1Compat：标准兼容模式开启。
        return (document.compatMode === 'CSS1Compat')
            ? document.documentElement.clientHeight
            : document.body.clientHeight;
    }
};
module.exports = domHelper;