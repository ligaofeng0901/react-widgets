/**
 * @file 弹出框选择组件
 */
var React = require('react');
var ReactDom = require('react-dom');
var PopupFrame = require('../popup/frame.jsx');
var Simple = require('popup_selector_simple.jsx');
var Multi = require('popup_selector_multi.jsx');
var PopupSelector = React.createClass({
    getDefaultProps: function () {
        return {
            mode: 'simple',
            isOpen: false,
            onSelect: function () {},
            top: 130
        };
    },
    handleDialogClose: function () {
        var self = this;
        self.props.onClose();
    },
    handleSelect: function (items) {
        var self = this;
        self.props.onSelect(items);
        self.props.onClose();
    },
    render: function () {
        var self = this;
        var {children, mode, ...other} = self.props;
        var contentNode = (
            <Simple {...other} onSelect={self.handleSelect}/>
        );
        if (mode === 'multi') {
            contentNode = (
                <Multi {...other} onSelect={self.handleSelect}/>
            );
        }
        return (
            <PopupFrame onClose={self.handleDialogClose} isOpen={self.props.isOpen} top={self.props.top}>
                {contentNode}
            </PopupFrame>
        );
    }
});
module.exports = PopupSelector;