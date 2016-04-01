/**
 * @file 工具函数
 */
var util = {
    formatNumber: function (number) {
        if (!number) {
            return '';
        }
        var str = number + '';
        str = str.split('').reverse().join('').replace(/(\d{3})/g, '$1,')
            .replace(/\,$/, '').split('').reverse().join('');
        return str;
    },
    omitString: function (str, len) {
        if (str.length * 2 <= len) {
            return str;
        }
        var strlen = 0;
        var s = '';
        for (var i = 0; i < str.length; i++) {
            s = s + str.charAt(i);
            if (str.charCodeAt(i) > 128) {
                strlen = strlen + 2;
                if (strlen >= len) {
                    return s.substring(0, s.length - 1) + '...';
                }
            } else {
                strlen = strlen + 1;
                if (strlen >= len) {
                    return s.substring(0, s.length - 2) + '...';
                }
            }
        }
        return s;
    }
};
module.exports = util;