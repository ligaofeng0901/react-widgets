/**
 * @file 弹出框父组件
 */
var ReactDom = require('react-dom');
var PopupSelectorBase = function (data) {
    return {
        getDefaultProps: function () {
            return {
                data: [],
                selectedItems: []
            };
        },
        getInitialState: function () {
            var self = this;
            return {
                data: self.props.data
            };
        }
    };
};
module.exports = PopupSelectorBase;