/**
 * @file 弹出框body
 */
var React = require('react');
var PopupFooter = React.createClass({
    getDefaultProps: function () {
        return {
            exStyle: {}
        };
    },
    render: function () {
        var self = this;
        var style = self.props.exStyle;
        return (
            <div className="popup-dialog-footer" style={style}>
                {self.props.children}
            </div>
        );
    }
});
module.exports = PopupFooter;