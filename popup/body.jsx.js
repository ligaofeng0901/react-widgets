/**
 * @file 弹出框body
 */
var React = require('react');
var PopupBody = React.createClass({
    getDefaultProps: function () {
        return {
            exStyle: {}
        };
    },
    render: function () {
        var self = this;
        var style = self.props.exStyle;
        return (
            <div className="popup-dialog-body" style={style}>
                {self.props.children}
            </div>
        );
    }
});
module.exports = PopupBody;