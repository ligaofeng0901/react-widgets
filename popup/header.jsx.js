/**
 * @file 弹出框header
 */
var React = require('react');
var PopupHeader = React.createClass({
    getDefaultProps: function () {
        return {
            title: '选择'
        };
    },
    handleCloseClick: function () {
        var self = this;
        self.props.onClose();
    },
    render: function () {
        var self = this;
        return (
            <div className="popup-dialog-header">
                <div className="popup-dialog-title">{self.props.title}</div>
                <div className="popup-dialog-close" onClick={self.handleCloseClick}>&times;</div>
            </div>
        );
    }
});
module.exports = PopupHeader;